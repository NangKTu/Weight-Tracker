import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Welcome <i className='fas fa-user'></i></Navbar.Brand>
        <Link to="/memPage"><Navbar.Text>Member</Navbar.Text></Link>
      </Container>
    </Navbar>
  );
}

export default Header;
