import React from 'react';
import '../css/Gallery.css';
// import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const IMAGES_KEY = 'droppedImages';

function Gallery() {
  const navigate = useNavigate();
  // const images = [
  //   'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
  //   'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
  //   'https://media.istockphoto.com/id/1296913338/photo/sonoran-sunset.jpg?s=612x612&w=0&k=20&c=lGXd-vnDmH_bCnR53BNmwxsh3qn8MBLQoh5M926QAbY=',
  //   // Add more image URLs here
  // ];

  const [uploadedImages, setUploadedImages] = useState([]);


  useEffect(() => {
    // Retrieve uploaded images from local storage
    const storedImages = JSON.parse(localStorage.getItem(IMAGES_KEY) || '[]');
    setUploadedImages(storedImages);

    // Send stored images to the API for detection
    fetch('http://127.0.0.1:8000/detect/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        images: storedImages
      })
    })
      .then(response => response.json())
      .then(data => {
        const annotatedImages = data.annotated_images;
        console.log("99999iiii ", annotatedImages)
        setUploadedImages(annotatedImages);

        // Store the annotated images back in local storage
        localStorage.setItem('droppedImages', JSON.stringify(annotatedImages));
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index)
  };

  const openAnnotationPage = () => {
    navigate(`/object-annotation/${selectedImageIndex}`)
  }

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
              src={image.image}
              alt={`Image ${index}`}
              className="gallery-image"
              onClick={() => handleImageClick(image.image, index)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className="selected-image">
            <img src={selectedImage} onClick={openAnnotationPage} alt="Selected Image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;