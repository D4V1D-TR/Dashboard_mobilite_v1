from .Base import BaseAPI, pd

class LPAandCo(BaseAPI):
    def __init__(self, url: str):
        super().__init__(url)

    def transformer(self, data):
        dictionnaire = {
            'nom': [],
            'gestionnaire': [],  # Non fourni explicitement, peut être fixé à "LPA"
            'gratuit': [],
            'nb_places': [],
            'tarif_1h': [],
            'tarif_2h': [],
            'tarif_24h': [],
            'abo_mensuel': [],
            'adresse': [],
            'places_disponibles': [],  # Non fourni dans les données actuelles
            'etat': [],
            'lon': [],
            'lat': []
        }

        for item in data['values']:
            dictionnaire['nom'].append(item.get('name', ''))
            dictionnaire['gestionnaire'].append("LPA")  # Fixé à "LPA" car il s'agit d'un parking LPA
            dictionnaire['gratuit'].append(item.get('publicaccess', False))
            dictionnaire['nb_places'].append(None)  # Non fourni dans les données

            # Extraction des tarifs
            tarifs = { 
                "1H": None, "2H": None, "24H": None, "Abonnement Mensuel": None
            }
            for offre in item.get('offer', []):
                for spec in offre.get('schema:priceSpecification', []):
                    nom_tarif = spec.get('schema:name', '').lower()
                    prix = spec.get('schema:price', None)

                    if "1 heure" in nom_tarif:
                        tarifs["1H"] = prix
                    elif "2 heures" in nom_tarif:
                        tarifs["2H"] = prix
                    elif "24 heures" in nom_tarif:
                        tarifs["24H"] = prix
                    elif "abonnement mensuel" in nom_tarif:
                        tarifs["Abonnement Mensuel"] = prix

            dictionnaire['tarif_1h'].append(tarifs["1H"])
            dictionnaire['tarif_2h'].append(tarifs["2H"])
            dictionnaire['tarif_24h'].append(tarifs["24H"])
            dictionnaire['abo_mensuel'].append(tarifs["Abonnement Mensuel"])

            # Adresse
            adresse = item.get('address', {})
            dictionnaire['adresse'].append(adresse.get('schema:streetAddress', ''))

            # Coordonnées
            dictionnaire['lon'].append(item.get('lon', None))
            dictionnaire['lat'].append(item.get('lat', None))

            # Places disponibles et état non fournis directement
            dictionnaire['places_disponibles'].append(None)
            dictionnaire['etat'].append(None)

        df = pd.DataFrame(dictionnaire)
        df = df.where(pd.notnull(df), "")
        return df[df["gestionnaire"] == "LPA"]