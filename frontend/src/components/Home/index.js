// External dependencies
import React from "react";
import Carousel from 'react-bootstrap/Carousel';

// Internal dependencies
import './Home.css';
import HomeNavigation from "./HomeNavigation";
import hero1 from "../../assets/hero/sword-art-online.png";
import hero2 from "../../assets/hero/5-cen-per-second.jpg";
import hero3 from "../../assets/hero/fate-zero.jpg";

//--------------------- Component ------------------------
const Home = () => {
  return (
    <div className="home__container">
      <HomeNavigation /> 
      <Carousel pause={false}>
        <Carousel.Item className="nav__hero-images" interval={4000}>
          <img
            className="d-block w-100 nav__image"
            src={hero1}
            alt="First slide"
          />
          <Carousel.Caption className="nav__hero-captions">
            <h3>Sword Art Online</h3>
            <p>When virtual becomes reality, you fight or die.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="nav__hero-images" interval={4000}>
          <img
            className="d-block w-100 nav__image-2"
            src={hero2}
            alt="First slide"
          />
          <Carousel.Caption className="nav__hero-captions">
            <h3>5 Centimeters per Second</h3>
            <p>In the end, the train stood 2 hours motionless in the middle of nowhere. Every minute seemed like an eternity.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="nav__hero-images" interval={4000}>
          <img
            className="d-block w-100 nav__image-2"
            src={hero3}
            alt="First slide"
          />
          <Carousel.Caption className="nav__hero-captions">
            <h3>Fate/Zero</h3>
            <p>Towards the conclusion, the limitations of the "Holy Grail" are found.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Home;
