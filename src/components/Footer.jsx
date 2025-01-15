import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
  FaWifi,
} from "react-icons/fa";
import backicon from "../assets/backicon.png";
import footerImg from "../assets/footer.png";

const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection10?id=1`
        );
        setFooterData([response.data.data]);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchFooterData();
  }, []);
  return (
    <div
      className=" text-white  "
      style={{
        backgroundImage: `url(${backicon})`,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${footerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto">
          {footerData.map((element, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-20 border-t border-t-[#FF00B8] pt-20 "
            >
              <ul className="flex flex-col justify-center items-center gap-3">
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink1}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink2}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink3}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink4}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink5}
                </li>
              </ul>
              <div className="flex flex-col justify-center items-center gap-2">
                <img
                  src={element.image}
                  alt=""
                  className="h-full w-[170px] object-content"
                />
                <p className="font-Poppins text-[14px] text-gray-400 text-center pt-5 ">
                  {element.body}
                </p>
              </div>
              <ul className="flex flex-col justify-center items-center gap-3">
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink6}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink7}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink8}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink9}
                </li>
                <li className="font-Poppins text-gray-400 text-center tracking-wider">
                  {element.navLink10}
                </li>
              </ul>
            </div>
          ))}
          <ul className="flex justify-center items-center gap-8 pt-10  pb-20">
            <li>
              <FaFacebookF className="text-[20px] font-bold" />
            </li>
            <li>
              <FaTwitter className="text-[20px] font-bold" />
            </li>
            <li>
              <FaPinterestP className="text-[20px] font-bold" />
            </li>
            <li>
              <FaYoutube className="text-[20px] font-bold" />
            </li>
            <li>
              <FaInstagram className="text-[20px] font-bold" />
            </li>

            <li>
              <FaWifi className="text-[20px] font-bold" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
