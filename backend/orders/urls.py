from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderCompleteViewSet, MyOrderListAPIView

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-complete', OrderCompleteViewSet)

urlpatterns = [
    path('orders/my/', MyOrderListAPIView.as_view(), name='my'),
    path('', include(router.urls)),
]
