from rest_framework import serializers
from django.conf import settings

from teams.serializers import TeamTitleSerializer
from .models import Skill, CustomUser

class skillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    skills = skillSerializer(read_only = True)
    teams = TeamTitleSerializer(read_only = True, many = True)
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'nickname', 'first_name', 'last_name', 'avatar', 'teams', 'organization_name', 'skills']
        read_only_fields = ['email', 'avatar', 'teams', 'organization_name', 'skills']
