from rest_framework import serializers
from .models import Team, TeamToUserInvite

class TeamTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'title']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'leader', 'name', 'description', 'time_create', 'opened']

class TeamToUserInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamToUserInvite
        fields = ['id', 'team', 'user', 'status']