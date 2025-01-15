import React, { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import purpleBtn from "../assets/purple_btn.png";
import outlinepurple from "../assets/outlinepurple_btn.png";
import googleImg from "../assets/google.svg";
import Marquee from "react-fast-marquee";
import bg_main_img from "../assets/Hero_banner.jpg";

const HeroPages = ({ onMount }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection2?id=1`
        );
        setData([response.data.data]);
        if (response.data.statusCode === 200) {
          onMount();
        }
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
        setError(err);
      }
    };

    fetchData();
  }, [onMount]);
  return (
    <div className="text-white Hero_banner_inner">
      <div className="BG-IMG_MAIN">
        <img src={bg_main_img} alt="#" />
      </div>
      {data.map((item, index) => (
        <div className="hero_banner_contant">
          <div key={index} className="container mx-auto">
            <div className="flex justify-center items-center gap-4 pt-8 pb-12">
              <button
                style={{
                  backgroundImage: `url(${purpleBtn}) `,
                }}
                className="btn-purple md:text-[13.53px] h-[35px] md:h-[44px] text-[8px] md:mr-[15px] "
              >
                {item.tab1}
              </button>

              <button
                style={{
                  backgroundImage: `url(${outlinepurple})`,
                }}
                className="btn-purple-outline h-[35px] md:h-[44px] md:text-[13.53px] text-[8px] md:ml-[15px]"
              >
                {item.tab2}
              </button>
            </div>

            <div className="flex  gap-20">
              <div className="lg:w-[50%] flex justify-center items-center lg:justify-start lg:items-start w-full xl:ml-40">
                <div
                  className="adventure_boxes relative md:h-[360px] h-[390px] md:w-[360px] w-[320px] p-5"
                  style={{
                    boxShadow: " 0px 17px 38px #00000036",
                    border: "2px solid #B85CFF",
                    borderRadius: "13px",
                    opacity: 1,
                    background: "#170930 0% 0% no-repeat padding-box",
                  }}
                >
                  <h1 className="text-[34.64px] font-Poppins font-bold text-left uppercase text-[#fff] leading-[38px]">
                    {item.heroSectionCard.cardHeading}
                  </h1>
                  <p className="text-[14.86px]  font-Poppins text-[#fff] text-left mt-4">
                    {item.heroSectionCard.cardBody}
                  </p>
                  <div className="book_button bg-[#FF00B8] cursor-pointer mt-4 rounded-[6px] uppercase w-full text-center tracking-wider font-Poppins font-bold text-[16px] py-2 px-4">
                    {item.heroSectionCard.cardButton}
                  </div>
                  <div className="py-2 flex flex-col justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <IoIosPeople />
                      <p className="text-[12px] font-Poppins uppercase text-[#fff] tracking-wider">
                        {item.heroSectionCard.cardVisitor}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <span className="play_button_icon bg-[#E2FF46] p-2  rounded-full flex justify-center items-center">
                        <FaPlay className="text-[10px] text-primary" />
                      </span>
                      <p className="text-[12px] font-Poppins uppercase text-[#E2FF46] tracking-wider">
                        {item.heroSectionCard.cardFooter}
                      </p>
                    </div>
                  </div>
                  <span className="box-top-review-count absolute -top-5 bg-white shadow-md gap-5 font-Poppins flex justify-start items-center text-center md:font-medium text-[12px] uppercase tracking-widest rounded-md px-[10px] py-[4px] text-primary">
                    <p>{item.heroSectionCard.reviewCounts}</p>{" "}
                    <img
                      src={googleImg}
                      alt=""
                      className="h-[15px] w-[15px] object-cover"
                    />{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="bottom_btns_main flex flex-col gap-2 pt-12">
              <div
                className="live_btn flex justify-center items-center  2xl:ml-[.7em] ml-[2.0em] md:ml-[4.0em] lg:ml-[2.0em] xl:ml-[0.7em] cursor-pointer rounded-md"
                style={{
                  width: "70px",
                  height: "30px",
                  background: "#761AC2",
                  transform: "skew(-35deg)",
                  OTransform: "skew(-35deg)",
                  MozTransform: "skew(-35deg)",
                  WebkitTransform: "skew(-35deg)",
                }}
              >
                <p
                  className="uppercase font-Poppins tracking-wider font-bold text-[13.16px]"
                  style={{
                    transform: "skew(35deg)", // Opposite skew to keep text straight
                    OTransform: "skew(35deg)",
                    MozTransform: "skew(35deg)",
                    WebkitTransform: "skew(35deg)",
                  }}
                >
                  {item.liveButton}
                </p>
              </div>
              <div className="banner_bottom_btn flex flex-col lg:flex-row  justify-center  gap-4 lg:items-end  items-center mx-4 md:mx-0 ">
                <div className="flex flex-row  justify-center items-center gap-4">
                  <div
                    className="flex  md:w-[260px]  lg:w-[260px] 2xl:w-[260px] w-[150px] md:h-[70px] xl:h-[50px] 2xl:h-[70px]  h-[35px] justify-center items-center cursor-pointer  rounded-md"
                    style={{
                      background: "#FF0091",
                      transform: "skew(-35deg)",
                      OTransform: "skew(-35deg)",
                      MozTransform: "skew(-35deg)",
                      WebkitTransform: "skew(-35deg)",
                    }}
                  >
                    <p
                      className="uppercase font-Poppins tracking-widest font-semibold md:text-[22px] lg:text-[17px] text-[12px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    >
                      {item.button1}
                    </p>
                    <GoDotFill
                      className="dot_icon_button text-[#E2FF46]  md:text-[35px] text-[16px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    />
                  </div>
                  <div
                    className="Direction_button flex md:w-[260px] lg:w-[260px] 2xl:w-[260px] w-[150px] md:h-[70px] xl:h-[50px] 2xl:h-[70px] h-[35px]  justify-center items-center gap-2 cursor-pointer rounded-md"
                    style={{
                      background: "#FF0091",
                      transform: "skew(-35deg)",
                      OTransform: "skew(-35deg)",
                      MozTransform: "skew(-35deg)",
                      WebkitTransform: "skew(-35deg)",
                    }}
                  >
                    <FaLocationDot
                      className="text-primary md:text-[35px] lg:text-[25px] xl:text-[35px]  text-[16px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    />
                    <p
                      className="uppercase font-Poppins tracking-widest font-semibold md:text-[22px] lg:text-[17px]  text-[12px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    >
                      {item.button2}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <div
                    className="offers_running_text flex xl:w-[690px] md:w-[450px] lg:w-[360px] h-[38px] justify-center items-center"
                    style={{
                      background: "#761ac28a",
                      transform: "skew(-35deg)",
                      OTransform: "skew(-35deg)",
                      MozTransform: "skew(-35deg)",
                      WebkitTransform: "skew(-35deg)",
                    }}
                  >
                    <div
                      className="uppercase font-Poppins tracking-wider font-bold text-[14px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    >
                      <Marquee>{item.runningText}</Marquee>
                    </div>
                  </div>

                  <div
                    className="flex md:w-[170px] w-[140px] h-[45px] justify-center items-center  cursor-pointer rounded-md"
                    style={{
                      background: "#FF0091",
                      transform: "skew(-35deg)",
                      OTransform: "skew(-35deg)",
                      MozTransform: "skew(-35deg)",
                      WebkitTransform: "skew(-35deg)",
                    }}
                  >
                    <p
                      className="uppercase font-Poppins tracking-normal font-semibold md:text-[16px] text-[14px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    >
                      {item.button3}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroPages;
