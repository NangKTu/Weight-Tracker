import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
import LogIn from './LogIn'
import Register from './Register'

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Weight Tracker <i className='fas fa-weight-scale'></i></h1>
        </Container>
        {showLogin ? (
          <LogIn onToggle={handleToggle} />
        ) : (
          <Register onToggle={handleToggle} />
        )}
      </main>
      <Footer />
    </>
  )
}

export default HomePage
