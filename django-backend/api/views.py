from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.api.Velov import Velov
from api.api.Parking import Parking
from api.api.LPAandCo import LPAandCo

@api_view(["GET"])
def velov_data(request):
    data = Velov(url="https://api.jcdecaux.com/vls/v3/stations?apiKey=frifk0jbxfefqqniqez09tw4jvk37wyf823b5j1i&contract=lyon", user_location=(45.763511657714844, 4.837132453918457)).main(filtrer="Y")
    data = data.to_dict(orient="records")
    return Response(data)

@api_view(["GET"])
def parking_data(request):
    data = Parking(url="https://data.grandlyon.com/fr/datapusher/ws/rdata/pvo_patrimoine_voirie.parkingtr/all.json?maxfeatures=-1&start=1&filename=parkings-de-la-metropole-de-lyon---disponibilites-temps-reel-v2").main(id="truongdavid.pro@gmail.com", mdp="Azerty01?")
    data = data.to_dict(orient="records")
    return Response(data)

@api_view(["GET"])
def lpaandco_data(request):
    data = LPAandCo(url="https://data.grandlyon.com/fr/datapusher/ws/rdata/lpa_mobilite.parking_lpaco_2_0_0/all.json?maxfeatures=-1&start=1&filename=parkings-lpa-co-metropole-lyon-v2").main(id="truongdavid.pro@gmail.com", mdp="Azerty01?")
    data = data.to_dict(orient="records")
    return Response(data)

