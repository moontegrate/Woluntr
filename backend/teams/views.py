from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from users.models import CustomUser
from .models import Team, TeamToUserInvite
from .serializers import  TeamSerializer,TeamToUserInviteSerializer

#TODO refactor this code
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        team_data = self.request.data
        # change request data so that it's mutable, otherwise this will raise
        # a "This QueryDict instance is immutable." error
        team_data._mutable = True
        # set the requesting user ID for the User ForeignKey
        team_data['leader'] = self.request.user.id

        serializer = TeamSerializer(data=team_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamLeaderInviteViewSet(viewsets.ViewSet):
    """
    ViewSet to leader of team to send, see, 
    """
    #TODO
    def list(self, request):
        resp = []
        queryset = TeamToUserInvite.objects.filter(team__leader = request.user)
        
        for invites in queryset:
            resp.append(
                {
                    "team": invites.team,
                    "user":{
                        "id":invites.user.id,
                        "first_name": invites.user.first_name,
                        "last_name":invites.user.last_name,
                        "avatar":invites.user.avatar,
                    },
                    'status':invites.status,
                }
            )
        # queryset = TeamInvite.objects.filter(user=request.user)
        # serializer = TeamInviteSerializer(queryset, many=True)
        # return Response(serializer.data)
        return Response(resp)

    def create(self, request):
        team_id = request.data.get('team_id')
        user_id = request.data.get('user_id')
        if not team_id or not user_id:
            return Response({'error': 'Both team_id and user_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        team = Team.objects.get(id=team_id)
        if request.user != team.leader:
            return Response({"error": "Only the team leader can send invites."}, status=status.HTTP_403_FORBIDDEN)
        user = CustomUser.objects.get(id=user_id)
        invite = TeamToUserInvite.objects.create(team=team, user=user, status=None)
        return Response({'message': 'Invite sent successfully'}, status=status.HTTP_201_CREATED)
    