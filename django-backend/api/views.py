from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.api.Velov import Velov
from api.api.Parking import Parking

@api_view(["GET"])
def velov_data(request):
    data = Velov(url="https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=329f3a40cfa3609ae45bb672d065fb12028751ad", user_location=(45.763511657714844, 4.837132453918457)).main(filtrer="Y")
    return Response(data)

@api_view(["GET"])
def parking_data(request):
    data = Parking(url="https://data.grandlyon.com/fr/datapusher/ws/rdata/pvo_patrimoine_voirie.parkingtr/all.json?maxfeatures=-1&start=1&filename=parkings-de-la-metropole-de-lyon---disponibilites-temps-reel-v2").main(id="truongdavid.pro@gmail.com", mdp="Azerty01?")
    return Response(data)