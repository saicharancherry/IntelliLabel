// NewPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const DropImages = () => {
  return (
    <div className="DropImages">
      <h1>New Page</h1>
      <Link to="/" className="go-back-link">
        DropImages
      </Link>
    </div>
  );
};

export default DropImages;
