# Generated by Django 4.2.11 on 2024-03-25 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_ordercomplete_notes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, choices=[('Approved', 'Approved'), ('Complete', 'Complete'), ('In Process', 'In Process'), ('Not Complete', 'Not Complete')], default='Not Complete', max_length=20),
        ),
    ]
