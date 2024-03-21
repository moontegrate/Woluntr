from django.db import models
from django.conf import settings

from teams.models import Team
from users.models import Skill

user = settings.AUTH_USER_MODEL

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = (
        ('Complete', 'Complete'),
        ('In Process', 'In Process'),
        ('Not Complete', 'Not Complete')
    )
    DIFFICULTY_CHOICES = (
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard')
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    time_create = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(user, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    location = models.CharField(max_length=255)
    skills = models.ManyToManyField(Skill, blank=True)
    
class OrderComplete(models.Model):
    executor = models.ForeignKey(user, on_delete=models.CASCADE, null = True, blank = True)
    executor_team = models.ForeignKey(Team, on_delete=models.CASCADE, null = True, blank = True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    time_accept = models.DateTimeField(auto_now_add = True)
    time_complete = models.DateTimeField()
    stars = models.IntegerField()