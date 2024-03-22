from rest_framework import serializers
from django.conf import settings
from .models import Skill

class skillSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Skill
        fields = '__all__'