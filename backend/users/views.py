from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import skillSerializer
from .models import Skill

class skillViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = skillSerializer
    queryset = Skill.objects.all()