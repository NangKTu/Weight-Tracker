import Carousel from 'react-bootstrap/Carousel';
import WeightModal from './WeightModal';
import Calendar from './Calendar';

function CarouselFade() {
  const carouselStyle = {
    height: '500px',
  };
  return (
    <Carousel fade style={carouselStyle} interval={null}>
      <Carousel.Item>
        <WeightModal />
      </Carousel.Item>
      <Carousel.Item>
        <Calendar />
      </Carousel.Item>
      <Carousel.Item className="text-center">
        <h1>Graphs</h1>
        <p>Coming Soon</p>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;
