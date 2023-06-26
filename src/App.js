import {
  useEffect,
  useState,
  lazy,
  Suspense,
  useTransition,
  useDeferredValue,
} from "react";
import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import data from "./data.js";
import data2 from "./data2.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// import ProductDetail from "./pages/Detail.js";
import axios from "axios";
// import Cart from "./pages/Cart.js";
import Category from "./pages/Category.js";
import { useQuery } from "react-query";

// 첫 페이지 로딩 속도를 향상
// Detail, Cart 컴포넌트 로딩 시간 발생
const ProductDetail = lazy(() => import("./pages/Detail.js"));
const Cart = lazy(() => import("./pages/Cart.js"));

function App() {
  useEffect(() => {
    if (localStorage.getItem("watched") === null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let [shoes, setShoes] = useState(data2);
  let [bntclick, setBntclick] = useState(0);
  let [loading, setLoading] = useState(false);
  let [stock] = useState([10, 11, 2]);

  let [item, setItem] = useState(data);

  // 성능 향상, 오래걸리는 부분을 감싸면 코드 실행 시점 조절해주어 렌더링시 버벅이지 않게 해줌
  // let [isPending, startTransition] = useTransition();

  // state 변동 사항 생기면 늦게 처리해줌
  // let state = useDeferredValue(name);

  // redux-persist 사용하면 모든 state 자동 저장

  // React Query: 실시간 데이터를 계속 가져와야하는 사이트에 좋음 ex) 코인거래소, 채팅
  // ajax 요청 성공/실패/로딩중 쉽게 파악 가능
  // 틈만나면 자동으로 재요청해줌(refetch)
  // 실패시 retry 알아서 해줌
  // state 공유 안 해도 됨 props 전송 필요 없음
  // ajax 결과 캐싱 가능(5분 동안 기억),  그전 성공 결과를 먼저 보여주기 때문에 빠름
  let result = useQuery("result", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        return a.data2;
      });
    // 리패치 되는 시간 설정, 자동 리패치 끌 수도 있음
    // { staleTime: 2000 }
  });

  // 페이지 이동 도와주는 함수
  let navigate = useNavigate();

  let [showButton, setShowButton] = useState(true);

  return (
    <div className="App">
      <div className="topnav">
        <Link to="/" className="home-link">
          Online Supermarket
        </Link>
        <Link to="/list?cat=fresh-food" className="category-link">
          Fresh food
        </Link>
        <Link to="/list?cat=food-cupboard" className="category-link">
          Food cupboard
        </Link>
        <Link to="/list?cat=drinks" className="category-link">
          Drinks
        </Link>
        <div className="topnav-right">
          <Link to="/cart" className="cart-link">
            Cart
          </Link>
          {/* user name or login button */}
        </div>
      </div>

      <Suspense fallback={<div>loading..</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <div className="container">
                  <div className="row">
                    {/* public 폴더 이미지 쓰는 권장 방식 */}
                    {/* <img src={process.env.PUBLIC_URL + "/logo192.png"} width="80%" /> */}
                    {/* {shoes.map(function (a, i) {
                      return (
                        <ShopList picNum={i + 1} item={shoes[i]}></ShopList>
                      );
                    })} */}

                    {item.map(function (a, i) {
                      return <ItemList picNum={i} item={item[i]}></ItemList>;
                    })}
                  </div>
                  {showButton && (
                    <button
                      onClick={() => {
                        // 응용3. 버튼을 누른 직후엔 "로딩중입니다" 이런 글자를 주변에 띄우고 싶으면?
                        // 그리고 요청이 성공하거나 실패하거나 그 후엔 "로딩중입니다" 글자를 제거해야합니다.

                        setLoading(true);
                        console.log("before" + loading);

                        // ShowLoading(setLoading);

                        if (bntclick == 0) {
                          axios
                            .get(
                              "https://codingapple1.github.io/shop/data2.json"
                            )
                            .then((result) => {
                              // 리액트는 html을 생성하는 게 아니라 스위치를 건드리는 방식으로 코드를 짬
                              setShoes((current) => [
                                ...current,
                                ...result.data2,
                              ]);
                              setBntclick(bntclick + 1);
                              setLoading(false);
                              console.log("after" + loading);
                            })
                            .catch(() => {
                              setLoading(false);
                              console.log("failed");
                            });
                        }
                        if (bntclick == 1) {
                          axios
                            .get(
                              "https://codingapple1.github.io/shop/data3.json"
                            )
                            .then((result) => {
                              setShoes((current) => [
                                ...current,
                                ...result.data2,
                              ]);
                              setBntclick(bntclick + 1);
                              setLoading(false);
                            })
                            .catch(() => {
                              setLoading(false);
                              console.log("failed");
                            });
                          setShowButton(!showButton);

                          // POST 요청
                          // axios.post('URL', {name : 'kim'})
                          // 동시에 AJAX 요청 여러개 날릴 때
                          // Promise.all( [axios.get('URL1'), axios.get('URL2')] )
                        }
                      }}
                    >
                      more
                    </button>
                  )}
                  {loading === true ? <div>loading</div> : null}
                </div>
              </>
            }
          />
          {/* URL 파라미터: detail/아무거나 라는 뜻 */}
          <Route path="/list" element={<Category item={item} />} />
          <Route path="/detail/:id" element={<ProductDetail shoes={shoes} />} />
          <Route path="/cart" element={<Cart shoes={shoes} />} />
          {/* 404 page */}
          <Route path="*" element={<div>Page not found</div>} />
          {/* nested routes: 여러 유사한 페이지 필요할 때 */}
          {/* <Route path="/about" element={<About />}>
            <Route path="member" element={<div>member page</div>} />
            <Route path="location" element={<div>location page</div>} />
          </Route> */}
        </Routes>
      </Suspense>

      <WatchedList />
    </div>
  );
}

// function About() {
//   return (
//     <div>
//       <h4>About page</h4>
//       <Outlet></Outlet>
//     </div>
//   );
// }

// function ShopList(props) {
//   return (
//     <div className="col-md-4">
//       <img
//         src={
//           "https://codingapple1.github.io/shop/shoes" + props.picNum + ".jpg"
//         }
//         width="80%"
//       />
//       <h4>{props.item.title}</h4>
//       <p>{props.item.price}</p>
//     </div>
//   );
// }

function ItemList(props) {
  return (
    <div className="col-md-4">
      <img
        className="item-img-main"
        src={process.env.PUBLIC_URL + "/img/" + props.picNum + ".jpg"}
      />
      <h4>{props.item.title}</h4>
      <p>£{props.item.price}</p>
    </div>
  );
}

function WatchedList() {
  // let watchedList = JSON.parse(localStorage.getItem("watched"));
  // console.log(watchedList);
  // watchedList = watchedList
  //   .map(JSON.stringify)
  //   .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
  //   .filter(function (item, index, arr) {
  //     return arr.indexOf(item, index + 1) === -1;
  //   }) // check if there is any occurence of the item in whole array
  //   .reverse()
  //   .map(JSON.parse); // revert it to original state
  // if (watchedList.length !== 0) {
  //   return watchedList.map(function (a, i) {
  //     return (
  //       <div>
  //         <p>최근 본 상품</p>
  //         {/* 사진 뭔가 다른 거 가져오는 듯 */}
  //         <img
  //           src={
  //             "https://codingapple1.github.io/shop/shoes" +
  //             watchedList[i].id +
  //             ".jpg"
  //           }
  //           width="80%"
  //         />
  //         <p>{watchedList[i].title}</p>
  //       </div>
  //     );
  //   });
  // }
}

export default App;
