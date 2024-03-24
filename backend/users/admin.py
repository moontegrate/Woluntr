from django.contrib import admin

from .models import Skill, CustomUser

# Register your models here.
admin.site.register(Skill)
admin.site.register(CustomUser)