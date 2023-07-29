import { RefObject, useEffect, useState } from 'react';
interface Idancer {
  setDanceshow: (show: boolean) => void;
}
export default function useDanerceHook<T extends Idancer>(domref: RefObject<HTMLElement>): T {
  const [dom, setDom] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(true);
  const distanceBetween = (p1x: number, p1y: number, p2x: number, p2y: number): number => {
    const dx = p1x - p2x;
    const dy = p1y - p2y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  useEffect(() => {
    const currentDom = domref.current;
    if (!currentDom) return;
    setDom(currentDom);
    console.log(currentDom.parentNode);
    const handleMouseMove = (event: MouseEvent) => {
      if (!active) return;
      console.log('123');
      const radius = Math.max(dom!.offsetWidth * 0.75, dom!.offsetHeight * 0.75);
      const parent: HTMLElement = currentDom.parentNode as HTMLElement;
      const bx = parent.offsetLeft + dom!.offsetLeft + dom!.offsetWidth / 2;
      const by = parent.offsetTop + dom!.offsetTop + dom!.offsetHeight / 2;
      const dist = distanceBetween(event.clientX, event.clientY, bx, by);
      const angle = Math.atan2(event.clientY - by, event.clientX - bx);
      const ox = -1 * Math.cos(angle) * Math.max(radius - dist, 0);
      const oy = -1 * Math.sin(angle) * Math.max(radius - dist, 0);
      const rx = oy / 2;
      const ry = -ox / 2;
      dom!.style.transition = `all 0.1s ease`;
      dom!.style.transform = `translate(${ox}px,${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      dom!.style.boxShadow = `0px ${Math.abs(oy)}px ${
        (Math.abs(oy) / radius) * 40
      }px rgba(0,0,0,0.15)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dom]);
  const setDanceshow = (show: boolean) => {
    setActive(show);
  };
  return {
    setDanceshow
  } as T;
}
