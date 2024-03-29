from django.db import models
from django.conf import settings

user = settings.AUTH_USER_MODEL

# Create your models here.
class Team(models.Model):
    leader = models.ForeignKey(user, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=100)
    description = models.TextField(blank = True, null = True)
    time_create = models.DateTimeField(auto_now_add=True)
    opened = models.BooleanField(default=False)

class TeamToUserInvite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    status = models.BooleanField(null = True, blank = True)

class UserToTeamInvite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    status = models.BooleanField(null = True, blank = True)

