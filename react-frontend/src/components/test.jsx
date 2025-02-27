// src/components/Map.jsx
import React, { useEffect, useRef } from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const Map = ({ showLPA, setShowLPA, showVelov, setShowVelov, showLpaAndCo, setShowLpaAndCo }) => {
  const mapRef = useRef(null);
  const markerLPARef = useRef(null);
  const markerVelovRef = useRef(null);
  const markerLpaAndCoRef = useRef(null);

  useEffect(() => {
    // Initialiser la carte Azure
    const map = new atlas.Map(mapRef.current, {
      center: [-110, 50],
      zoom: 2,
      view: 'Auto',
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'D06DI114hc8bfdz3AGsiucAZzSM5yEPoG2Tcx8Oek89NM3SJqXLNJQQJ99BBACi5Ypz2LawzAAAgAZMP188M', // Remplacez par votre clé Azure Maps
      },
    });

    // Ajouter des marqueurs
    markerLPARef.current = new atlas.HtmlMarker({
      position: [-122.33, 47.64],
      htmlContent: '<div style="background-color: red; width: 10px; height: 10px; border-radius: 50%;"></div>',
    });

    markerVelovRef.current = new atlas.HtmlMarker({
      position: [-73.93, 40.73],
      htmlContent: '<div style="background-color: blue; width: 10px; height: 10px; border-radius: 50%;"></div>',
    });

    markerLpaAndCoRef.current = new atlas.HtmlMarker({
      position: [2.35, 48.85],
      htmlContent: '<div style="background-color: green; width: 10px; height: 10px; border-radius: 50%;"></div>',
    });

    map.markers.add(markerLPARef.current);
    map.markers.add(markerVelovRef.current);
    map.markers.add(markerLpaAndCoRef.current);

    // Appliquer le filtre
    const applyFilter = () => {
      markerLPARef.current.setOptions({ visible: showLPA });
      markerVelovRef.current.setOptions({ visible: showVelov });
      markerLpaAndCoRef.current.setOptions({ visible: showLpaAndCo });
    };

    applyFilter();

    // Nettoyer la carte lorsque le composant est démonté
    return () => map.dispose();
  }, [showLPA, showVelov, showLpaAndCo]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
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
  );
};

export default Map;
