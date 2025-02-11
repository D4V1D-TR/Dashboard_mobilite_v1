from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(["GET"])
def dashboard_data(request):
    data = {
        "users": 120,
        "sales": 3500,
        "growth": 12.5
    }
    return Response(data)
