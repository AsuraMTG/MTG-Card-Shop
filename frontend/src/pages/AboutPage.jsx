import React, { useState } from 'react';
import './AboutUs.css';
import team from '../public/team.jpg';
import UWcontrol from '../public/UWcontrol.png'

const AboutPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
      team,
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
          
          <p className="about-text">Just two guy playing card games</p>
        
          {/* Central image that changes on click */}
          <div className="image-container">
            <img 
              src={images[currentImageIndex]} 
              alt="Team" 
              className="central-image"
              onClick={handleImageClick}
            />
          </div>
          <p className="about-text">Check out our MTG Decks: </p>  
          <div className='profile-descriptions'>
            <p className='profile-text'>Marci</p>
            <p className='profile-text'>Beni</p>
          </div>
          
          <div className="profile-icons">
            <div className="profile-icon">
                <a href="https://moxfield.com/users/AsuraMTG" target="_blank">
                <img src="https://assets.moxfield.net/assets/images/empty-profile.png" alt="Asura" />
                </a>
            </div>
            <div className="profile-icon">
                <a href="https://moxfield.com/users/shadowsanke" target="_blank">
                <img src="https://assets.moxfield.net/assets/images/empty-profile.png" alt="ShadowSnake" />
                </a>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default AboutPage;
