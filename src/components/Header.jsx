import React, { useEffect, useState } from "react";
import apiCall from "../utils/ApiHandler";

const Header = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(
          "get",
          "/VRThemePark/user/getSection1?id=1"
        );
        setData([response.data]);
      } catch (error) {
        console.log(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);
  return (
    <div className="Site_header text-white">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mx-4 pt-2"
        >
          <div className="flex justify-center items-center   gap-2">
            <img
              src={item.logoImage1}
              alt=""
              className="md:w-[290px] w-[160px] h-full object-cover"
            />
          </div>
          <div className="flex  justify-center items-center gap-10">
            <ul className=" hidden lg:flex  justify-center items-center gap-8 Site_menu_main">
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                {item.navlink1}
              </li>
              <li className="font-Poppins font-bold text-[13px] uppercase">
                |
              </li>
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                {item.navlink2}
              </li>
              <li className="font-Poppins font-bold text-[13px] uppercase">
                |
              </li>
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                {item.navlink3}
              </li>
              <li className="font-Poppins font-bold text-[13px] uppercase">
                |
              </li>
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                {item.navlink4}
              </li>
            </ul>
            <div className="flex justify-center items-center gap-3">
              <div className="nav_btn   md:py-[8px] md:px-[20px] py-[5px] px-[12px] header_buttons">
                <span className="uppercase font-Poppins md:tracking-wider cursor-pointer font-bold md:text-[16px] text-[12px]">
                  {item.buttonText1}
                </span>
              </div>
              <div className="nav_btn md:py-[8px] md:px-[20px] py-[5px] px-[12px] header_buttons">
                <span className="uppercase font-Poppins md:tracking-wider cursor-pointer font-bold md:text-[16px] text-[12px]">
                  {item.buttonText2}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
