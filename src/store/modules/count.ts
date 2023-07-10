// 引入依赖的库
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// 创建 counterSlice
export const counterSlice = createSlice({
  name: 'counter', // slice 名称
  initialState: {
    // 初始化 state
    name: '张三', // 姓名
    age: 1000 // 年龄
  },
  reducers: {
    //修改方法
    changename(state, { payload }: PayloadAction<string>) {
      state.name = payload;
    }
  } // 定义 reducer 函数
});
// 通过 createSlice 自动生成的 action creators，对应 reducers 中的每一个函数
// 在这里没有定义具体的 reducer 函数，因此没有生成对应的 action creators
export default counterSlice.reducer;
export const { changename } = counterSlice.actions;
