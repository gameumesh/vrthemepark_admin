import axios from "axios";
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection8?id=1`
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
    <div className=" text-white pt-10 pb-20">
      {data.map((item, index) => (
        <div key={index} className="container mx-auto">
          <div className="flex flex-col justify-center items-center gap-2 pt-10 border-t border-t-[#FF00B8]">
            <h4 className="text-[36.78px] tracking-wider uppercase font-Poppins font-bold">
              {item.heading1}
            </h4>
            <h2 className="text-[52px] uppercase font-Poppins font-semibold">
              {item.heading2}
            </h2>
          </div>
          <div className="flex justify-center items-start gap-10 pt-10">
            <div className="w-[50%]">
              <img src={item.image} alt="" />
            </div>
            <div className="w-[50%]">
              <p className="text-[14px]  font-Poppins">{item.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
