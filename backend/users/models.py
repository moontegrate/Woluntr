from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

from teams.models import Team

class Skill(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.name

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email'), unique=True)
    nickname = models.CharField(max_length = 20, blank = True)
    first_name = models.CharField(_('name'), max_length=30, blank=True)
    last_name = models.CharField(_('surname'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('registered'), auto_now_add=True)
    is_active = models.BooleanField(_('is_active'), default=True)
    is_superuser = models.BooleanField(_('is_superuser'), default=False)
    is_staff = models.BooleanField(_('is_staff'), default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    checked_email = models.BooleanField(default = False)
    avatar  = models.ImageField(upload_to='images/avatars/', blank=True)
    teams = models.ManyToManyField(Team, blank=True)
    organization_name = models.CharField(blank = True, null = True, max_length = 200)
    skills = models.ManyToManyField(Skill, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        '''
        Возвращает first_name и last_name с пробелом между ними.
        '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()
    
