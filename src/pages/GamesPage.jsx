import React, { useEffect, useState } from "react";
import axios from "axios";
import GameSlide from "../components/GameSlide";
import GameBanner1 from "../assets/GameBanner1.jpg";
import GameBanner2 from "../assets/GameBanner2.png";

import Banner from "../components/Banner";

const GamesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topList, setTopList] = useState();
  const [bottomList, setBottomList] = useState();
  const [caraousel, setCaraousel] = useState([]);
  const [slides, setSlides] = useState();
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection4?id=1`
        );
        setData([response.data.data]);
        setTopList(response.data.data.topCardsList);
        setBottomList(response.data.data.bottomCardList);
        setCaraousel([response.data.data.carousel]);
        setSlides(response.data.data.slides);
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
  return data.map((item, index) => (
    <div key={index} className="bg-primary Games_to_explore  text-white">
      <div className="Games_to_explore_inner">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-10">
            <h3 className="font-Poppins font-bold md:text-[27.78px] text-[24px] pb-5 tracking-wider">
              {item.title}
            </h3>
          </div>

          <div className="border-t border-t-[#FF0091] relative">
            <div>
              <div className="mobile_banner_img">
                <img src={GameBanner1} alt="" />
              </div>

              <div className="banner_bottom flex justify-start items-center gap-5 absolute -top-10 left-0">
                <div
                  className="flex justify-center items-center md:w-[150px] md:h-[50px] h-[40px] w-[100px]  rounded-md"
                  style={{
                    background: "#FF0091",
                    transform: "skew(-35deg)",
                    OTransform: "skew(-35deg)",
                    MozTransform: "skew(-35deg)",
                    WebkitTransform: "skew(-35deg)",
                  }}
                >
                  <p
                    className="uppercase font-Poppins tracking-widest font-semibold text-[26px]"
                    style={{
                      transform: "skew(35deg)", // Opposite skew to keep text straight
                      OTransform: "skew(35deg)",
                      MozTransform: "skew(35deg)",
                      WebkitTransform: "skew(35deg)",
                    }}
                  >
                    {item.topHeading1}
                  </p>
                </div>
                <h3 className="md:text-[27.77px] text-[24px] tracking-widest font-Poppins font-bold uppercase">
                  {item.topHeading2}
                </h3>
              </div>

              <p className="font-Poppins  md:text-[16.67px] text-[15px] md:font-medium md:pl-40 pt-6">
                {item.bottomBody}
              </p>
              <GameSlide list={topList} />
            </div>
          </div>
        </div>
      </div>

      <Banner caraousel={caraousel} slides={slides} />

      <div className="Games_to_explore_inner Bottom_inner">
        <div className="container mx-auto">
          <div className="border-t border-t-[#FF0091] relative mt-20">
            <div className="mobile_banner_img">
              <img src={GameBanner2} alt="" />
            </div>

            <div className="flex justify-start items-center gap-5 absolute -top-10 left-0">
              <div
                className="flex justify-center items-center md:w-[150px] md:h-[50px] h-[40px] w-[100px]  rounded-md"
                style={{
                  background: "#FF0091",
                  transform: "skew(-35deg)",
                  OTransform: "skew(-35deg)",
                  MozTransform: "skew(-35deg)",
                  WebkitTransform: "skew(-35deg)",
                }}
              >
                <p
                  className="uppercase font-Poppins tracking-widest font-semibold text-[26px]"
                  style={{
                    transform: "skew(35deg)", // Opposite skew to keep text straight
                    OTransform: "skew(35deg)",
                    MozTransform: "skew(35deg)",
                    WebkitTransform: "skew(35deg)",
                  }}
                >
                  {item.bottomHeading1}
                </p>
              </div>
              <h3 className="md:text-[27.77px] text-[24px] tracking-widest font-Poppins font-bold uppercase">
                {item.bottomHeading2}
              </h3>
            </div>

            <div>
              <p className="font-Poppins md:font-medium text-[15px]  md:text-[16.67px] md:pl-40 pt-6">
                {item.topBody}
              </p>
            </div>
          </div>
          <GameSlide list={bottomList} />
        </div>
        <div className="flex justify-center items-center pb-10">
          <div
            className=" md:w-[280px] mt-8 w-[230px] md:h-[60px] h-[50px] flex justify-center items-center cursor-pointer  rounded-md"
            style={{
              background: "#FF0091",
              transform: "skew(-35deg)",
              OTransform: "skew(-35deg)",
              MozTransform: "skew(-35deg)",
              WebkitTransform: "skew(-35deg)",
            }}
          >
            <p
              className="uppercase font-Poppins tracking-widest font-semibold md:text-[22.23px] text-[20px]"
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
      </div>
    </div>
  ));
};

export default GamesPage;
