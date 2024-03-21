from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Order, OrderComplete
from .serializers import OrderSerializer, OrderCompleteSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class OrderCompleteViewSet(viewsets.ModelViewSet):
    queryset = OrderComplete.objects.all()
    serializer_class = OrderCompleteSerializer
    permission_classes = [IsAuthenticated]