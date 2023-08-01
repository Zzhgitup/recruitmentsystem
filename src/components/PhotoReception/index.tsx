import React, { memo, useState } from 'react';
import { FC, ReactNode } from 'react';
import Camera from '../Camera';
import { Button, Image } from 'antd';
interface Props {
  children?: ReactNode;
  onReturnPhoto: (photo: File | null) => void;
}
//64转文件
function base64ToFile(base64: string): File | null {
  // 检查 base64 格式
  const pattern = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,(.*)/;
  const result = pattern.exec(base64);
  if (!result) {
    console.error('Invalid base64 format');
    return null;
  }
  const mime = result[1];
  const base64Data = result[2];
  // 解码 base64
  const binaryData = atob(base64Data);
  // 转换为 buffer
  const buffer = new ArrayBuffer(binaryData.length);
  const dataView = new Uint8Array(buffer);
  for (let i = 0; i < binaryData.length; i++) {
    dataView[i] = binaryData.charCodeAt(i);
  }

  // 生成文件名
  let fileName = 'file';
  if (mime) {
    const extensionMatch = /([a-zA-Z0-9]+)$/.exec(mime);
    if (extensionMatch) {
      fileName += '.' + extensionMatch[1];
    }
  }
  // 创建 File 对象
  return new File([buffer], fileName, { type: mime });
}
const PhotoReception: FC<Props> = ({ onReturnPhoto }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [state, setState] = useState({
    photo: '1'
  });
  const handleUploadPhoto = (photo: string) => {
    // handle the uploaded photo here
    console.log(photo);
    const base64String = photo;
    const imgFile = base64ToFile(base64String);
    onReturnPhoto(imgFile);
    const reader = new FileReader();
    const start = 0;
    const end = imgFile?.size;
    const blob = imgFile?.slice(start, end);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      // 读取文件后，将其转换为 Data URL
      const dataURL = event.target?.result as string;
      setState({ photo: dataURL });
    };
    if (blob) {
      reader.readAsDataURL(blob);
    }
  };
  const handleUnloadPhoto = (unload: boolean) => {
    // handle the uploaded photo here
    setVisible(unload);
  };

  return (
    <div className="PhotoReceptionBox">
      <Button type="primary" onClick={() => setVisible(!visible)}>
        拍照上传
      </Button>
      {state.photo !== '1' && (
        <Image style={{ padding: 10 }} width="100%" src={state.photo} alt="呜呜呜" />
      )}
      {visible && <Camera onUploadPhoto={handleUploadPhoto} onUnloadPhoto={handleUnloadPhoto} />}
    </div>
  );
};
export default memo(PhotoReception);
