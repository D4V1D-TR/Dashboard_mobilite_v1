import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Test = () => {
    return (
        <div>
            {/* Map */}
            <MapContainer center={[45.763696, 4.837443]} zoom={15} style={{ width: "100vw", height: "100vh" }} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" detectRetina={true} />
                <TileLayer url="https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?tileSize=256&key=VxCzTOtWzXndWziX0Qrumq9AufSjwWV4" />
            </MapContainer>
        </div>
    );
};

export default Test;
