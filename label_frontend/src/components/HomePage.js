// HomePage.js
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import openSource from '../images/open-source.png'
import onlineSource from '../images/online.png'
import privateSource from '../images/private.png'

import React, { useState } from 'react';
import '../App.css';

function HomePage() {
  const [showDropImages, setShowDropImages] = useState(false);

  const imageData = [
    {
      id: 1,
      src: require('../images/robot.png'),
      description: 'Image 1 Description',
    },
    {
      id: 2,
      src: require('../images/robot.png'),
      description: 'Image 2 Description',
    },
    {
      id: 3,
      src: require('../images/robot.png'),
      description: 'Image 3 Description',
    },
    // Add more image data as needed
  ];

  const handleGetStarted = () => {
    setShowDropImages(true);
  };


function Feature({ title }) {
  return (
    <div className="feature">
      <div className="icon">
      <img src={onlineSource} alt="icon" />
      </div>
      <p>{title}</p>
    </div>
  );
}

  return (
    <div className="container">
      <h1 className='top-left-header'>Intelli Label</h1>
      <div className="features">
        <Feature title="Open source and free to use under GPLv3 license" imgPath="" />
        <Feature title="No advanced installation required, just open in your browser" />
        <Feature title="We don't store your images, because we don't send them anywhere" />
        <Feature title="Support multiple label types: rects, points, polygons, and ellipses" />
        <Feature title="Support output file formats like YOLO, VOC XML, VGG JSON, CSV" />
        <Feature title="Use AI to make your work more productive" />
      </div>
      <button>Get Started!</button>
    </div>
  );
}

export default HomePage;