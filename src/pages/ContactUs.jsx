import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

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
import sharebottom from "../assets/share_bottom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPinterest,
  faLinkedin,
  faYoutube,
  faDribbble,
  faGithub,
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    review: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [mediaUrls, setMediaUrls] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://partoftrading.com/VRThemePark/user/instagramFeed")
      .then((response) => response.json())
      .then((data) => {
        // Extract media URLs and randomly select 8
        const urls = data.map((item) => item.media_url);
        const shuffledUrls = urls.sort(() => 0.5 - Math.random()); // Shuffle the URLs
        setMediaUrls(shuffledUrls.slice(0, 8)); // Get the top 8 items
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const url = process.env.REACT_APP_API_BASE_URL;

  const validateForm = () => {
    let errorMessages = {};

    // Name validation
    if (!formData.name) {
      errorMessages.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]{1,50}$/.test(formData.name)) {
      errorMessages.name =
        "Name can have max 50 characters, no special characters or numbers.";
    }

    // DOB validation
    if (!formData.dob) {
      errorMessages.dob = "Date of Birth is required.";
    } else if (!/^\d+$/.test(formData.dob.replace(/-/g, ""))) {
      errorMessages.dob = "DOB should only contain numbers.";
    }

    // Email validation
    if (!formData.email) {
      errorMessages.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessages.email = "Invalid email address.";
    }

    // Review validation
    if (!formData.review) {
      errorMessages.review = "Review is required.";
    } else if (formData.review.length > 200) {
      errorMessages.review = "Review can have a maximum of 200 characters.";
    }

    // Terms acceptance validation
    if (!formData.termsAccepted) {
      errorMessages.termsAccepted = "You must accept the terms and conditions.";
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "dob") {
      // Store the date in DD-MM-YYYY format
      const formattedDate = moment(value).format("DD-MM-YYYY");
      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: formattedDate,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${url}/VRThemePark/user/submit-contact`,
          formData
        );

        if (response.data.success) {
          setFormData({
            name: "",
            dob: "",
            email: "",
            review: "",
            termsAccepted: false,
          });
          // console.log("Form submitted successfully:", response.data);
          alert(response.data.message);
        } else {
          // console.log("Form submission unsuccessful", response.data);
          alert(response.data.message);
        }
      } catch (err) {
        console.error(
          "Error submitting form:",
          err.response ? err.response.data : err.message
        );
        setError(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection9?id=1`
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
    <div className="text-white">
      {data.map((item, index) => (
        <div key={index} className="container mx-auto">
          <div className="flex justify-center items-center border-t border-t-[#FF00B8] pt-10">
            <h3 className="text-[52px] font-Poppins font-semibold">
              {item.title}
            </h3>
          </div>
          <div className="flex justify-center items-center gap-20 py-10">
            <div className="w-[50%]">
              <form className="Contact_form" onSubmit={handleSubmit}>
                <div
                  className="bg-[#B85CFF61] text-white px-4 pt-12 pb-7"
                  style={{
                    boxShadow: "0px 17px 38px #00000036",
                    border: "2px solid #FFFFFF",
                    borderRadius: "49px",
                  }}
                >
                  <div className="flex gap-5 w-full">
                    <div className="flex flex-col justify-start items-start">
                      <label className="font-Poppins text-[12px] font-medium pb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Name Here"
                        className="bg-white w-[300px] placeholder:text-[12px] rounded-r-full py-1 px-2 rounded-bl-full"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <div className="text-red-500 text-sm">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-start items-start pb-1">
                      <label className="font-Poppins text-[12px] font-medium">
                        D.O.B
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Your Date Of Birth"
                        className="bg-white placeholder:text-[12px] rounded-r-full py-1 px-2 rounded-bl-full"
                        name="dob"
                        value={
                          formData.dob
                            ? moment(formData.dob, "DD-MM-YYYY").format(
                                "YYYY-MM-DD"
                              )
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                      {errors.dob && (
                        <div className="text-red-500 text-sm">{errors.dob}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start pt-3">
                    <label className="font-Poppins text-[12px] font-medium pb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Your Email Address"
                      className="bg-white w-full placeholder:text-[12px] rounded-r-full py-1 px-2 rounded-bl-full"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-start items-start pt-3">
                    <label className="font-Poppins text-[12px] font-medium pb-1">
                      Review
                    </label>
                    <textarea
                      placeholder="Enter Your Review Here"
                      className="bg-white h-[150px] w-full placeholder:text-[12px] rounded-r-[20px] py-1 px-2 rounded-bl-[40px]"
                      name="review"
                      value={formData.review}
                      onChange={handleInputChange}
                    />
                    {errors.review && (
                      <div className="text-red-500 text-sm">
                        {errors.review}
                      </div>
                    )}
                  </div>
                </div>
                <div className="Bottom_form_tc pt-5 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-3">
                    <input
                      type="checkbox"
                      className="bg-transparent checked:bg-primary checked:border-secondary"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                    />
                    <p className="text-[12px] font-Poppins uppercase font-medium">
                      By accepting terms and conditions
                    </p>
                    {errors.termsAccepted && (
                      <div className="text-red-500 text-sm">
                        {errors.termsAccepted}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-secondary rounded-full px-7 py-2 uppercase font-Poppins font-medium text-[15px] text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="w-[50%]">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="py-10">
            <div className="flex justify-between items-center ">
              <div></div>
              <div className="flex gap-2 justify-center items-center">
                <img src={item.socialMediaImage} alt="" />
                <div className="flex flex-col ">
                  <p className="text-[8px] font-Poppins font-semibold tracking-wide">
                    {item.socialMediaHeading1}
                  </p>
                  <h5 className="text-[16px] font-Poppins font-bold tracking-wide">
                    {item.socialMediaHeading2}
                  </h5>
                </div>
              </div>
              <div className="mr-[70px]">
                <button className="rounded-md p-3 text-[14px] font-Poppins font-semibold text-white bg-blue-400 uppercase tracking-wider">
                  {item.contactUsButton.buttonText}
                </button>
              </div>
            </div>

            <div className="insta_feed_main_vr_tp">
              <div className="inner_insta_fees_vr_tp">
                <div className="Insta_feed_img_box lg:flex grid grid-cols-2    place-items-center justify-center items-center place-content-center gap-0 pt-10">
                  {mediaUrls.map((url, index) => (
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        key={index}
                        src={url}
                        className="md:w-[270px] md:h-[270px] w-full h-full object-cover"
                        alt="Instagram Post"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div>
                <img src={item.contactUslinkImages.img1} alt="" />
              </div>
              <div>
                <img src={item.contactUslinkImages.img2} alt="" />
              </div>
              <div>
                <img src={item.contactUslinkImages.img3} alt="" />
              </div>
              <div>
                <img src={item.contactUslinkImages.img4} alt="" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="uppercase font-Poppins font-medium tracking-widest text-[25px] text-center">
              {item.featuredTitle}
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-5 py-12">
            <div className="flex justify-center items-center gap-9 ">
              <img src={item.contactUsFeaturedImages.img1} alt="" />
              <img src={item.contactUsFeaturedImages.img2} alt="" />
              <img src={item.contactUsFeaturedImages.img3} alt="" />
            </div>
            <div className="flex justify-center items-center gap-9">
              <img src={item.contactUsFeaturedImages.img4} alt="" />
              <img src={item.contactUsFeaturedImages.img5} alt="" />
              <img src={item.contactUsFeaturedImages.img6} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactUs;
