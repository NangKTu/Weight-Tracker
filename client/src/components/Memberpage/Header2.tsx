import { Row, Col, Navbar, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    console.log('token removed');
    navigate('/');
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Weight Tracker</Navbar.Brand>
        <Form>
          <Row>
            <Col xs="auto">
              <Button type="button" onClick={handleLogout}>
                Sign Out
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header2;
