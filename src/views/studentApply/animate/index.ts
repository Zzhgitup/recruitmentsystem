const animationConfig = {
  //淡入
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01]
  }
};
const hind = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01]
  }
};
export { animationConfig, hind };
