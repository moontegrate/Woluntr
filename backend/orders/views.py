from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.core.exceptions import PermissionDenied
from django.db.models import Q

from .models import Order, OrderComplete
from teams.models import Team
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
            raise PermissionDenied("You do not have permission to update this order.")\
            
    def perform_destroy(self, instance):
        # Проверка, является ли текущий пользователь автором объекта
        if instance.customer == self.request.user:
            instance.delete()
        else:
            return Response(
                {"message": "You are not allowed to delete this object."},
                status=status.HTTP_403_FORBIDDEN
            )

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
    
    def perform_destroy(self, instance):
        # Проверка, является ли текущий пользователь автором объекта
        if instance.executor == self.request.user or instance.executor_team.leader == self.request.user:
            instance.delete()
        else:
            return Response(
                {"message": "You are not allowed to delete this object."},
                status=status.HTTP_403_FORBIDDEN
            )

    def perform_create(self, serializer):
        if serializer.is_valid():
            order_id = self.request.POST['order']
            Order.objects.filter(id = order_id).update(status='In Process')
            if self.request.POST.get('executor_team', False):
                return serializer.save(executor_team = self.request.POST['executor_team'])
            return serializer.save(executor = self.request.user)
    
class MyOrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(customer=user)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context
    

class OrderStatusUpdateView(APIView):
    def post(self, request):
        if request.is_authenticated:
            OrderStatus = request.POST.get('status',False)
            OrderCompleteId = request.POST.get('order_Complete_id',False)
            if OrderStatus and OrderCompleteId:
                try:
                    order_complete = OrderComplete.objects.get(pk = OrderCompleteId)
                    if order_complete.executor == request.user:
                        OrderToChange = OrderComplete.objects.get(pk = OrderCompleteId).order
                        OrderToChange.update(status = OrderStatus)
                        return Response({"detail": "Успешно обновлено"}, status=status.HTTP_200_OK)
                    else:
                        return Response({"detail": "У вас нет доступа к этой записи."}, status=status.HTTP_403_FORBIDDEN)
                except:
                     return Response({"detail": "Запись не найдена"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"detail": "У вас нет доступа к этой записи."}, status=status.HTTP_403_FORBIDDEN)