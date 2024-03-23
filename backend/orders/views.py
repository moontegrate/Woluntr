from rest_framework import viewsets
from rest_framework import permissions
from django.core.exceptions import PermissionDenied
from .models import Order, OrderComplete
from .serializers import OrderSerializer, OrderCompleteSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Example permission, modify as needed

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    def perform_update(self, serializer):
        instance = self.get_object()

        # Check if the user updating the order is the same as the order's customer
        if self.request.user == instance.customer:
            return super().perform_update(serializer)
        else:
            # Handle unauthorized update attempt
            raise PermissionDenied("You do not have permission to update this order.")

class OrderCompleteViewSet(viewsets.ModelViewSet):
    queryset = OrderComplete.objects.all()
    serializer_class = OrderCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        if self.request.POST.get('executor_team', False):
            return serializer.save(executor_team = self.request.POST['executor_team'])
        return serializer.save(executor = self.request.user)

    