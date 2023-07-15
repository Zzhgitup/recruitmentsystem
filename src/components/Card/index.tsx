import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import './css/index.less';
interface Props {
  childern?: ReactNode;
  stylecss?: any;
  title: string;
  synopsis: string;
  backcolor: string;
  classname1: string;
}
const CardDisplay: FC<Props> = (props) => {
  const { title, synopsis, backcolor, classname1 } = props;
  /*   const title2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setInterval(() => {
      if (title2 == null) {
        console.log('不存在');
      } else {
        title2.current?.classList.contains('splice')
          ? title2.current.classList.remove('splice')
          : title2.current?.classList.add('splice');
      }
    }, 4000);
  }, []); */
  const { stylecss } = props;
  return (
    <div className="Study_Item">
      <div
        style={{ backgroundColor: `${backcolor}`, ...stylecss }}
        className={`${classname1} splice`}
      >
        <div className="Study_img">
          <div className="title">{title}</div>
          <div className="Study_text">{synopsis}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(CardDisplay);
