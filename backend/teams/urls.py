from django.urls import path, include
from rest_framework import routers
from .views import TeamViewSet, TeamLeaderInviteViewSet

router = routers.DefaultRouter()
router.register(r'teams', TeamViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('team-invites/', TeamLeaderInviteViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('team-invites/<int:pk>/', TeamLeaderInviteViewSet.as_view({'put': 'update'})),
]