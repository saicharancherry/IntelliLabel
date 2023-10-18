// HomePage.js
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'


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

  return (
    <div className="container">
      <div className="image-grid">
        {imageData.map((item) => (
          <div className="image-item" key={item.id}>
            <img src={item.src} alt={item.description} />
            <div className="description">{item.description}</div>
          </div>
        ))}
      </div>
      {showDropImages && (
        <div className={`drop-images-section ${showDropImages ? 'show' : ''}`}>
          <div className="drop-images-box">
            <input
              type="file"
              accept="image/*"
              multiple
            />
            <button onClick={handleGetStarted}>Proceed</button>
          </div>
        </div>
      )}
      {!showDropImages && (
        <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
      )}
    </div>
  );
}

export default HomePage;


// const HomePage = () => {
//   return (
//     <div className="home-page">
//     <h1>IntelliLabel</h1>

//         <motion.image 
//             animate={{ x: [0, 0, 50], opacity: 1, scale: 1 }}
//             transition={{
//                 duration: 5,
//                 delay: 0.3,
//                 ease: [0.5, 0.71, 1, 1.5],
//             }}
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileHover={{ scale: 1.2 }}
//         >
//             Animation made easy with Framer Motion

//         </motion.image>
//     </div>
//   );
// };

// export default HomePage;
