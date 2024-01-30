import Footer from '../Homepage/Footer';
import Header2 from './Header2';
import Carousel from './Carousel';

const MemPage = () => {
  return (
    <>
      <Header2 />
      <main className="py-3">
        <Carousel />
      </main>
      <Footer />
    </>
  );
};

export default MemPage;
