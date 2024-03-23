from rest_framework import serializers
from .models import Order, OrderComplete

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id','title','description', 'difficulty', 'location', 'coordinates','skills', 'img', 'time_create',]
    

class OrderCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderComplete
        fields = ['id','executor', 'executor_team', 'order', 'img', 'stars']