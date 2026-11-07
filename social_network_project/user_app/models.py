from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import random 
from django.utils import timezone
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Обов'язково вкажіть email")

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    
    def create_superuser(self, email=None, password=None, **extra_fields):
            extra_fields.setdefault("is_staff", True)
            extra_fields.setdefault("is_superuser", True)
            extra_fields.setdefault("is_active", True)
            
            if extra_fields.get("is_staff") is not True:
                raise ValueError("Superuser must have is_staff=True.")
            if extra_fields.get("is_superuser") is not True:
                raise ValueError("Superuser must have is_superuser=True.")
    
            return self.create_user(email, password, **extra_fields)
    
class User(AbstractUser):   
    username = models.CharField(
        max_length = 244,
        unique= True,
        null = True,
        blank = True
    )
    email = models.EmailField(unique = True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"email:{self.email}"


class VerifyCode(models.Model):
    code = models.CharField(max_length=20)
    user = models.OneToOneField(User, on_delete = models.CASCADE, related_name = "verify_code")
    create_time = models.DateTimeField(auto_now_add = True)

    def create_code(self):
        self.code = str(random.randint(100000,999999))
        self.create_time = timezone.now()
        self.save()
        print(self.code)

    def is_valid(self):
        now = timezone.now() - self.create_time
        if now.total_seconds() < 1000:
            return True
        return False