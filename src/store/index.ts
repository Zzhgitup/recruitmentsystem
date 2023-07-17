// 引入依赖的库
import { configureStore } from '@reduxjs/toolkit'; // 用于创建 Redux store 的工具函数
import { useSelector, TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux'; // 引入 React Redux 中的 useSelector 和 TypedUseSelectorHook
// 创建 Redux store
import counterSlice from './modules/count';
import userSlice from '@/views/login/store/index';
export const store = configureStore({
  reducer: {
    counter: counterSlice, // 将自定义的 Redux slice 作为 counter reducer 添加到 store 中
    user: userSlice
  }
});
// 推导出 RootState 类型，即 Redux store 中的 state 类型
/* export type RootState = ReturnType<typeof store.getState>; */
const RooStatetype = store.getState(); //获取返回值对象
export type RooStatetype0 = typeof RooStatetype; //推导类型
// 使用 TypedUseSelectorHook 函数签名推导出 useAppselect 函数，用于从 Redux store 中获取 state
export const useAppselect: TypedUseSelectorHook<RooStatetype0> = useSelector;

// 推导出 AppDispatch 类型，即 Redux store 中的 dispatch 函数类型
export type AppDispatch = typeof store.dispatch;
export const appshallowEqual = shallowEqual;
export const usedispatch: () => AppDispatch = useDispatch;
