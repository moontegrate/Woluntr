from django.contrib import admin

from .models import Team, TeamToUserInvite
# Register your models here.
admin.site.register(Team)
admin.site.register(TeamToUserInvite)