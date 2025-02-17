import React from 'react';
import '../assets/header.css'; // Nous allons créer un fichier CSS pour le style

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="../../public/LPA.jpg" alt="Logo" className="logo-img" />
      </div>
      
      <div className="title">
        <h1>Dashboard mobilité</h1>
      </div>
    </header>
  );
}

export default Header;
