from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderCompleteViewSet, MyOrderListAPIView, OrderStatusUpdateView

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-complete', OrderCompleteViewSet)

urlpatterns = [
    path('orders/status/update/',OrderStatusUpdateView.as_view()),
    path('orders/my/', MyOrderListAPIView.as_view(), name='my'),
    path('', include(router.urls)),
]
