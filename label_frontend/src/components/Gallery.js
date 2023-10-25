import React from 'react';
import '../css/Gallery.css';
// import '../App.css';

import { useState, useEffect } from 'react';

function Gallery() {
  // const images = [
  //   'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
  //   'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
  //   'https://media.istockphoto.com/id/1296913338/photo/sonoran-sunset.jpg?s=612x612&w=0&k=20&c=lGXd-vnDmH_bCnR53BNmwxsh3qn8MBLQoh5M926QAbY=',
  //   // Add more image URLs here
  // ];

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    // Retrieve uploaded images from local storage
    const uploadedImages = JSON.parse(localStorage.getItem('droppedImages') || '[]');
    setUploadedImages(uploadedImages);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container">
      <div className="menu">
        <button>Actions</button>
        <button>Community</button>
      </div>
      <div className="header">
        <h1>Gallery Page</h1>
      </div>
      <div className="gallery-container">
        <div className="gallery">
          {uploadedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="gallery-image"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className="selected-image">
            <img src={selectedImage} alt="Selected Image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;