import React, { useEffect, useRef } from 'react';
import './css/index.less';
import { useMobilorPC } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppselect } from '@/store';
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let CharIndex: any[] = [];
  const navgate = useNavigate();
  useEffect(() => {
    if (!useMobilorPC()) navgate('/studentApply');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;

    function init() {
      canvas!.width = window.innerWidth * devicePixelRatio;
      canvas!.height = window.innerHeight * devicePixelRatio;
      CharIndex = new Array(Math.floor(canvas!.width / (20 * devicePixelRatio))).fill(0);
    }
    init();
    console.log(CharIndex);
    const fontSize = 20 * devicePixelRatio;
    ctx.font = `${fontSize}px Cambria, Cochin, Georgia, Times, "Times New Roman", serif`;

    function getRandomChar() {
      const str = '0123456789abcdefghijklmnopqrstuvwxyz';
      return str[Math.floor(Math.random() * str.length)];
    }

    function draw() {
      const newCharIndex = [...CharIndex];
      ctx!.fillStyle = 'rgba(0,0,0,0.1)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = 'rgba(107, 228, 69, 1)';
      ctx!.textBaseline = 'top';

      newCharIndex.forEach((index, i) => {
        const x = i * fontSize;
        const y = index * fontSize;
        ctx!.fillText(getRandomChar(), x, y);
        if (y > canvas!.height && Math.random() > 0.99) {
          newCharIndex[i] = 0;
        } else {
          newCharIndex[i] = index + 1;
        }
      });
      CharIndex = newCharIndex;
    }

    const intervalId = setInterval(draw, 50);

    return () => clearInterval(intervalId);
  }, []);
  const userinfo = useAppselect((state) => {
    state.user;
  });
  console.log(userinfo);
  return (
    <div className="PCreact">
      <canvas ref={canvasRef} />
      <div className="box"></div>
    </div>
  );
};

export default MatrixRain;
