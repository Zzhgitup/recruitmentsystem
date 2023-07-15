import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import './css/index.less';
interface Props {
  childern?: ReactNode;
}
const Sport: FC<Props> = () => {
  return (
    <div className="Sport">
      <div className="title">
        <img src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/sport.gif" alt="" />
      </div>
      <div className="aspect-ratio">
        <iframe
          src="https://player.bilibili.com/player.html?aid=937401748&bvid=BV1NT4y1S7kc&cid=565103998&page=1"
          scrolling="no"
          frameBorder="0"
          // eslint-disable-next-line react/no-unknown-property
          allowFullScreen={true}
          /*  sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts" */
        ></iframe>
      </div>
    </div>
  );
};
export default memo(Sport);
