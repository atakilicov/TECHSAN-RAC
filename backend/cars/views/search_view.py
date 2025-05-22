from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Min, Max
from cars.models import Car, Reservation
from cars.serializers.car_serializer import CarSearchResponseSerializer
from datetime import datetime

class CarSearchView(APIView):
    def get(self, request):
        # Parametreleri al
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        brand = request.query_params.get('brand')
        car_type = request.query_params.get('car_type')
        transmission = request.query_params.get('transmission')
        fuel_type = request.query_params.get('fuel_type')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        sort_by = request.query_params.get('sort_by', 'daily_price')
        order = request.query_params.get('order', 'asc')

        # Temel queryset
        queryset = Car.objects.all()

        # Filtreleme kriterleri
        if brand:
            queryset = queryset.filter(brand__icontains=brand)
        
        if car_type:
            queryset = queryset.filter(car_type__iexact=car_type)
        
        if transmission:
            queryset = queryset.filter(transmission__iexact=transmission)
        
        if fuel_type:
            queryset = queryset.filter(fuel_type__iexact=fuel_type)
        
        # Fiyat aralığı
        if min_price:
            queryset = queryset.filter(daily_price__gte=min_price)
        
        if max_price:
            queryset = queryset.filter(daily_price__lte=max_price)

        # Tarih aralığı kontrolü (kiralama durumu)
        if start_date and end_date:
            # Belirtilen tarih aralığında zaten kiralanmış araçları çıkar
            reserved_cars = Reservation.objects.filter(
                Q(start_date__lte=end_date) & Q(end_date__gte=start_date)
            ).values_list('car_id', flat=True)
            
            queryset = queryset.exclude(id__in=reserved_cars)

        # Sıralama
        order_prefix = '' if order == 'asc' else '-'
        queryset = queryset.order_by(f'{order_prefix}{sort_by}')

        # Fiyat istatistikleri
        price_stats = queryset.aggregate(
            min_price=Min('daily_price'), 
            max_price=Max('daily_price')
        )

        # Serializer ile yanıt oluştur
        response_data = {
            'cars': queryset,
            'min_price': price_stats['min_price'] or 0,
            'max_price': price_stats['max_price'] or 0,
            'total_results': queryset.count()
        }

        serializer = CarSearchResponseSerializer(response_data)
        return Response(serializer.data, status=status.HTTP_200_OK) 