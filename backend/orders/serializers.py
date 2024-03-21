from rest_framework import serializers
from .models import Order, OrderComplete

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderComplete
        fields = '__all__'