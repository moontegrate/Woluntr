from rest_framework import serializers
from django.conf import settings

from .models import Order, OrderComplete
from teams.serializers import TeamTitleSerializer
from users.serializers import skillSerializer
from users.models import CustomUser


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name', 'last_name']
        
class OrderCompleteUpdateSerializer(serializers.Serializer):
    status = serializers.CharField()
    
class OrderReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'status', 'customer', 'title', 'description', 'difficulty', 'location', 'latitude', 'longitude', 'skills', 'img']


class OrderCompleteSerializer(serializers.ModelSerializer):
    executor_team = TeamTitleSerializer(read_only=True)
    order = OrderReadSerializer(read_only = True)  # Добавил сериализатор для отображения Order
    order_id = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), source='order', write_only=True)  # Добавил поле для передачи только id Order

    class Meta:
        model = OrderComplete
        fields = ['id', 'executor', 'executor_team', 'order', 'order_id', 'img', 'stars', 'notes', 'time_accept']
        read_only_fields = ['id', 'time_accept', 'order']

class OrderSerializer(serializers.ModelSerializer):
    customer = UserNameSerializer(read_only = True)
    skills = skillSerializer(read_only = True,many = True)
    order_complete = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id','title','description', 'difficulty', 'location', 'latitude','longitude','skills', 'img', 'time_create','customer', 'status', 'order_complete']
        read_only_fields = ['status','customer', 'skills', 'order_complete']

    def get_order_complete(self, obj):
        try:
            order_complete_obj = OrderComplete.objects.get(order=obj)
            return OrderCompleteSerializer(order_complete_obj).data
        except OrderComplete.DoesNotExist:
            return None

