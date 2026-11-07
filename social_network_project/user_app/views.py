from django.forms.models import BaseModelForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, FormView, TemplateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import AuthenticationForm, UserChangeForm
from django.contrib.auth import login
from .forms import RegistrationForm, VerifyCodeForm, LoginForm
from .models import User, VerifyCode
from django.core.mail import send_mail
from django.conf import settings

class AuthView(TemplateView):
    template_name = 'user_app/auth.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["regform"] = RegistrationForm()
        context["verifyform"] = VerifyCodeForm()
        context["logform"] = LoginForm()
        return context
    

class RegistrationView(CreateView):
    form_class = RegistrationForm

    def form_valid(self, form: BaseModelForm):
        user: User = form.save(commit = False)
        user.is_active = False
        user.save()

        verify_code = VerifyCode.objects.create(code = 0, user = user)
        verify_code.create_code()

        send_mail(
            subject = 'World IT Social Network',
            message = f"Your code: {verify_code.code}",
            from_email = settings.EMAIL_HOST_USER,
            recipient_list = [user.email],
            fail_silently = True
        )

        self.request.session["email"] = user.email

        return JsonResponse({"success": True, "email": user.email})

    def form_invalid(self, form: BaseModelForm):
        return JsonResponse({"success": False, "errors": form.errors})


class VerifyCodeView(FormView):
    form_class = VerifyCodeForm

    def form_valid(self, form: VerifyCodeForm):
        print("OK")
        code = form.cleaned_data.get("code")
        verify_code = VerifyCode.objects.filter(code = code).first()

        if verify_code and verify_code.is_valid():
            verify_code.user.is_active = True
            verify_code.user.save()
            self.request.session.pop("email")
            verify_code.delete()
            return JsonResponse({"success": True})
        else:
            form.add_error("code", "Такого коду не існує, або його час вичерпано")
            return self.form_invalid(form)

    def form_invalid(self, form):
        print("NOT OK BUT OKOK")
        return JsonResponse({"success": False, "errors": form.errors})

class CustomLoginView(LoginView):
    form_class = LoginForm
    
    def form_valid(self, form: AuthenticationForm):
        user = form.get_user()

        if not user.is_active:
            form.add_error("general", "Користувач не активний, пiдтвердiть пошту")
            return self.form_invalid(form)
        login(request = self.request, user = user)
        return JsonResponse({"success": True})

    def form_invalid(self, form: AuthenticationForm):
        return JsonResponse({"success": False, "errors": form.errors})