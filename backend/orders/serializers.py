from rest_framework import serializers
from .models import Order, OrderComplete

class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['title','description', 'difficulty', 'location', 'skills', 'img']

class OrderCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderComplete
        fields = ['executor', 'executor_team', 'order', 'img', 'stars']