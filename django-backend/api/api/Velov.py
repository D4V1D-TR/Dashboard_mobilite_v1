
from .Base import BaseAPI, pd, geodesic, re

class Velov(BaseAPI):

    def __init__(self, url: str, user_location, radius=10000):
        super().__init__(url)
        self.user_location = user_location
        self.radius = radius

    def transformer(self, data):
        stations_data = {
            'Name': [re.sub(r'^\d+ - ', '', station['name']) for station in data],
            'Address': [station['address'] for station in data],
            'Latitude': [station['position']['lat'] for station in data],
            'Longitude': [station['position']['lng'] for station in data],
            'Bike_stands': [station['bike_stands'] for station in data],
            'Available_bike_stands': [station['available_bike_stands'] for station in data],
            'Available_bikes': [station['available_bikes'] for station in data],
            'Status': [station['status'] for station in data]
        }

        self.df = pd.DataFrame(stations_data)
        return self.df

    def filtrer(self,df):
        df['Distance_to_user'] = df.apply(lambda row: round(geodesic(self.user_location, (row['Latitude'], row ['Longitude'])).meters), axis=1)
        df = df[df['Distance_to_user'] <= self.radius]
        return df