import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"; // Import the CSS for the image gallery
import '../App.css';

const NewProject = () => {
  const [selectedImages, setSelectedImages] = useState(); // Initialize as an empty array
  return (
    <div className="start-project-container">
      <header className="top-left-header">
        <h1>Start Project</h1>
      </header>
      {selectedImages && selectedImages.length ? (<Gallery items={selectedImages} />): (<div></div>)}
      {/* <Link to="/new-page">
        <button className="start-button">Start</button>
      </Link> */}
    </div>
  );
};

export default NewProject;
