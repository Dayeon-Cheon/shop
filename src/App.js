import { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import ProductDetail from "./pages/detail.js";

function App() {
  let [shoes] = useState(data);
  // 페이지 이동 도와주는 함수
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Shop</Navbar.Brand>
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
              <Container>
                <Row>
                  {/* public 폴더 이미지 쓰는 권장 방식 */}
                  {/* <img src={process.env.PUBLIC_URL + "/logo192.png"} width="80%" /> */}
                  {shoes.map(function (a, i) {
                    return <ShopList picNum={i + 1} item={shoes[i]}></ShopList>;
                  })}
                </Row>
              </Container>
            </>
          }
        />
        {/* URL 파라미터: detail/아무거나 라는 뜻 */}
        <Route path="/detail/:id" element={<ProductDetail shoes={shoes} />} />
        {/* 404 page */}
        <Route path="*" element={<div>Page not found</div>} />
        {/* nested routes: 여러 유사한 페이지 필요할 때 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member page</div>} />
          <Route path="location" element={<div>location page</div>} />
        </Route>
      </Routes>
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
    <Col>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + props.picNum + ".jpg"
        }
        width="80%"
      />
      <h4>{props.item.title}</h4>
      <p>{props.item.price}</p>
    </Col>
  );
}

export default App;
