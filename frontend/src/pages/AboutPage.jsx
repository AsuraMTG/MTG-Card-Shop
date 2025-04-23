import React, { useState } from 'react';
import './AboutUs.css';
import gyaa from '../public/gyaa.jpg';
import UWcontrol from '../public/UWcontrol.png'

const AboutPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
      gyaa,
      UWcontrol,
    ];
  
    const handleImageClick = () => {
      // Cycle through images when clicked
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    return (
      <div className="about-container">
        {/* Main content area with light blue background */}
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          
          <p className="about-text">Two guy playing card games</p>
        
          {/* Central image that changes on click */}
          <div className="image-container">
            <img 
              src={images[currentImageIndex]} 
              alt="Team" 
              className="central-image"
              onClick={handleImageClick}
            />
          </div>
          <p className="about-text">Check out our MTG Decks</p>  
          <div className="profile-icons">
            <div className="profile-icon">
                <a href="https://moxfield.com/users/AsuraMTG" target="_blank">
                <img src="https://assets.moxfield.net/assets/images/empty-profile.png" alt="Asura" />
                </a>
              <p>Marci</p>
            </div>
            <div className="profile-icon">
                <a href="https://moxfield.com/users/shadowsanke" target="_blank">
                <img src="https://assets.moxfield.net/assets/images/empty-profile.png" alt="ShadowSnake" />
                </a>
              <p>Beni</p>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default AboutPage;
