from .Base import BaseAPI, pd

class Parking(BaseAPI):
    def __init__(self, url :str):
        super().__init__(url)

    def transformer(self,data):
        dictionnaire = {
            'nom': [],
            'gestionnaire': [],
            'gratuit': [],
            'nb_places': [],
            'nb_pr': [],
            'nb_pmr': [],
            'nb_voitures_electriques': [],
            'nb_velo': [],
            'nb_2r_el': [],
            'nb_autopartage': [],
            'nb_2_rm': [],
            'nb_covoit': [],
            'hauteur_max': [],
            'tarif_pmr': [],
            'tarif_1h': [],
            'tarif_2h': [],
            'tarif_3h': [],
            'tarif_4h': [],
            'tarif_24h': [],
            'abo_resident': [],
            'abo_non_resident': [],
            'type_ouvrage': [],
            'places_disponibles': [],
            'etat': [],
            'last_update': [],
            'lon': [],
            'lat': []
        }

        for item in data['values']:
            for key in dictionnaire.keys():
                dictionnaire[key].append(item.get(key))

        df = pd.DataFrame(dictionnaire)
        df = df[df['places_disponibles'].notna()]
        return df.where(pd.notnull(df), "")
    
    def filtrer(self):
        pass

