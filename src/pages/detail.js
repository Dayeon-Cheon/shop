import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkItem, addItem } from "./../store.js";
import { useNavigate } from "react-router-dom";

// import styled from "styled-components";

function ProductDetail(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [alert, setAlert] = useState(1);
  let [input, setInput] = useState("");
  let [onlynum, setOnlynum] = useState(1);
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");

  // mount, update시 실행
  // html 랜더링 이후에 동작: 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 장착 등
  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(0);
    }, 2000);

    setFade("end");

    isNaN(input) ? setOnlynum(0) : setOnlynum(1);

    // clean up function: unmount시 실행됨
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, []);

  // 이거 왜 두 번 실행됨? [] 추가하면 아예 실행 안 됨
  useEffect(() => {
    // 최근 본 상품 리스트에 추가
    let watchedList = JSON.parse(localStorage.getItem("watched"));
    watchedList.push(item);
    localStorage.setItem("watched", JSON.stringify(watchedList));
  });

  // [] dependency: 변수가 변할 때만 실행
  // [] => 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게만 작성

  // 유저가 파라미터에 입력한 정보를 가져옴
  let { id } = useParams();
  let item = props.shoes.find((s) => s.id == id);

  return (
    <div className={`constainer start ${fade}`}>
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
          <button
            className="btn btn-danger"
            onClick={() => {
              // dispatch(checkItem(item.id));
              dispatch(addItem({ id: item.id, name: item.title, count: 1 }));
            }}
          >
            주문하기
          </button>
          {onlynum === 0 ? <div>only number</div> : null}
          <Nav.Link
            onClick={() => {
              navigate("/cart");
            }}
          >
            장바구니
          </Nav.Link>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState("");
  // automatic batching: state 변경 함수들이 근처에 있으면 하나로 합쳐서 한번만 변경함
  // 매번 재렌더링 하는 것이 아니라 마지막에만 해줌
  // 그래서 타이머로 미세한 시간차를 두게 되면 의도대로 동작
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tab]);
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default ProductDetail;
