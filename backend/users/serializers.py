from rest_framework import serializers
from django.conf import settings

user = settings.AUTH_USER_MODEL 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = user.objects.create_user(**validated_data)
        return user