import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>MAKE SENSE</h1>
      <div className="features">
        <Feature title="Open source and free to use under GPLv3 license" />
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

function Feature({ title }) {
  return (
    <div className="feature">
      <div className="icon"></div>
      <p>{title}</p>
    </div>
  );
}

export default App;