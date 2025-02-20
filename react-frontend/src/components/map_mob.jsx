import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Icônes personnalisées
const bikeIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5266/5266122.png",
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

const Map_mob = () => {
    const [velovStations, setVelovStations] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [showLPA, setShowLPA] = useState(true);  // LPA checkbox state
    const [showVelov, setShowVelov] = useState(true);  // Vélo'v checkbox state

    useEffect(() => {
        // Charger les stations Velov
        axios.get("http://192.168.2.27:8000/api/velov/")
            .then(response => setVelovStations(response.data))
            .catch(error => console.error("Erreur Velov:", error));

        // Charger les parkings
        axios.get("http://192.168.2.27:8000/api/parking/")
            .then(response => setParkings(response.data))
            .catch(error => console.error("Erreur Parking:", error));
    }, []);

    // Filtrage des stations et parkings en fonction des checkboxes
    const filteredVelovStations = showVelov ? velovStations : [];
    const filteredParkings = showLPA ? parkings : [];

    return (
        <div>
            {/* Checkbox Filter */}
            <div style={{
                position: 'fixed',
                top: '100px',
                left: '5px',
                background: 'white',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                color: 'black',
                pointerEvents: 'auto'
            }}>
                <FormControlLabel
                        control={<Checkbox checked={showLPA} onChange={() => setShowLPA(!showLPA)} />}
                        label="LPA"
                    />
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={showVelov} onChange={() => setShowVelov(!showVelov)} />}
                        label="Vélo'v"
                    />
                </FormGroup>
            </div>

            {/* Map */}
            <MapContainer center={[45.763696, 4.837443]} zoom={15} style={{ width: "100vw", height: "100vh" }} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" detectRetina={true} />

                {/* Stations Vélo'v */}
                {filteredVelovStations.map((station, index) => (
                    <Marker key={index} position={[station.Latitude, station.Longitude]} icon={bikeIcon}>
                        <Popup>
                            <b>{station.Name}</b> <br />
                            Vélos disponibles : {station.Available_bikes}
                        </Popup>
                    </Marker>
                ))}

                {/* Parkings */}
                {filteredParkings.map((parking, index) => (
                    <Marker key={index} position={[parking.lat, parking.lon]} icon={parkingIcon}>
                        <Popup>
                            <b>{parking.nom}</b> <br />
                            Places disponibles : {parking.nb_places}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map_mob;
