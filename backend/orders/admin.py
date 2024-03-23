from django.contrib import admin
from .models import Order, OrderComplete


# Register your models here.
admin.site.register(OrderComplete)
admin.site.register(Order)

