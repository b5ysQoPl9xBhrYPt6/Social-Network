from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView

class AuthView(TemplateView):
    template_name = 'user_app/auth.html'
