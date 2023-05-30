import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from "styled-components";

function ProductDetail(props) {
  let [alert, setAlert] = useState(1);
  let [input, setInput] = useState("");
  let [onlynum, setOnlynum] = useState(1);

  // mount, update시 실행
  // html 랜더링 이후에 동작: 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 장착 등
  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(0);
    }, 2000);

    isNaN(input) ? setOnlynum(0) : setOnlynum(1);

    // clean up function: unmount시 실행됨
    return () => {
      clearTimeout(a);
    };
  });
  // [] dependency: 변수가 변할 때만 실행
  // [] => 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게만 작성

  // 유저가 파라미터에 입력한 정보를 가져옴
  let { id } = useParams();
  let item = props.shoes.find((s) => s.id == id);

  return (
    <div className="container">
      {alert === 1 ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}원</p>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
          <button className="btn btn-danger">주문하기</button>
          {onlynum === 0 ? <div>only number</div> : null}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
