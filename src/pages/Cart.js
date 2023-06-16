import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "./../store/userSlice.js";
import { addCount, deleteItem } from "./../store.js";
import { memo } from "react";

// memo props 변할 때만 랜더링-props가 길고 복잡하면 안 쓰는 게 나을 수도
// 재랜더링 오래 걸리는 컴포넌트 감싸놓으면 좋음
let Child = memo(function () {
  console.log("재렌더링");
  return <div>child</div>;
});
// 비슷한 useMemo-useEffect와 비슷한 용도(실행 시점의 차이)
// 컴포넌트 로드시 1회만 실행하고 싶은 코드가 있으면 거기 담으면 됨

function Cart() {
  // Redux store 가져와주는 함수
  let state = useSelector((state) => state);

  // state.js로 요청 보내주는 함수
  let dispatch = useDispatch();

  return (
    <div>
      {state.user.name} {state.user.age}의 장바구니
      <button
        onClick={() => {
          dispatch(changeAge(100));
        }}
      >
        +
      </button>
      <Child />
      <Table>
        <thead>
          <tr>
            <th>상품ID</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteItem(state.cart[i].id));
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
