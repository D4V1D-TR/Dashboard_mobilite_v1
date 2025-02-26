import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Map = () => {
    const [velovStations, setVelovStations] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [lpaAndCo, setLpaAndCo] = useState([]);
    const [map, setMap] = useState(null);
    const [showLPA, setShowLPA] = useState(true);
    const [showVelov, setShowVelov] = useState(true);
    const [showLpaAndCo, setShowLpaAndCo] = useState(true);

    
    // Chargement des données depuis l'API
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

    // Chargement de la carte Azure Maps
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.js';
        script.onload = () => {
            const mapInstance = new atlas.Map('myMap', {
                center: [4.837443, 45.763696],
                zoom: 14,
                view: 'Auto',
                authOptions: {authType: 'subscriptionKey', subscriptionKey: 'D06DI114hc8bfdz3AGsiucAZzSM5yEPoG2Tcx8Oek89NM3SJqXLNJQQJ99BBACi5Ypz2LawzAAAgAZMP188M'},
            });

            mapInstance.events.add('ready', function () {
                setMap(mapInstance);
            });
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Ajout des marqueurs et du trafic flow une fois la carte et les données chargées
    useEffect(() => {
        if (!map) return;

        // DataSource pour les marqueurs
        const data_parking = new atlas.source.DataSource();
        map.sources.add(data_parking);
        
        const data_velov = new atlas.source.DataSource();
        map.sources.add(data_velov);
        
        const data_co = new atlas.source.DataSource();
        map.sources.add(data_co);

        // Ajout des points pour chaque type de données (sans conditions)
        velovStations.forEach(station => {
            data_velov.add(new atlas.data.Feature(
                new atlas.data.Point([station.Longitude, station.Latitude]),
                {
                    name: station.Name,
                    place: station.Available_bike_stands,
                    meca: station.Mechanical_bikes,
                    elec: station.Elec_bikes
                }
            ));
        });
        
        parkings.forEach(parking => {
            data_parking.add(new atlas.data.Feature(
                new atlas.data.Point([parking.lon, parking.lat]),
                {
                    nom: parking.nom,
                    nb_places: parking.nb_places,
                    etat: parking.etat
                }
            ));
        });
        
        lpaAndCo.forEach(location => {
            data_co.add(new atlas.data.Feature(
                new atlas.data.Point([location.lon, location.lat]),
                {
                    name: location.nom,
                    H1: location.tarif_1h,
                    H2:location.tarif_2h,
                    H24:location.tarif_24h,
                    mois: location.abo_mensuel
                }
            ));
        });
        

       // Création du popup (caché par défaut)
        const popup = new atlas.Popup({
            pixelOffset: [0, -20],
            closeButton: true
        });
        
        const addPopupOnClick = (layer, category) => {
            map.events.add("click", layer, (e) => {
                if (e.shapes && e.shapes.length > 0) {
                    const properties = e.shapes[0].getProperties();
                    const coordinates = e.shapes[0].getCoordinates();

                    let content = `<div class = popup><strong>${category}</strong><br/>`;
        
                    // Personnalisation selon la catégorie
                    if (category === "Parking") {
                        content += `
                            <strong> Nom:</strong> ${properties.nom || "Inconnu"} </br>
                            <strong> Capacité:</strong> ${properties.nb_places || "N/A"} places </br>
                            <strong> Statut:</strong> ${properties.etat || "Non renseigné"} </br>`;
                    } else if (category === "Vélo'v") {
                        content += `
                            <strong>Nom:</strong> ${properties.name || "Inconnu"}</br>
                            <strong>Places dispos:</strong> ${properties.place || "0"}</br>
                            <strong>Vélos mécaniques:</strong> ${properties.meca || "0"}</br>
                            <strong>Vélos électriques:</strong> ${properties.elec || "0"}</br>`;
                    } else if (category === "LPA & Co") {
                        content += `
                            <strong>Nom:</strong> ${properties.name || "Inconnu"}</br>
                            <strong>Tarif 1H:</strong> ${properties.H1 || "Non renseigné"}</br>
                            <strong>Tarif 2H:</strong> ${properties.H2 || "Non renseigné"}</br>
                            <strong>Tarif 24H:</strong> ${properties.H24 || "Non renseigné"}</br>
                            <strong>Abo mensuel:</strong> ${properties.mois || "Non renseigné"}</br>`;
                    }
        
                    content += `</div>`;
        
                    popup.setOptions({
                        position: coordinates,
                        content: content
                    });
        
                    popup.open(map);
                }
            });
        };
        
        // Ajouter les événements de clic pour chaque catégorie
        map.imageSprite.add("parkingIcon", "/logo.png").then(() => {
            const symbolLayer = new atlas.layer.SymbolLayer(data_parking, null, {
                iconOptions: { image: "parkingIcon", anchor: "center", allowOverlap: true, iconSize: 0.5 }
            });
            map.layers.add(symbolLayer);
            addPopupOnClick(symbolLayer, "Parking");
        });
        
        map.imageSprite.add("lpaandco", "/lpaandco.png").then(() => {
            const symbolLayer = new atlas.layer.SymbolLayer(data_co, null, {
                iconOptions: { image: "lpaandco", anchor: "center", allowOverlap: true, iconSize: 0.5 }
            });
            map.layers.add(symbolLayer);
            addPopupOnClick(symbolLayer, "LPA & Co");
        });
        
        map.imageSprite.add("velov", "/velov.png").then(() => {
            const symbolLayer = new atlas.layer.SymbolLayer(data_velov, null, {
                iconOptions: { image: "velov", anchor: "center", allowOverlap: true, iconSize: 0.5 }
            });
            map.layers.add(symbolLayer);
            addPopupOnClick(symbolLayer, "Vélo'v");
        });
        

        

        
        // Configuration et ajout du trafic flow
        const trafficSource = new atlas.source.VectorTileSource(null, {
            tiles: ['https://{azMapsDomain}/traffic/flow/tile/pbf?api-version=1.0&style=relative&zoom={z}&x={x}&y={y}'],
            maxZoom: 22});
        map.sources.add(trafficSource);

        const trafficOptions = {
            sourceLayer: 'Traffic flow',
            strokeColor: ['step', ['get', 'traffic_level'], '#6B0512', 0.01, '#EE2F53', 0.8, 'orange', 1, '#66CC99'],
            strokeWidth: ['interpolate', ['exponential', 2], ['zoom'], 12, 3, 17, 9],
        };

        ['one_side', 'full'].forEach((cov) => {
            map.layers.add(
                new atlas.layer.LineLayer(trafficSource, null, {
                    ...trafficOptions,
                    filter: ['==', ['get', 'traffic_road_coverage'], cov]
                }),
                'labels'
            );
        });

        const flowOptions = {
            sourceLayer: 'Traffic flow',
            strokeColor: 'gray',
            strokeWidth: ['interpolate', ['exponential', 2], ['zoom'], 12, 1, 17, 4],
        };

        const levels = [
            [0, 0.01, 0.25],
            [0.01, 0.8, 1],
            [0.8, 2, 4],
        ];

        levels.forEach(([min, max, speed]) => {
            ['one_side', 'full'].forEach((cov) => {
                const lineLayer = new atlas.layer.LineLayer(trafficSource, null, {
                    ...flowOptions,
                    filter: ['all',
                        ['==', ['get', 'traffic_road_coverage'], cov],
                        ['>', ['get', 'traffic_level'], min],
                        ['<=', ['get', 'traffic_level'], max]
                    ]
                });
                map.layers.add(lineLayer, 'labels');

                atlas.animations.flowingDashedLine(lineLayer, {
                    gapLength: 4,
                    dashLength: 4,
                    duration: 2000,
                    autoPlay: true,
                    loop: true,
                    reverse: true,
                    speedMultiplier: speed,
                });
            });
        });

    }, [map, velovStations, parkings, lpaAndCo]);

    return (
        <div>
            <div id="myMap" style={{ width: '100%', height: '100vh' }}></div>
            <div style={{position: 'fixed', top: '120px', left: '10px', background: 'white', padding: '10px', borderRadius: '8px',  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 9999, color: 'black', pointerEvents: 'auto'}}>
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
            </FormGroup> </div>
        </div>        
    );
};

export default Map;
