import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [velovStations, setVelovStations] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [lpaAndCo, setLpaAndCo] = useState([]);
    const [map, setMap] = useState(null);

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
                zoom: 13,
                view: 'Auto',
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: 'D06DI114hc8bfdz3AGsiucAZzSM5yEPoG2Tcx8Oek89NM3SJqXLNJQQJ99BBACi5Ypz2LawzAAAgAZMP188M',
                },
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
        velovStations.forEach(station => {data_velov.add(new atlas.data.Point([station.Longitude, station.Latitude]));});
        parkings.forEach(parking => {data_parking.add(new atlas.data.Point([parking.lon, parking.lat]));});
        lpaAndCo.forEach(location => {data_co.add(new atlas.data.Point([location.lon, location.lat]));});

        // Création d'une couche de symbole pour afficher les marqueurs
        map.imageSprite.add("parkingIcon", `${window.location.origin}/logo.svg`).then(() => {
            const symbolLayer = new atlas.layer.SymbolLayer(data_parking, null, {
                iconOptions: {
                    image: "parkingIcon",  
                    anchor: "center",
                    allowOverlap: true,
                    iconSize: 1 // Taille de l’icône (Azure Maps utilise un scale, 1 = taille normale)
                }
            });
            map.layers.add(symbolLayer);
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
                    gapLength: 2,
                    dashLength: 2,
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
        </div>
    );
};

export default Test;
