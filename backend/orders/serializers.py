from rest_framework import serializers
from django.conf import settings

from .models import Order, OrderComplete
from teams.models import Team
from teams.serializers import TeamTitleSerializer

user = settings.AUTH_USER_MODEL



class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id','first_name', 'last_name']

class OrderSerializer(serializers.ModelSerializer):
    customer = UserNameSerializer(read_only = True)
    class Meta:
        model = Order
        fields = ['id','title','description', 'difficulty', 'location', 'coordinates','skills', 'img', 'time_create','customer']
    

class OrderCompleteSerializer(serializers.ModelSerializer):
    executor_team = TeamTitleSerializer(read_only=True)
    class Meta:
        model = OrderComplete
        fields = ['id','executor', 'executor_team', 'order', 'img', 'stars']