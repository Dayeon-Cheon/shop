import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "cheon", age: 30 },
  // state 수정해주는 함수
  reducers: {
    changeName(state) {
      return { name: "park", age: 30 };
    },
    changeAge(state, action) {
      // array/object 경우 return 없이 직접 수정도 가능
      // 그래서 문자 하나만 필요해도 {} 안에 담기도 함
      state.age += action.payload;
    },
  },
});

// state 변경 함수들 남음
export let { changeName, changeAge } = user.actions;

export default user;
