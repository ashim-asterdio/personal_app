import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
// eslint-disable-next-line
import "slick-carousel/slick/slick.css";
// eslint-disable-next-line
import "slick-carousel/slick/slick-theme.css";
import "../style/CardDiv.css";

const images = [
  { id: 1, url: "ashim" },
  { id: 2, url: "ashim" },
  { id: 3, url: "ashim" },
  { id: 4, url: "ashim" },
  { id: 5, url: "ashim" },
  { id: 6, url: "ashim" },
  { id: 7, url: "ashim" },
];

const Carousel = () => {
  const [screenSize, setScreenSize] = useState<number>(375);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
      setScreenSize(window.innerWidth);
      window.onresize = () => setScreenSize(window.innerWidth);
    }
  });
  const settings = {
    dots: true,
    accessibility: true,
    // arrows: true,
    swipe: true,
    infinite: false,
    speed: 500,
    slidesToShow: (screenSize>1024)?5:(screenSize>767)?3:(screenSize>600)?3:2,
    slidesToScroll: (screenSize>550)?2:1,
    className: "slider",
  };

  return (
    <Slider {...settings}>
      {images.map((image: any, index: number) => (
        <div key={index} className="Card">
          <div className="cardContent">
            <span className="cardDate">29 August</span>
            <span className="temperature">21°</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
