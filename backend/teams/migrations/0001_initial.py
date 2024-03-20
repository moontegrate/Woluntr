# Generated by Django 4.2.11 on 2024-03-20 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('opened', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='TeamInvite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(blank=True, null=True)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teams.team')),
            ],
        ),
    ]
