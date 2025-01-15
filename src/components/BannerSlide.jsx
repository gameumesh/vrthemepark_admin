import React from "react";

const BannerSlide = ({ caraousel, slide }) => {
  return (
    <div className="Hot_running_slider">
      {caraousel.map((item, index) => (
        <div key={index} className="container mx-auto py-8">
          <div className="textts flex flex-col justify-start items-start transition-all duration-500 ease-in-out">
            <div className="title">
              <h3 className="font-Poppins font-bold text-[26px]">
                {item.title1}
              </h3>
            </div>
            {/* <p className="uppercase text-[16px] font-Poppins">
                {item.title2}
              </p> */}
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
              <div className="Banner_offer flex flex-col md:flex-row justify-center items-center gap-7 transition-all duration-500 ease-in-out">
                <img
                  src={slide.image}
                  alt=""
                  className="transition-all duration-500 ease-in-out"
                />
                {/* <div className="flex flex-col justify-center items-center pt-3">
                  <span className="bg-[#FF0091] uppercase px-10 py-2 rounded-full text-[15px] tracking-wider font-Poppins font-bold text-white transition-all duration-500 ease-in-out">
                    {slide.discount}
                  </span>
                  <p className="font-Poppins font-semibold uppercase w-full text-[16px] tracking-widest text-white border-t border-t-white mt-2 pt-2 transition-all duration-500 ease-in-out">
                    {item.subTitle1}
                  </p>
                  <h3 className="text-[80px] font-Poppins font-semibold text-white uppercase transition-all duration-500 ease-in-out">
                    {slide.product}
                  </h3>
                </div> */}
                <div className="flex flex-col gap-2">
                  <button className="bg-primary rounded-md text-white p-3 text-[15px] font-Poppins font-semibold uppercase tracking-wider">
                    <a href={item.button1EditLink}>{item.button1}</a>
                  </button>
                  <button className="bg-white rounded-md text-primary p-3 text-[15px] font-Poppins font-semibold uppercase tracking-wider">
                    <a href={item.button2EditLink}>{item.button2}</a>
                  </button>
                </div>
                {/* <div className="slider_last_img">
                  <img
                    src={slide.gameIcon}
                    alt=""
                    className="transition-all duration-500 ease-in-out"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSlide;
