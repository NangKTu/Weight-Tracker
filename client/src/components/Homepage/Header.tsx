import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          Welcome <i className="fas fa-user"></i>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
