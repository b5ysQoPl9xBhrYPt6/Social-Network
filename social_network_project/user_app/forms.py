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
    code_1 = forms.CharField(
        max_length = 1,
        required = True,
        widget = forms.TextInput(attrs = {"id": "code1"})
    )
    code_2 = forms.CharField(
        max_length = 1,
        required = True,
        widget = forms.TextInput(attrs = {"id": "code2"})
    )
    code_3 = forms.CharField(
        max_length = 1,
        required = True,
        widget = forms.TextInput(attrs = {"id": "code3"})
    )
    code_4 = forms.CharField(
        max_length = 1,
        required = True,
        widget = forms.TextInput(attrs = {"id": "code4"})
    )
    code_5 = forms.CharField(
        max_length = 1,
        required = True,
        widget = forms.TextInput(attrs = {"id": "code5"})
    )
    code_6 = forms.CharField(
        max_length = 1,
        required = True,
        widget = forms.TextInput(attrs = {"id": "code6"})
    )
    

class LoginForm(AuthenticationForm):
    username = forms.EmailField(
        label = "Електронна пошта",
        widget = forms.EmailInput(attrs = {"placeholder": "you@example.com"})
    )
    password = forms.CharField(
        widget = forms.PasswordInput(attrs = {"placeholder": "Пароль"}),
        label = "Пароль"
    )