from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import skillViewSet, CustomUserDetailView

router = DefaultRouter()
router.register(r'skills', skillViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/me/', CustomUserDetailView.as_view(), name='user-detail'),
]
