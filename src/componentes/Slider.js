import React from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap';

const Slider = () => {
    return (
        <div style={{marginBottom: "20px"}}>
            <Carousel fade="true">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../img/5.png"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../img/2.png"
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../img/3.png"
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../img/4.png"
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
        </div>
    )
}

export default Slider
