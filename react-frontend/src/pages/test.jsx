import React, { useState } from 'react';
import Test from '../components/test';

function Velov() {
  const [showLPA, setShowLPA] = useState(true);
  const [showVelov, setShowVelov] = useState(true);
  const [showLpaAndCo, setShowLpaAndCo] = useState(true);

  return (
    <main>
      <Test
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

export default Velov;
