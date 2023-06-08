import { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import ProductDetail from "./pages/Detail.js";
import axios from "axios";
import Cart from "./pages/Cart.js";

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let [shoes, setShoes] = useState(data);
  let [bntclick, setBntclick] = useState(0);
  let [loading, setLoading] = useState(false);
  let [stock] = useState([10, 11, 2]);

  // 페이지 이동 도와주는 함수
  let navigate = useNavigate();

  let [showButton, setShowButton] = useState(true);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          {/* <Navbar.Brand href="#">Shop</Navbar.Brand> */}

          <Nav.Link
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* navigate(1) 앞으로 한 페이지
              navigate(-1) 뒤로 한 페이지 */}
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail");
                }}
              >
                Detail
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
                  {shoes.map(function (a, i) {
                    return <ShopList picNum={i + 1} item={shoes[i]}></ShopList>;
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
                          .get("https://codingapple1.github.io/shop/data2.json")
                          .then((result) => {
                            // 리액트는 html을 생성하는 게 아니라 스위치를 건드리는 방식으로 코드를 짬
                            setShoes((current) => [...current, ...result.data]);
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
                          .get("https://codingapple1.github.io/shop/data3.json")
                          .then((result) => {
                            setShoes((current) => [...current, ...result.data]);
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
        <Route path="/detail/:id" element={<ProductDetail shoes={shoes} />} />

        <Route path="/cart" element={<Cart shoes={shoes} />} />

        {/* 404 page */}
        <Route path="*" element={<div>Page not found</div>} />
        {/* nested routes: 여러 유사한 페이지 필요할 때 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member page</div>} />
          <Route path="location" element={<div>location page</div>} />
        </Route>
      </Routes>

      <WatchedList />
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>About page</h4>
      <Outlet></Outlet>
    </div>
  );
}

function ShopList(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + props.picNum + ".jpg"
        }
        width="80%"
      />
      <h4>{props.item.title}</h4>
      <p>{props.item.price}</p>
    </div>
  );
}

// function ShowLoading(props) {
//   return (
//     props(true);

//     )
// }

function WatchedList() {
  let watchedList = JSON.parse(localStorage.getItem("watched"));

  watchedList = watchedList
    .map(JSON.stringify)
    .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
    .filter(function (item, index, arr) {
      return arr.indexOf(item, index + 1) === -1;
    }) // check if there is any occurence of the item in whole array
    .reverse()
    .map(JSON.parse); // revert it to original state

  console.log(watchedList);

  if (watchedList.length != 0) {
    return <div>there's array</div>;
  } else {
    return <div>no array</div>;
  }
}

export default App;
