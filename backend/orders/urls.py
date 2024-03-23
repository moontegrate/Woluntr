from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderCompleteViewSet, MyOrderViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-complete', OrderCompleteViewSet)
router.register(r'my-orders',MyOrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
