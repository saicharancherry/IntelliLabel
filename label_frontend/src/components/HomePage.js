import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import openSource from '../images/open-source.png'
import onlineSource from '../images/online.png'
import privateSource from '../images/private.png'
import openBox from '../images/box-opened.png'

import '../App.css';

function HomePage() {
  const navigate = useNavigate();

  function Feature({ title }) {
    return (
      <div className="feature">
        <div className="icon">
          <img draggable="false" alt="open-source" src="https://www.makesense.ai/ico/open-source.png" />
        </div>
        <p className='titles'>{title}</p>
      </div>
    );
  }

  const getStarted = () => {
    navigate('/get-started')
  }

  return (
    <div className='App'>
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

        <button className='get-started-button' onClick={getStarted}>Get Started</button>
      </div>
    </div>
  );
}

export default HomePage;