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

const siege = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4299/4299051.png",
    iconSize: [40, 40],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const parkingIcon = new L.Icon({
    iconUrl: "/logo.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const lpaAndCoIcon = new L.Icon({
    iconUrl: "/lpaandco.png",
    iconSize: [20, 20],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const Map_mob = () => {
    const [velovStations, setVelovStations] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [lpaAndCo, setLpaAndCo] = useState([]);
    const [showLPA, setShowLPA] = useState(true);
    const [showVelov, setShowVelov] = useState(true);
    const [showLpaAndCo, setShowLpaAndCo] = useState(true);

    useEffect(() => {
        axios.get("http://192.168.2.27:8000/api/velov/")
            .then(response => setVelovStations(response.data))
            .catch(error => console.error("Erreur Velov:", error));

        axios.get("http://192.168.2.27:8000/api/parking/")
            .then(response => setParkings(response.data))
            .catch(error => console.error("Erreur Parking:", error));
        
        axios.get("http://192.168.2.27:8000/api/lpaandco/")
            .then(response => setLpaAndCo(response.data))
            .catch(error => console.error("Erreur LPA and Co:", error));
    }, []);

    const filteredVelovStations = showVelov ? velovStations : [];
    const filteredParkings = showLPA ? parkings : [];
    const filteredLpaAndCo = showLpaAndCo ? lpaAndCo : [];

    return (
        <div>
            {/* Checkbox Filter */}
            <div style={{
                position: 'fixed',
                top: '120px',
                left: '10px',
                background: 'white',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                color: 'black',
                pointerEvents: 'auto'
            }}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={showLPA} onChange={() => setShowLPA(!showLPA)} />}
                        label="LPA"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={showVelov} onChange={() => setShowVelov(!showVelov)} />}
                        label="Vélo'v"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={showLpaAndCo} onChange={() => setShowLpaAndCo(!showLpaAndCo)} />}
                        label="LPA&Co"
                    />
                </FormGroup>
            </div>

            {/* Map */}
            <MapContainer center={[45.763696, 4.837443]} zoom={15} style={{ width: "100vw", height: "100vh" }} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" detectRetina={true} />
                <TileLayer url="https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?tileSize=256&key=VxCzTOtWzXndWziX0Qrumq9AufSjwWV4" />
                
                <Marker position={[45.763696, 4.83735]} icon={siege}>
                    <Popup>
                        <b>Siège LPA</b> <br />
                    </Popup>
                </Marker>

                {/* Stations Vélo'v */}
                {filteredVelovStations.map((station, index) => (
                    <Marker key={index} position={[station.Latitude, station.Longitude]} icon={bikeIcon}>
                        <Popup>
                            <b>{station.Name}</b> <br />
                            Places dispo : {station.Available_bike_stands} <br/>
                            Vélos mécaniques : {station.Mechanical_bikes} <br />
                            Vélos électriques : {station.Elec_bikes} <br />
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

                {/* LPA&Co */}
                {filteredLpaAndCo.map((location, index) => (
                    <Marker key={index} position={[location.lat, location.lon]} icon={lpaAndCoIcon}>
                        <Popup>
                            <b>{location.nom}</b> <br />
                            Adresse : {location.adresse} <br />
                            Tarif 1H : {location.tarif_1h} <br />
                            Tarif 2H : {location.tarif_2h} <br />
                            Tarif 24H : {location.tarif_24h} <br />
                            Abo mensuel : {location.abo_mensuel} <br />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map_mob;
