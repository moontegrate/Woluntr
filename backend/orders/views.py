from rest_framework import viewsets
from rest_framework import permissions
from .models import Order, OrderComplete
from .serializers import OrderSerializer, OrderCompleteSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Example permission, modify as needed

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class OrderCompleteViewSet(viewsets.ModelViewSet):
    queryset = OrderComplete.objects.all()
    serializer_class = OrderCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        if self.request.POST.get('executor_team', False):
            return serializer.save(executor_team = self.request.POST['executor_team'])
        return serializer.save(executor = self.request.user)

    