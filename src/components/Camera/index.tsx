import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface CameraProps {
  children?: ReactNode;
  onUploadPhoto: (photo: string) => void;
  onUnloadPhoto: (unload: boolean) => void;
}

interface CameraState {
  streaming: boolean;
  width: number;
  height: number;
  photo: string | undefined;
  facing: 'user' | 'environment';
}

const Camera: React.FC<CameraProps> = ({ onUploadPhoto, onUnloadPhoto }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let mediaStream: MediaStream | null = null;
  const [state, setState] = useState<CameraState>({
    streaming: false,
    width: 320,
    height: 0,
    photo: undefined,
    facing: 'environment'
  });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: 30,
          facingMode: state.facing
        },
        audio: false
      })
      .then((stream) => {
        mediaStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.log(`An error occurred: ${err}`);
      });
    return () => {
      // 组件卸载时的逻辑
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [state.facing]);

  const handleCanPlay = () => {
    if (!state.streaming) {
      const height =
        (videoRef.current?.videoHeight as number) /
        (((videoRef.current?.videoWidth as number) / state.width) as number);
      setState({
        ...state,
        streaming: true,
        height: height as number
      });
    }
  };

  const handleTakePicture = () => {
    const context = canvasRef.current?.getContext('2d');
    if (state.width && state.height) {
      // Use the actual video dimensions to set the canvas size.
      const videoWidth = videoRef.current?.videoWidth;
      const videoHeight = videoRef.current?.videoHeight;
      if (videoWidth && videoHeight) {
        canvasRef.current?.setAttribute('width', videoWidth.toString());
        canvasRef.current?.setAttribute('height', videoHeight.toString());
        context?.drawImage(videoRef.current as HTMLVideoElement, 0, 0, videoWidth, videoHeight);
        const data = canvasRef.current?.toDataURL('image/jpeg', 1);
        setState({ ...state, photo: data });
      }
    } else {
      console.log('Error capturing photo.');
    }
  };

  const handleDeletePhoto = () => {
    setState({ ...state, photo: undefined });
  };

  const handleUploadPhoto = () => {
    if (state.photo) {
      // console.log(state.photo); // 这里是你的数据，你可以对其进行上传操作。
      onUploadPhoto(state.photo);
      onUnloadPhoto(false);
    }
  };

  const handleUnloadPhoto = () => {
    onUnloadPhoto(false);
  };

  const handleSwitchCamera = () => {
    setState({
      ...state,
      facing: state.facing === 'user' ? 'environment' : 'user',
      streaming: false
    });
  };
  const { photo } = state;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#FFFFFF'
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 5,
          overflow: 'hidden',
          marginBottom: 10,
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: '1000'
          }}
          onClick={handleUnloadPhoto}
        >
          X
        </div>
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: '1000'
          }}
          onClick={handleSwitchCamera}
        >
          {state.facing === 'user' ? '前置' : '后置'}
        </div>
        <video
          id="video"
          ref={videoRef}
          onCanPlay={handleCanPlay}
          width={state.width}
          height={state.height}
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: photo ? 'none' : 'block'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold'
            }}
          >
            {/* 这里添加了一个按钮 */}
            <button
              style={{
                backgroundColor: '#1e90ff',
                color: '#fff',
                border: '5px #fff solid',
                padding: '40px',
                borderRadius: '100%',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={handleTakePicture}
            ></button>
          </div>
        </div>
        <canvas id="canvas" ref={canvasRef} style={{ display: photo ? 'block' : 'none' }} />
        {photo && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img src={photo} alt="Captured" style={{ width: '100%', borderRadius: 5 }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                position: 'absolute',
                bottom: '10%',
                width: '100%'
              }}
            >
              <button
                style={{
                  backgroundColor: '##CCCCCC',
                  color: '#424242',
                  border: '5px #CCCCCC solid',
                  padding: '40px',
                  borderRadius: '100%',
                  fontSize: 16,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: photo ? 'block' : 'none'
                }}
                onClick={handleDeletePhoto}
              >
                重拍
              </button>
              <button
                style={{
                  backgroundColor: '#1e90ff',
                  border: '5px #FFFFFF solid',
                  color: '#fff',
                  padding: '40px',
                  borderRadius: '100%',
                  fontSize: 16,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: photo ? 'block' : 'none'
                }}
                onClick={handleUploadPhoto}
              >
                上传
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
