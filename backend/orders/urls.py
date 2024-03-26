from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderCompleteViewSet, MyOrderListAPIView, update_order_status

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-complete', OrderCompleteViewSet)

urlpatterns = [
    path('order-complete/<int:order_complete_pk>/status/', update_order_status, name='update_order_status'),
    path('orders/my/', MyOrderListAPIView.as_view(), name='my'),
    path('', include(router.urls)),
]
