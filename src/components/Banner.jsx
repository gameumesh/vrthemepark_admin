import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlide from "./BannerSlide";

const Banner = ({ caraousel, slides }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1536, // For screens smaller than 2xl (1536px)
        settings: {
          slidesToShow: 1, // Show 4 slides on 2xl screens
        },
      },
      {
        breakpoint: 1280, // For screens smaller than xl (1280px)
        settings: {
          slidesToShow: 1, // Show 3 slides on xl screens
        },
      },
      {
        breakpoint: 1024, // For screens smaller than lg (1024px)
        settings: {
          slidesToShow: 1, // Show 2 slides on lg screens
        },
      },
      {
        breakpoint: 768, // For screens smaller than md (768px)
        settings: {
          slidesToShow: 1, // Show 2 slides on md screens
        },
      },
      {
        breakpoint: 640, // For screens smaller than sm (640px)
        settings: {
          slidesToShow: 1, // Show 1 slide on sm screens
        },
      },
    ],
  };

  return (
    <div className="relative banner1 bg-no-repeat bg-cover transition-all duration-700 ease-in-out">
      <div className="container mx-auto">
        <div
          className="flex absolute top-40 left-10 bg-purple-300 text-primary rounded-full p-4 cursor-pointer z-10"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <FaChevronLeft size={20} />
        </div>

        <div
          className="flex absolute top-40 right-10 bg-purple-300 text-primary p-4 rounded-full cursor-pointer z-10"
          onClick={() => sliderRef.current.slickNext()}
        >
          <FaChevronRight size={20} />
        </div>

        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => (
            <BannerSlide key={index} caraousel={caraousel} slide={slide} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
