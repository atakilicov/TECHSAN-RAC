import logging # logging modülünü import et
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Min, Max
from cars.models import Car, Reservation
from cars.serializers.car_serializer import CarSearchResponseSerializer, CarSearchSerializer
from datetime import datetime
from django.db import connection
from django.forms.models import model_to_dict

# Bu view için bir logger oluştur
logger = logging.getLogger(__name__)

class CarSearchView(APIView):
    def get(self, request):
        # Parametreleri al
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        brand = request.query_params.get('brand')
        model = request.query_params.get('model')
        car_type = request.query_params.get('car_type')
        transmission = request.query_params.get('transmission')
        fuel_type = request.query_params.get('fuel_type')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        sort_by = request.query_params.get('sort_by', 'daily_price')
        order = request.query_params.get('order', 'asc')

        # Debug bilgisi
        logger.debug(f"Gelen parametreler: {dict(request.query_params)}")
        
        # Temel sorgu objesini oluştur
        queryset = Car.objects.all()
        
        # Filtreleme şartlarını oluştur
        filters = Q()
        
        # Marka filtresi
        if brand:
            filters &= Q(brand__icontains=brand)
            
        # Model filtresi
        if model:
            filters &= Q(model__icontains=model)
            
        # Araç tipi filtresi
        if car_type:
            filters &= Q(car_type__iexact=car_type)
            
        # Vites filtresi
        if transmission:
            filters &= Q(transmission__iexact=transmission)
            logger.debug(f"Vites filtresi eklendi: transmission__iexact={transmission}")
            
        # Yakıt tipi filtresi
        if fuel_type:
            filters &= Q(fuel_type__iexact=fuel_type)
            logger.debug(f"Yakıt filtresi eklendi: fuel_type__iexact={fuel_type}")
        
        # Fiyat aralığı filtresi
        if min_price:
            filters &= Q(daily_price__gte=min_price)
        if max_price:
            filters &= Q(daily_price__lte=max_price)
            
        # Oluşturulan filtreleri uygula
        if filters != Q():
            logger.debug(f"Uygulanan filtre: {filters}")
            queryset = queryset.filter(filters)
            
        # Debug bilgisini logla
        logger.debug(f"Filtreleme sonrası araç sayısı: {queryset.count()}")
        for car in queryset:
            logger.debug(f"Filtrelenmiş araç: ID: {car.id}, Marka: {car.brand}, Vites: {car.transmission}, Yakıt: {car.fuel_type}")

        # Tarih aralığı filtresi
        if start_date and end_date:
            try:
                start = datetime.strptime(start_date, '%Y-%m-%d').date()
                end = datetime.strptime(end_date, '%Y-%m-%d').date()
                
                reserved_cars = Reservation.objects.filter(
                    Q(start_date__lte=end) & Q(end_date__gte=start)
                ).values_list('car_id', flat=True)
                
                queryset = queryset.exclude(id__in=reserved_cars)
                logger.debug(f"Tarih filtresi sonrası araç sayısı: {queryset.count()}")
            except Exception as e:
                logger.error(f"Tarih formatı hatası: {e}")

        # Sıralama
        order_prefix = '' if order == 'asc' else '-'
        queryset = queryset.order_by(f'{order_prefix}{sort_by}')

        # Fiyat istatistikleri
        price_stats = queryset.aggregate(
            min_price=Min('daily_price'),
            max_price=Max('daily_price')
        )

        # Sonuçları serialize et
        response_data = {
            'cars': CarSearchSerializer(queryset, many=True).data,
            'min_price': price_stats['min_price'] or 0,
            'max_price': price_stats['max_price'] or 0,
            'total_results': queryset.count()
        }
        
        logger.debug(f"Döndürülen araç sayısı: {len(response_data['cars'])}")
        
        serializer = CarSearchResponseSerializer(response_data)
        return Response(serializer.data, status=status.HTTP_200_OK) 