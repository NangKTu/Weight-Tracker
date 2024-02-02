import Footer from '../Homepage/Footer';
import Header2 from './Header2';
import Carousel from './Carousel';
import { CheckinProvider } from './CheckinContext';

const MemPage = () => {
  return (
    <>
      <Header2 />
      <main className="py-3">
        <CheckinProvider>
          <Carousel />
        </CheckinProvider>
      </main>
      <Footer />
    </>
  );
};

export default MemPage;
