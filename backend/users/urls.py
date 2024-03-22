from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import skillViewSet

router = DefaultRouter()
router.register(r'skills', skillViewSet)

urlpatterns = [
    path('', include(router.urls))
]
