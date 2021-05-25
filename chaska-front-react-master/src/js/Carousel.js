import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay showThumbs={false} showStatus={false}>
    <div>
      <img src="pictures/chaskaPig.jpg" alt="Chancho" />
      
    </div>
    <div>
      <img src="pictures/chaskaMoney.jpg" alt="Vivienda"/>
      
    </div>
  </Carousel>
);
