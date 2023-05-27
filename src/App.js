import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";

function App() {
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
          <Col>
            {/* public 폴더 이미지 쓰는 권장 방식 */}
            <img src={process.env.PUBLIC_URL + "/logo192.png"} width="80%" />
            <h4>Title</h4>
            <p>detail</p>
          </Col>
          <Col>
            <img
              src="https://codingapple1.github.io/shop/shoes2.jpg"
              width="80%"
            />
            <h4>Title</h4>
            <p>detail</p>
          </Col>
          <Col>
            <img
              src="https://codingapple1.github.io/shop/shoes3.jpg"
              width="80%"
            />
            <h4>Title</h4>
            <p>detail</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
