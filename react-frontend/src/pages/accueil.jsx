import React, { useState } from 'react';
import Map from '../components/map_mob_v2';

function Accueil() {
    const [showLPA, setShowLPA] = useState(true);
    const [showVelov, setShowVelov] = useState(true);
    const [showLpaAndCo, setShowLpaAndCo] = useState(true);

    return (
        <main>
            <Map
                showLPA={showLPA}
                setShowLPA={setShowLPA}
                showVelov={showVelov}
                setShowVelov={setShowVelov}
                showLpaAndCo={showLpaAndCo}
                setShowLpaAndCo={setShowLpaAndCo}
            />
        </main>
    );
}

export default Accueil;
