import datetime, secrets, time
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.utils import timezone


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_active", True)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    TIMEOUT = 5 * 60
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    email = models.EmailField(unique=True)
    # username = models.CharField(max_length=128, unique=True)
    # password = models.CharField(max_length=128)
    profile = models.ImageField(blank=True)
    description = models.CharField(max_length=512, blank=True)

    authcode = models.CharField(max_length=32)
    authcode_date = models.DateTimeField(default=timezone.make_aware(datetime.datetime(1970, 1, 1)))

    # date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    class Meta:
        ordering = ["date_joined"]

    def _create_authcode(self):
        while True:
            authcode = secrets.token_hex(3)
            if not User.objects.filter(authcode=authcode).exists():
                break

        self.authcode = authcode
        self.authcode_date = timezone.now()
        self.save()
        return authcode

    def create_authcode(self):
        if self.authcode != "":
            elapsed = (timezone.now() - self.authcode_date).total_seconds()
            if elapsed < self.TIMEOUT:
                raise ValidationError(f"{int(self.TIMEOUT - elapsed)}초 이후에 다시 시도하세요.")

        authcode = self._create_authcode()
        return authcode

    def check_authcode(self, authcode):
        if self.authcode == "":
            raise ValidationError("인증코드가 생성되지 않았습니다.")
        elapsed = (timezone.now() - self.authcode_date).total_seconds()
        if elapsed > self.TIMEOUT:
            raise ValidationError("인증이 만료되었습니다.")
        if self.authcode == authcode:
            self.authcode = ""
            return True
        return False

    def change_lostpassword(self, password):
        self.set_password(password)
        self.save()
