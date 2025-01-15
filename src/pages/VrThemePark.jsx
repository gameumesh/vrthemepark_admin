import React, { useEffect, useState } from "react";
import ReviewPage from "./ReviewPage";
import axios from "axios";
import backicon from "../assets/backicon.png";
import mapicons from "../assets/mapicons.png";
import girls from "../assets/girls.png";
import LineSecond from "../assets/LineSecond.png";
import LineFirst from "../assets/LineFirst.png";
import Mapimg from "../assets/Map_img.png";
import VrBgImg from "../assets/girls.png";

const VrThemePark = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection5?id=1`
        );
        setData([response.data.data]);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="relative text-white  "
      style={{
        backgroundImage: `url(${backicon})`,
      }}
    >
      {data.map((item, index) => (
        <div key={index} className="maps">
          <div className="VR_THEME_PARK_MAIN bg-none ">
            <div className="main_bg_img">
              <div className="img_inner">
                <img src={VrBgImg} alt="" />
              </div>
            </div>
            <div className="LINE_IMG flex flex-col absolute top-2 ">
              <div className="relative">
                <div>
                  <img src={LineSecond} alt="" />
                </div>
                <div className="absolute top-2  ">
                  <img src={LineFirst} alt="" />
                </div>
              </div>
            </div>
            <div className="container mx-auto">
              <div className="vr_main_contant flex flex-col  md:flex-row ">
                <div className="VR-park_top_img lg:w-[40%] w-full flex  relative Width  lg:pt-12">
                  <img
                    src={item.vrThemeParkImg}
                    alt=""
                    className="object-contain w-[200px] md:w-[300px] lg:w-full h-full pt-5"
                  />
                  <div
                    className="Direction_btn absolute lg:w-[250px] lg:h-[60px] w-[150px] h-[30px] lg:bottom-28 lg:-right-6 bottom-10 md:bottom-20 right-24 md:right-10 flex justify-center items-center m-4"
                    style={{
                      background: "#ffffff",
                      transform: "skew(-35deg)",
                      OTransform: "skew(-35deg)",
                      MozTransform: "skew(-35deg)",
                      WebkitTransform: "skew(-35deg)",
                    }}
                  >
                    <p
                      className="uppercase font-Poppins tracking-wider text-primary font-bold lg:text-[16px] text-[10px]"
                      style={{
                        transform: "skew(35deg)", // Opposite skew to keep text straight
                        OTransform: "skew(35deg)",
                        MozTransform: "skew(35deg)",
                        WebkitTransform: "skew(35deg)",
                      }}
                    >
                      {item.button}
                    </p>
                  </div>
                </div>

                <div className="heading_vr_theme_park_main lg:w-[60%] w-full flex flex-col">
                  <h2 className="lg:text-[52px] text-[40px] font-Poppins font-semibold leading-[52px]">
                    {item.heading}
                  </h2>
                  <p className="subheading_ve-tp md:text-[20px] text-[18px] font-Poppins md:font-medium">
                    {item.subHeading}
                  </p>
                  <p className="para_vr_tp md:text-[16px] text-[15px] md:font-medium font-Poppins pt-6">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>

            {/* <ReviewPage /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VrThemePark;
