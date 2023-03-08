import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
// eslint-disable-next-line
import "slick-carousel/slick/slick.css";
// eslint-disable-next-line
import "slick-carousel/slick/slick-theme.css";
import "../style/CardDiv.css";
import "../style/skeleton.css";
import { state } from "../store";

const images = [
  { id: 1, url: "ashim" },
  { id: 2, url: "ashim" },
  { id: 3, url: "ashim" },
  { id: 4, url: "ashim" },
  { id: 5, url: "ashim" },
  { id: 6, url: "ashim" },
  { id: 7, url: "ashim" },
];

function average(array: {time:string,temperature:string}[]) {
  let sum = 0;
  array.map((value: any) => {
    sum = sum + value.temperature as number;
  });
  return (sum/array.length).toFixed(0)
}

const Carousel = (props: any) => {
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
    infinite: true,
    speed: 500,
    slidesToShow:
      screenSize > 1024 ? 5 : screenSize > 767 ? 3 : screenSize > 600 ? 3 : 2,
    slidesToScroll: 1,
    className: "slider",
  };

  return (
    <Slider {...settings}>
      {state?.actualData?.map((values: any, index: number) => (
        <div key={index} className="Card" >
          <div className="cardContent" onClick={()=>{props.function(index)}} 
          style={{backgroundColor:index==props.value?"rgb(115, 163, 172)":"rgb(88, 101, 223)"}}>
            <span className="cardDate">{values.date}</span>
            <span className="temperature">{average(values.list)}°</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
