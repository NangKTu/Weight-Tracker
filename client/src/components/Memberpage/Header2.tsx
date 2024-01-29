import { Row, Col, Navbar, Form, Button } from 'react-bootstrap';

const Header2 = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Weight Tracker</Navbar.Brand>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Navbar.Text>
              Welcome: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Col>
          <Col xs="auto">
            <Button type="submit">Sign Out</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default Header2
