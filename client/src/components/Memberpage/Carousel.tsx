import Carousel from 'react-bootstrap/Carousel';
import WeightModal from './WeightModal';
import Calendar from './Calendar';
import Graph from './Graph';

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
      <Carousel.Item>
        <Graph />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;
