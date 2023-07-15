/* eslint-disable react/react-in-jsx-scope */
import './css/index.less';
import { motion, Variants } from 'framer-motion';

interface Props {
  hueA: number;
  hueB: number;
  Scorr_str?: string;
  title?: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

function Card({ hueA, hueB, Scorr_str, title }: Props) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" style={{ background }} />
      <motion.div className="card" variants={cardVariants}>
        <img src={title} alt="" />
        <div className="itemjiehao">{Scorr_str}</div>
      </motion.div>
    </motion.div>
  );
  // eslint-disable-next-line react/react-in-jsx-scope
}
export default Card;
