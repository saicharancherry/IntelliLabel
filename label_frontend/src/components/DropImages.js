import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import '../css/DropImages.css';
import openBox from '../images/box-opened.png'
import { Link, useNavigate } from 'react-router-dom';
const IMAGES_KEY = 'droppedImages';

function DropImages() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() =>{
    localStorage.removeItem(IMAGES_KEY)
  }, [])

  const onDrop = useCallback((acceptedFiles) => {

    acceptedFiles.forEach(file => {
      const formData = new FormData();
      formData.append('image', file);
  
      axios.post('http://localhost:8000/upload/', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          console.log('Image uploaded successfully', response);
          const reader = new FileReader();
          reader.onload = () => {
            // Store image as a data URL in local storage
            const images = JSON.parse(localStorage.getItem(IMAGES_KEY) || '[]');
            images.push({image: reader.result, file_name: response.data.file_name});
            localStorage.setItem(IMAGES_KEY, JSON.stringify(images));
    
          };
          reader.readAsDataURL(file);
      })
      .catch(error => {
          console.error('Error uploading image', error);
      });
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

  const videoStreamDetection = () => {
    navigate('/videostream')
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
      <button onClick={videoStreamDetection}>VIDEO STREAM DETECTION</button>
      <div className="go-back" onClick={goBack}> Go Back </div>

    </div>
  );
}

export default DropImages;
