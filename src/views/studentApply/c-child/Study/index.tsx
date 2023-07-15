import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import CardDisplay from '@/components/Card';
import { motion } from 'framer-motion';
import './css/index.less';
import { Study_date } from '@/assets/date';
interface Props {
  childern?: ReactNode;
}
const Study: FC<Props> = () => {
  return (
    <motion.div>
      <div className="Studytitle">
        <img
          src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/%E9%BB%84%E6%A9%99%E8%89%B2%E9%92%93%E9%B1%BC%E8%A3%85%E5%A4%87%E7%A7%91%E6%99%AE%E7%9F%A2%E9%87%8F%E8%BF%90%E5%8A%A8%E5%81%A5%E8%BA%AB%E6%B4%BB%E5%8A%A8%E4%B8%AD%E6%96%87%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E5%B0%8F%E5%9B%BE%20(2).gif"
          alt=""
        />
      </div>
      <div className="Studytwosiders">
        <CardDisplay {...Study_date[0]} classname1="Study_one" />
        <CardDisplay
          {...Study_date[1]}
          classname1="Study_one2"
          stylecss={{ position: 'absolute', right: 0 + 'px', top: 0 + 'px' }}
        />
      </div>
    </motion.div>
  );
};
export default memo(Study);
