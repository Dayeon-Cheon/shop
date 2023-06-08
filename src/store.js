import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

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
  reducers: {
    // 장바구니 중복 체크
    checkItem(state, action) {
      //   return state.some((i) => i.id === action.payload);
    },
    addCount(state, action) {
      let item = state.find((i) => i.id === action.payload);
      item.count += 1;
    },
    addItem(state, action) {
      let checkItem = state.some((i) => i.id === action.payload.id);
      console.log(action.payload.id);
      console.log(checkItem);
      // 중복 아이템 수량만 추가
      if (checkItem === true) {
        let item = state.find((i) => i.id === action.payload.id);
        item.count += 1;
      }
      // 새 아이템 추가
      if (checkItem === false) {
        state.push(action.payload);
      }
    },
    deleteItem(state, action) {
      return state.filter((i) => i.id !== action.payload);
    },
  },
});

export let { checkItem, addCount, addItem, deleteItem } = cart.actions;

export default configureStore({
  // state 여기에 등록해야 사용 가능
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
