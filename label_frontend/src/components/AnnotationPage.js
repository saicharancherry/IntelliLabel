import React from 'react';
import '../css/Gallery.css';
import '../App.css';


function Gallery() {
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    // Add more image URLs here
  ];

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} className="gallery-image" />
      ))}
    </div>
  );
};

export default Gallery;
