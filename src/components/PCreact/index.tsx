import React, { useEffect, useRef } from 'react';
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    const ctx = canvas.getContext('2d');

    const devicePixelRatio = window.devicePixelRatio || 1;

    function init() {
      canvas!.width = window.innerWidth * devicePixelRatio;
      canvas!.height = window.innerHeight * devicePixelRatio;
    }

    const fontSize = 20 * devicePixelRatio;
    ctx!.font = `${fontSize}px Cambria, Cochin, Georgia, Times, "Times New Roman", serif`;

    function getRandomChar() {
      const str = '0123456789abcdefghijklmnopqrstuvwxyz';
      return str[Math.floor(Math.random() * str.length)];
    }

    function draw() {
      const columCount = Math.floor(canvas!.width / fontSize);
      const charIndex = new Array(columCount).fill(0);

      ctx!.fillStyle = 'rgba(0,0,0,0.1)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = '#6BE445';
      ctx!.textBaseline = 'top';

      for (let i = 0; i < columCount; i++) {
        const x = i * fontSize;
        const y = charIndex[i] * fontSize;
        ctx!.fillText(getRandomChar(), x, y);
        if (y > canvas!.height && Math.random() > 0.99) {
          charIndex[i] = 0;
        } else {
          charIndex[i]++;
        }
      }
    }

    init();
    const intervalId = setInterval(draw, 50);

    return () => clearInterval(intervalId);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MatrixRain;
