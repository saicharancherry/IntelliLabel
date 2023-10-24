import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/DropImages.css';
import openBox from '../images/box-opened.png'
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        // Store image as a data URL in local storage
        const images = JSON.parse(localStorage.getItem('droppedImages') || '[]');
        images.push(reader.result);
        localStorage.setItem('droppedImages', JSON.stringify(images));

      };
      reader.readAsDataURL(file);
    });
    setSelectedFiles(acceptedFiles);

  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const goBack = () => {
    window.history.back();
  };

  const objectDetection = () => {
    navigate('/gallery-page')
  }

  return (
    <div className="container">
      <h1>INTELLI LABEL</h1>

      <div className="left-section">
      </div>
      <div className="right-section">
        {selectedFiles.length ? (<p>{selectedFiles.length} files selected</p>) : (

          <div {...getRootProps()} className="dropbox">
            <input {...getInputProps()} />
            <img src={openBox} alt="Drop Image" />
            <p>Drop images here or <span>Click here to select them</span></p>
          </div>
        )}



      </div>
      <button onClick={objectDetection}>OBJECT DETECTION</button>
      <div className="go-back" onClick={goBack}> Go Back </div>

    </div>
  );
}

export default App;
