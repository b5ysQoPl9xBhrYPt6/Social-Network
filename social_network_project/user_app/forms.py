from django import forms
from django.contrib.auth.forms import UserCreationForm, SetPasswordMixin, AuthenticationForm
from .models import User

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(
        label = 'Елекронна пошта',
        widget = forms.EmailInput(attrs = {"placeholder": "you@example.com"})
    )
    password1, password2 = SetPasswordMixin.create_password_fields("Пароль", "Пітвердити")

    class Meta:
        model = User
        fields = ["email"]

class VerifyCodeForm(forms.Form):
    code = forms.CharField(
        max_length = 6,
        required = True,
        widget = forms.TextInput(),
        label = "Код пітвердження"
    )

class LoginForm(AuthenticationForm):
    username = forms.EmailField(
        label = "Електронна пошта",
        widget = forms.EmailInput(attrs = {"placeholder": "you@example.com"})
    )