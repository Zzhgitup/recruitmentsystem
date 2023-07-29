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
      if (!active || !dom) return;

      console.log(active);
      const radius = Math.max(dom.offsetWidth * 0.75, dom.offsetHeight * 0.75);
      // 获取窗口的宽度和高度
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      // 计算舞蹈元素的中心位置相对于窗口的坐标
      const domRect = dom.getBoundingClientRect();
      const bx = domRect.left + domRect.width / 2;
      const by = domRect.top + domRect.height / 2;

      // 计算鼠标指针相对于舞蹈元素中心的距离和角度
      const dist = distanceBetween(event.clientX, event.clientY, bx, by);
      const angle = Math.atan2(event.clientY - by, event.clientX - bx);

      // 根据窗口大小调整动画效果
      const ox = (-1 * Math.cos(angle) * Math.max(radius - dist, 0) * windowWidth) / 1440; // 将舞蹈元素的最大位移乘以窗口宽度与标准宽度之间的比例
      const oy = (-1 * Math.sin(angle) * Math.max(radius - dist, 0) * windowHeight) / 900; // 将舞蹈元素的最大位移乘以窗口高度与标准高度之间的比例
      const rx = oy / 2;
      const ry = -ox / 2;

      dom.style.transition = `all 0.1s ease`;
      dom.style.transform = `translate(${ox}px,${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      dom.style.boxShadow = `0px ${Math.abs(oy)}px ${
        (Math.abs(oy) / radius) * 60
      }px rgba(0,0,0,0.15)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dom, active]);
  const setDanceshow = (show: boolean) => {
    console.log('122');
    setActive(show);
  };
  return {
    setDanceshow
  } as T;
}
