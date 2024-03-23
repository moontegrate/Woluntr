from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderCompleteViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-complete', OrderCompleteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
