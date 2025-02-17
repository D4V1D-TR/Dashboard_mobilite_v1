import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Icônes personnalisées
const bikeIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/9220/9220815.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const parkingIcon = new L.Icon({
    iconUrl: "/logo.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const Map = () => {
    const [velovStations, setVelovStations] = useState([]);
    const [parkings, setParkings] = useState([]);

    useEffect(() => {
        // Charger les stations Velov
        axios.get("http://127.0.0.1:8000/api/velov/")
            .then(response => setVelovStations(response.data))
            .catch(error => console.error("Erreur Velov:", error));

        // Charger les parkings
        axios.get("http://127.0.0.1:8000/api/parking/")
            .then(response => setParkings(response.data))
            .catch(error => console.error("Erreur Parking:", error));
    }, []);

    return (
        <MapContainer center={[45.763696, 4.837443]} zoom={14} style={{ width: "100vw", height: "100vh" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Stations Vélo'v */}
            {velovStations.map((station, index) => (
                <Marker key={index} position={[station.Latitude, station.Longitude]} icon={bikeIcon}>
                    <Popup>
                        <b>{station.Name}</b> <br />
                        Vélos disponibles : {station.Available_bikes}
                    </Popup>
                </Marker>
            ))}

            {/* Parkings */}
            {parkings.map((parking, index) => (
                <Marker key={index} position={[parking.lat, parking.lon]} icon={parkingIcon}>
                    <Popup>
                        <b>{parking.nom}</b> <br />
                        Places disponibles : {parking.nb_places}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
