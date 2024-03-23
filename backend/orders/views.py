from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import permissions
from django.core.exceptions import PermissionDenied
from django.db.models import Q
from .models import Order, OrderComplete
from .serializers import OrderSerializer, OrderCompleteSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(status = 'Not Complete')

    def perform_create(self, serializer):
        return serializer.save(customer=self.request.user)

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

    def get_queryset(self):
        user = self.request.user
        user_teams = user.teams.all()
        queryset = OrderComplete.objects.filter(
            Q(executor=user) | Q(executor_team__in=user_teams)
        )
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        if instance.executor == user or user in instance.executor_team.members.all():
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            return Response({"detail": "У вас нет доступа к этой записи."}, status=status.HTTP_403_FORBIDDEN)
    
    def perform_create(self, serializer):
        if self.request.POST.get('executor_team', False):
            return serializer.save(executor_team = self.request.POST['executor_team'])
        return serializer.save(executor = self.request.user)

class MyOrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(customer = self.request.user)