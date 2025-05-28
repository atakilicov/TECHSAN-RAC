from rest_framework import serializers
from cars.models import Car

class CarSearchSerializer(serializers.ModelSerializer):
    daily_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Car
        fields = [
            'id', 
            'brand', 
            'model', 
            'year', 
            'car_type', 
            'transmission', 
            'fuel_type', 
            'daily_price', 
            'image'
        ]

class CarSearchResponseSerializer(serializers.Serializer):
    cars = CarSearchSerializer(many=True)
    min_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    max_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_results = serializers.IntegerField()

class CarDetailSerializer(serializers.ModelSerializer):
    daily_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Car
        fields = [
            'id', 
            'brand', 
            'model', 
            'year', 
            'plate_number',
            'car_type', 
            'transmission', 
            'fuel_type', 
            'daily_price', 
            'description',
            'color',
            'seat_count',
            'image'
        ]

class CarCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__' # Veya sadece gerekli alanları listeleyin 