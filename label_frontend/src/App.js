import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          {/* <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact</a></li> */}
        </ul>
      </nav>

      {/* Hero Section with Sliding Images */}
      <section className="hero">
        <div className="slider">
          <img src="/Users/saicharan/Downloads/AI2.jpeg" alt="Image 1" />
          <img src="image2.jpg" alt="Image 2" />
          <img src="image3.jpg" alt="Image 3" />
        </div>
        <div className="hero-content">
          <h1>IntelliLabel</h1>
          <p>Your Solution for Object Annotation and Detection</p>
          <a href="#get-started" className="cta-button">Get Started</a>
        </div>
      </section>

      {/* Platform Capabilities Section with Elevation Pitches */}
      <section className="capabilities">
        <div className="capability">
          <i className="icon"></i>
          <h2>Efficient Annotation</h2>
          <p>Streamline image annotation with precision and ease.</p>
        </div>
        <div className="capability">
          <i className="icon"></i>
          <h2>Real-time Detection</h2>
          <p>Instantly detect and track objects in video streams.</p>
        </div>
        <div className="capability">
          <i className="icon"></i>
          <h2>User-friendly Interface</h2>
          <p>Intuitive UI for seamless interaction and project management.</p>
        </div>
      </section>

      {/* Elevation Pitches */}
      <section className="elevation-pitches">
        <div className="elevation-pitch">
          <h3>Revolutionize Object Annotation</h3>
          <p>Effortlessly create accurate annotations on images for training AI models.</p>
        </div>
        <div className="elevation-pitch">
          <h3>Real-time Object Detection</h3>
          <p>Experience blazing-fast, real-time object detection in video streams, with 45 FPS.</p>
        </div>
        <div className="elevation-pitch">
          <h3>Intuitive Project Management</h3>
          <p>Manage your projects with ease and collaborate effectively with your team.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
