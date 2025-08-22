'use client';

import { useEffect, useRef } from 'react';
import TextType from './TextType';

export default function EntryScreen({ onTransition }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Animation settings
    let speed = 28;
    let scale = window.innerWidth < 768 ? 0.05 : 0.1; // Smaller scale for mobile screens
    let logoColor;

    // DVD object
    let dvd = {
      x: 200,
      y: 300,
      xspeed: 10,
      yspeed: 10,
      img: new Image()
    };

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load your profile image (placeholder for now)
    dvd.img.src = '/face.png';
    
    // Ensure image loads before starting animation
    dvd.img.onload = () => {
      console.log('Image loaded successfully');
      // Start animation only after image loads
      update();
    };
    
    // Pick initial color
    // pickColor();

    // Pick a random color in RGB format
    function pickColor() {
      const r = Math.random() * (254 - 0) + 0;
      const g = Math.random() * (254 - 0) + 0;
      const b = Math.random() * (254 - 0) + 0;
      logoColor = 'rgb(' + r + ',' + g + ', ' + b + ')';
    }

    // Check for border collision
    function checkHitBox() {
      if (dvd.x + dvd.img.width * scale >= canvas.width || dvd.x <= 0) {
        dvd.xspeed *= -1;
        // pickColor();
      }
      
      if (dvd.y + dvd.img.height * scale >= canvas.height || dvd.y <= 0) {
        dvd.yspeed *= -1;
        // pickColor();
      }
    }

    // Main update function
    function update() {
      // Clear the canvas (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw DVD Logo (no background rectangle, just the image)
      ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width * scale, dvd.img.height * scale);
      
      // Move the logo
      dvd.x += dvd.xspeed;
      dvd.y += dvd.yspeed;
      
      // Check for collision
      checkHitBox();
      
      // Continue animation
      animationRef.current = setTimeout(update, speed);
    }

    // Animation will start when image loads

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTap = () => {
    onTransition();
  };

    return (
    <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handleTap}>
      {/* Canvas for DVD animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full text-white"
        style={{ display: 'block' }}
      />

      {/* Tap to Enter Text - Overlay */}
      <TextType
        text={['Hey, I\'m Adithya', 'Welcome to my fun little website', 'Tap anywhere to ENTER']}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        className="absolute z-20 text-center font-bold font-mono text-white text-4xl"
      />
    </div>
  );
}
