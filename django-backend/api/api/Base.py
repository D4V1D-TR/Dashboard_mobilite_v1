import requests
import pandas as pd
from datetime import datetime
from geopy.distance import geodesic
import requests.auth
from abc import ABC, abstractmethod
from collections import defaultdict
import locale
import re

class BaseAPI(ABC):
    def __init__(self, url: str):
        self.url = url
        self.df = pd.DataFrame()

    def main(self, filtrer = None, id = None, mdp = None):
        if filtrer == "Y":
            return self.filtrer(self.transformer(self.collecter(id=id, mdp=mdp)))
        else:
            return self.transformer(self.collecter(id=id, mdp=mdp))

    def collecter(self, id=None, mdp=None): # Faire une requête HTTP GET pour récupérer les données

        if id != None and mdp!= None:
            response = requests.get(self.url, auth=requests.auth.HTTPBasicAuth(id, mdp))
        else:
            response = requests.get(self.url)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Erreur {response.status_code}: {response.text}")

    @abstractmethod
    def transformer(self):
        pass

    def filtrer(self):
        pass