import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Avatar } from 'antd';
import './css/index.less';
import { animationConfig } from '../../animate/index';
interface Props {
  childern?: ReactNode;
}
const Header: FC<Props> = () => {
  return (
    <motion.div {...animationConfig} className="header">
      <div className="headername">
        <img
          src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/%E5%B0%8F%E7%BB%84icon.png"
          alt=""
        />
      </div>
      <Avatar
        className="headerimg"
        src={
          'https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/IMG_8289(20230711-164604).JPG'
        }
      />
    </motion.div>
  );
};
export default memo(Header);
