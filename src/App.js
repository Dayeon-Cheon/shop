import { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import data from "./data.js";

function App() {
  let [shoes] = useState(data);
  console.log(shoes);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
