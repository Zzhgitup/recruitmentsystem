import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { store } from './store';
import '@/assets/css/index.less';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement //类型断言
);
interface Props {
  childern?: ReactNode;
}
const AppWithUI: FC<Props> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
root.render(<AppWithUI />);
