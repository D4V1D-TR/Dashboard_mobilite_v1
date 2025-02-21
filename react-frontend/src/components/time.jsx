import React, { useState, useEffect } from 'react';

const TimeBubble = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timeInterval = setInterval(() => {setCurrentTime(new Date().toLocaleTimeString());}, 2*60*1000);
    const refreshInterval = setInterval(() => {window.location.reload();}, 2*60*1000);

    // Cleanup: on démonte le composant, on nettoie les intervalles
    return () => {
      clearInterval(timeInterval);
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div style={styles.bubble}>
      Dernière mise à jour : {currentTime}
    </div>
  );
};

const styles = {
  bubble: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
};

export default TimeBubble;
