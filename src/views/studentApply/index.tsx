import React, { memo, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import './css/index.less';
import { useNavigate } from 'react-router-dom';
import Banner from './c-child/banner';
import { imgdate } from '@/assets/date';
import Header from './c-child/header';
import Synopsis from './c-child/synopsis';
import JSConfetti from 'js-confetti';
import Card from './c-child/Scroll-tring';
import Study from './c-child/Study';
import Sport from './c-child/sport';
import Teamrequire from './c-child/Teamrequire';
import Information from './c-child/Information';
import { useMobilorPC } from '@/hooks';

interface IProps {
  children?: ReactNode;
}

const StudentApply: FC<IProps> = () => {
  const foodresult: [string, number, number, string][] = useMemo(
    () => [
      ['火图网', 340, 200, 'https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/p5.png'],
      ['未来小说网', 20, 40, 'https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/p1.png'],
      ['biubiu音乐', 60, 90, 'https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/p6.png']
    ],
    []
  );
  const Navgate = useNavigate();
  const [isshow, setshow] = useState(false);
  const confetti = new JSConfetti();
  function showConfetti() {
    confetti.addConfetti().then(() => {
      setTimeout(() => {
        setshow(true);
      }, 500);
    });
  }
  useEffect(() => {
    showConfetti(); //开屏动画
    const flag = useMobilorPC();
    console.log('手机还是电脑', flag);
    flag ? Navgate('/pc') : Navgate('/studentApply');
  }, []);
  return (
    <div>
      {/* 头部 */}
      <Header />
      {/* 轮播图 */}
      <Banner imgdate={imgdate} />
      {/* 介绍 */}
      <Synopsis />
      {/* 轮播图 作品展示 */}
      {
        <div className="CardBanner">
          <div className="CardBannertitle">
            <img src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/title2.gif" alt="" />
          </div>
          {isshow
            ? foodresult.map(([emoji, hueA, hueB, title]) => (
                <Card Scorr_str={emoji} hueA={hueA} hueB={hueB} key={emoji} title={title} />
              ))
            : ''}
        </div>
      }
      {/* 学习方向 */}
      <Study />
      {/* 小组活动 */}
      <Sport />
      {/* 招新要求 */}
      <Teamrequire />
      {/* 填写信息 */}
      <Information />
      {/*  */}
    </div>
  );
};
export default memo(StudentApply);
