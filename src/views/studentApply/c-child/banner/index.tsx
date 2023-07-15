import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { animationConfig } from '../../animate/index';
import './css/index.less';
import { Carousel } from 'antd';
interface Props {
  childern?: ReactNode;
  imgdate: string[];
}
const Banner: FC<Props> = (props) => {
  const { imgdate } = props;
  return (
    <motion.div {...animationConfig}>
      <Carousel autoplay dots={false}>
        {imgdate?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <img src={item} alt="" />
            </div>
          );
        })}
      </Carousel>
    </motion.div>
  );
};
export default memo(Banner);
