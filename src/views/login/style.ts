import styled from 'styled-components';
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  .loginleft {
    width: 50vw;
    position: relative;
    height: 100vh;
    background-color: rgba(42, 130, 228, 1);
    img {
      width: 300px;
      height: auto;
      top: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .loginright {
    position: relative;
    width: 50vw;
    height: 100vh;
    background: rgba(255, 254, 249, 1);
    background-image: url('../../assets/image/Saly-3@2x.png');
    img {
      width: 300px;
      position: absolute;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .login {
    width: 30vw;
    height: 80vh;
    min-height: 500px;
    min-width: 300px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    top: 10vh;
    z-index: 10;
    top: 50%;
    left: 50%;
    padding: 32px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.08);

    .title {
      font-size: 24px;
    }
    .logintext {
      padding-top: 20px;
      font-weight: 800;
      font-size: 38px;
    }
    .form {
      margin-top: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      .myselfinpuit {
        width: 25vw;
        min-width: 230px;
      }
      .myselfsub {
        width: 20vw;
        animation: up-down 1s cubic-bezier(0.54, 0.16, 0.51, 0.98) infinite;
        margin-top: 10vh;
      }
    }
  }

  @keyframes up-down {
    0% {
      transform: translate(0px, 0px);
    }
    25% {
      transform: translate(-30px, -30px);
    }
    50% {
      transform: translate(0px, 0px);
    }
    75% {
      transform: translate(30px, -30px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
`;
