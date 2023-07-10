import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
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
      <App />
    </Provider>
  );
};
root.render(<AppWithUI />);
