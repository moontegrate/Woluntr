# Generated by Django 4.2.11 on 2024-03-23 06:30

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_remove_ordercomplete_time_complete_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='coordinates',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), blank=True, null=True, size=2),
        ),
        migrations.AlterField(
            model_name='ordercomplete',
            name='img',
            field=models.ImageField(blank=True, upload_to='images/order-complete/'),
        ),
    ]
