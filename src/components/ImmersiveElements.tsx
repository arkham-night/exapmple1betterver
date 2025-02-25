import React, { useEffect } from 'react';
import './ImmersiveElements.css';

const ImmersiveElements = () => {
  useEffect(() => {
    // Custom Cursor Initialization
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
      if (cursor) {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
      }
    });
  }, []);

  return (
    <div className="immersive-elements">
      {/* Custom Cursor */}
      <div className="custom-cursor"></div>
      
      {/* Dynamic Background */}
      <canvas className="dynamic-background"></canvas>
    </div>
  );
};

export default ImmersiveElements;