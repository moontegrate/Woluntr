from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField

from teams.models import Team
from users.models import Skill

user = settings.AUTH_USER_MODEL

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = (
        ('Approved', 'Approved'),
        ('Complete', 'Complete'),
        ('In Process', 'In Process'),
        ('Not Complete', 'Not Complete')
    )
    DIFFICULTY_CHOICES = (
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard')
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default ='Not Complete', blank = True)
    time_create = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(user, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank = True)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, blank= True, null=True)
    location = models.CharField(max_length=255, blank = True)
    latitude = models.FloatField(blank = True, null = True)
    longitude = models.FloatField(blank = True, null = True)
    skills = models.ManyToManyField(Skill, blank=True)
    img = models.ImageField(upload_to='images/orders/', blank=True)
    
    # def get_order_complete(self):
    #     return OrderComplete.objects.filter(order=self)
    

class OrderComplete(models.Model):
    executor = models.ForeignKey(user, on_delete=models.DO_NOTHING, null = True, blank = True)
    executor_team = models.ForeignKey(Team, on_delete=models.DO_NOTHING, null = True, blank = True)
    order = models.OneToOneField(Order, on_delete=models.DO_NOTHING)
    notes = models.TextField(blank = True, null = True)
    time_accept = models.DateTimeField(auto_now_add = True)
    stars = models.IntegerField(blank = True, null=True)
    img = models.ImageField(upload_to='images/order-complete/', blank=True)
