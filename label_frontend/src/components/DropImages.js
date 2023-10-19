import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/DropImages.css';
import openBox from '../images/box-opened.png'

function App() {
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
        <h1>INTELLI LABEL</h1>

      <div className="left-section">
      </div>
      <div className="right-section">
        <div {...getRootProps()} className="dropbox">
          <input {...getInputProps()} />
          <img src={openBox} alt="Drop Image" />
          <p>Drop images here or <span>Click here to select them</span></p>
        </div>
       
      </div>
      <button>OBJECT DETECTION</button>
      <div className="go-back" onClick={goBack}> Go Back </div>

    </div>
  );
}

export default App;
