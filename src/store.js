import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "cheon",
  // state 수정해주는 함수
  reducers: {
    changeName(state) {
      return "dayeon " + state;
    },
  },
});

// state 변경 함수들 남음
export let { changeName } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 2],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  // state 여기에 등록해야 사용 가능
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
