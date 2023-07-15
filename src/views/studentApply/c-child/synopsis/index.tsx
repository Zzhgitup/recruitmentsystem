import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import './css/index.less';
import Typing from '@/utils/Tying/index';
import { animationConfig, hind } from '../../animate';
interface Props {
  childern?: ReactNode;
}
const Synopsis: FC<Props> = () => {
  return (
    <motion.div {...animationConfig}>
      <div className="title">
        <img
          src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/%E9%BB%84%E6%A9%99%E8%89%B2%E9%92%93%E9%B1%BC%E8%A3%85%E5%A4%87%E7%A7%91%E6%99%AE%E7%9F%A2%E9%87%8F%E8%BF%90%E5%8A%A8%E5%81%A5%E8%BA%AB%E6%B4%BB%E5%8A%A8%E4%B8%AD%E6%96%87%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E5%B0%8F%E5%9B%BE%20(1).gif"
          alt=""
        />
      </div>
      <div className="IntroductoryText">
        <motion.div className="Textbody" {...hind}>
          <Typing delay={500} frequency={10}>
            工作室成立以来先后获得国家级创新创业项目5项，河南省创业扶持资金项目2项，校级创新创业项目8项，在各类学科竞赛中获国家级奖项18项，省级奖项160项，设计开发各类软件产品40余个，培养毕业生50余人，均就职于百度、阿里巴巴、騰讯、京东、小米、字节跳动、快手等知名互联网公司，平均就业年薪达22万元以上
          </Typing>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default memo(Synopsis);
