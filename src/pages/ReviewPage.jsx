import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
  const [revData, setRevData] = useState([]);
  const [revCards, setRevCards] = useState([]);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection6?id=1`
        );
        setRevData([response.data.data]);
        setRevCards(response.data.data.revCards);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchReviews();
  }, []);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex justify-start items-center gap-1">
        {Array.from({ length: totalStars }, (_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-secondary" : "text-gray-400"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="text-white">
      {revData.map((item, index) => (
        <div key={index} className="container mx-auto">
          <div className="Review_page_main flex flex-col justify-center items-center md:justify-start md:items-start gap-[2px] lg:ml-8 pt-10 md:pt-0">
            <div className="flex justify-start items-center gap-6">
              <img
                src={item.revImage}
                alt=""
                className="md:h-[35px] md:w-[35px] w-[30px] h-[30px] object-cover"
              />
              <h2 className="md:text-[50.43px] text-[40px] font-Poppins font-semibold">
                {item.revHeading}
              </h2>
            </div>
            <span className="md:w-[270px] w-[220px] h-[3px] bg-[#FF00B8]"></span>
          </div>
          <div className="review_page_para lg:w-[60%] w-full flex justify-start items-start">
            <p className="lg:text-[16px] text-[15px] md:font-medium font-Poppins pt-10">
              {item.revBody}
            </p>
          </div>
          <div className="review_box_main_in_slider">
            <div className="review_main review_box grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 place-content-center place-items-center pt-7">
              {revCards.map((card) => (
                <div
                  key={card.id}
                  className="review_box_inner p-[14px] 2xl:h-[300px] 2xl:w-[350px] w-[300px] h-[300px]"
                  style={{
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    borderRadius: "14px",
                    opacity: 1,
                  }}
                >
                  <h1 className="Review_heading text-[30.64px] font-Poppins font-bold text-left text-primary uppercase leading-[32px]">
                    {card.title}
                  </h1>
                  <p className="msg text-[15px] md:font-medium font-Poppins text-primary text-left mt-4">
                    {card.body}
                  </p>

                  <div className="icon flex flex-col justify-start items-start 2xl:pt-20 pt-16">
                    {/* Render stars dynamically based on the rating */}
                    {renderStars(card.rating)}
                    <p className="date text-primary font-Poppins md:font-medium">
                      {card.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
