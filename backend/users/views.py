from rest_framework import status, viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import skillSerializer, CustomUserSerializer
from .models import Skill, CustomUser

class skillViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = skillSerializer
    queryset = Skill.objects.all()


class CustomUserDetailView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user