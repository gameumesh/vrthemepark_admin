import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function ContactForm() {
  const [inputValues, setInputValues] = useState({
    id: 1,
    title: "",
    image: "",
    imageEditLink: "",
    socialMediaImage: "",
    socialMediaHeading1: "",
    socialMediaHeading2: "",
    contactUsButton: {
      buttonText: "",
      buttonLink: "",
    },
    contactUsImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
      img7: "",
      img8: "",
    },
    contactUslinkImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
    },
    featuredTitle: "",
    contactUsFeaturedImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
    },
  });

  const [existingData, setExistingData] = useState({
    id: 1,
    title: "",
    image: "",
    imageEditLink: "",
    socialMediaImage: "",
    socialMediaHeading1: "",
    socialMediaHeading2: "",
    contactUsButton: {
      buttonText: "",
      buttonLink: "",
    },
    contactUsImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
      img7: "",
      img8: "",
    },
    contactUslinkImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
    },
    featuredTitle: "",
    contactUsFeaturedImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
    },
  });

  const [imagePreview, setImagePreview] = useState("");
  const [socialImagePreview, setsocialImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState("contactUsImages");
  const [imagePreviews, setImagePreviews] = useState({
    contactUsImages: {},
    contactUslinkImages: {},
    contactUsFeaturedImages: {},
  });
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection9?id=1`
        );
        const data = response.data;
        setExistingData({
          id: 1,
          title: data.data.title,
          image: data.data.image,
          imageEditLink: data.data.imageEditLink,
          socialMediaImage: data.data.socialMediaImage,
          socialMediaHeading1: data.data.socialMediaHeading1,
          socialMediaHeading2: data.data.socialMediaHeading2,
          contactUsButton: {
            buttonText: data.data.contactUsButton.buttonText,
            buttonLink: data.data.contactUsButton.buttonLink,
          },
          contactUsImages: {
            img1: data.data.contactUsImages.img1,
            img2: data.data.contactUsImages.img2,
            img3: data.data.contactUsImages.img3,
            img4: data.data.contactUsImages.img4,
            img5: data.data.contactUsImages.img5,
            img6: data.data.contactUsImages.img6,
            img7: data.data.contactUsImages.img7,
            img8: data.data.contactUsImages.img8,
          },
          contactUslinkImages: {
            img1: data.data.contactUslinkImages.img1,
            img2: data.data.contactUslinkImages.img2,
            img3: data.data.contactUslinkImages.img3,
            img4: data.data.contactUslinkImages.img4,
          },
          featuredTitle: data.data.featuredTitle,
          contactUsFeaturedImages: {
            img1: data.data.contactUsFeaturedImages.img1,
            img2: data.data.contactUsFeaturedImages.img2,
            img3: data.data.contactUsFeaturedImages.img3,
            img4: data.data.contactUsFeaturedImages.img4,
            img5: data.data.contactUsFeaturedImages.img5,
            img6: data.data.contactUsFeaturedImages.img6,
          },
        });
        setImagePreview(data.data.image);
        setsocialImagePreview(data.data.socialMediaImage);
        setLoading(false);
      } catch (error) {
        alert("Error fetching existing data", error);
        setLoading(false);
      }
    };

    fetchExistingData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is part of contactUsButton
    if (name.startsWith("contactUsButton")) {
      const field = name.split(".")[1];
      setInputValues((prev) => ({
        ...prev,
        contactUsButton: {
          ...prev.contactUsButton,
          [field]: value,
        },
      }));
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "image") {
          setInputValues((prev) => ({
            ...prev,
            image: file,
          }));
          setImagePreview(reader.result);
        } else if (name === "socialMediaImage") {
          setInputValues((prev) => ({
            ...prev,
            socialMediaImage: file,
          }));
          setsocialImagePreview(reader.result);
        } else if (name.startsWith("contactUsImages")) {
          const key = name.split(".")[1];
          setInputValues((prev) => ({
            ...prev,
            contactUsImages: {
              ...prev.contactUsImages,
              [key]: file,
            },
          }));
          setImagePreviews((prev) => ({
            ...prev,
            contactUsImages: {
              ...prev.contactUsImages,
              [key]: reader.result,
            },
          }));
        } else if (name.startsWith("contactUslinkImages")) {
          const key = name.split(".")[1];
          setInputValues((prev) => ({
            ...prev,
            contactUslinkImages: {
              ...prev.contactUslinkImages,
              [key]: file,
            },
          }));
          setImagePreviews((prev) => ({
            ...prev,
            contactUslinkImages: {
              ...prev.contactUslinkImages,
              [key]: reader.result,
            },
          }));
        } else if (name.startsWith("contactUsFeaturedImages")) {
          const key = name.split(".")[1];
          setInputValues((prev) => ({
            ...prev,
            contactUsFeaturedImages: {
              ...prev.contactUsFeaturedImages,
              [key]: file,
            },
          }));
          setImagePreviews((prev) => ({
            ...prev,
            contactUsFeaturedImages: {
              ...prev.contactUsFeaturedImages,
              [key]: reader.result,
            },
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (inputValues.image instanceof File) {
      formData.append("contactUs_img_1", inputValues.image);
    } else {
      formData.append("contactUs_img_1", new Blob());
    }
    if (inputValues.socialMediaImage instanceof File) {
      formData.append(
        "contactUsSocialMedia_img_1",
        inputValues.socialMediaImage
      );
    } else {
      formData.append("contactUsSocialMedia_img_1", new Blob());
    }
    Object.entries(inputValues.contactUsImages).forEach(
      ([key, file], index) => {
        if (file instanceof File) {
          formData.append(`contactUsImagesList[${index}].image`, file);
        } else {
          formData.append(`contactUsImagesList[${index}].image`, new Blob());
        }
      }
    );

    Object.entries(inputValues.contactUslinkImages).forEach(
      ([key, file], index) => {
        if (file instanceof File) {
          formData.append(`contactUsLinkImagesList[${index}].image`, file);
        } else {
          formData.append(
            `contactUsLinkImagesList[${index}].image`,
            new Blob()
          );
        }
      }
    );

    Object.entries(inputValues.contactUsFeaturedImages).forEach(
      ([key, file], index) => {
        if (file instanceof File) {
          formData.append(`contactUsFeaturedImagesList[${index}].image`, file);
        } else {
          formData.append(
            `contactUsFeaturedImagesList[${index}].image`,
            new Blob()
          );
        }
      }
    );

    formData.append(
      "contactUsSection",
      JSON.stringify({
        id: 1,
        title: inputValues.title,
        image: "",
        imageEditLink: inputValues.imageEditLink,
        socialMediaImage: "",
        socialMediaHeading1: inputValues.socialMediaHeading1,
        socialMediaHeading2: inputValues.socialMediaHeading2,
        contactUsButton: {
          buttonText: inputValues.contactUsButton.buttonText,
          buttonLink: inputValues.contactUsButton.buttonLink,
        },
        contactUsImages: {
          img1: "",
          img2: "",
          img3: "",
          img4: "",
          img5: "",
          img6: "",
          img7: "",
          img8: "",
        },
        contactUslinkImages: {
          img1: "",
          img2: "",
          img3: "",
          img4: "",
        },
        featuredTitle: inputValues.featuredTitle,
        contactUsFeaturedImages: {
          img1: "",
          img2: "",
          img3: "",
          img4: "",
          img5: "",
          img6: "",
        },
      })
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection9/1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Server response:", response.data);
        alert("Form Updated Successfully!");
        window.location.reload();
      } else {
        alert("Form Submission Unsuccessful: Server error");
      }
    } catch (error) {
      console.error("Error submitting the form!", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  return (
    <div className="crud-card">
      <form className="crud-form" onSubmit={handleSubmitForm}>
        <h2>Contact US Form</h2>

        <div className="form-group">
          <label>Image:</label>
          <div className="adjacent-inputs">
            {existingData?.image && (
              <img
                src={imagePreview || existingData.image}
                alt="Img Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Image Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="imageEditLink"
              value={existingData.imageEditLink}
              disabled
            />
            <input
              type="text"
              name="imageEditLink"
              value={inputValues.imageEditLink}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>SocialMedia Image:</label>
          <div className="adjacent-inputs">
            {existingData?.socialMediaImage && (
              <img
                src={socialImagePreview || existingData.socialMediaImage}
                alt="Social Media Img Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input
              type="file"
              name="socialMediaImage"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Title:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="title"
              value={existingData.title}
              disabled
            />
            <input
              type="text"
              name="title"
              value={inputValues.title}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>SocialMedia Heading 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="socialMediaHeading1"
              value={existingData.socialMediaHeading1}
              disabled
            />
            <input
              type="text"
              name="socialMediaHeading1"
              value={inputValues.socialMediaHeading1}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>SocialMedia Heading 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="socialMediaHeading2"
              value={existingData.socialMediaHeading2}
              disabled
            />
            <input
              type="text"
              name="socialMediaHeading2"
              value={inputValues.socialMediaHeading2}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Button Text:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="contactUsButton.buttonText"
              value={existingData.contactUsButton.buttonText}
              disabled
            />
            <input
              type="text"
              name="contactUsButton.buttonText"
              value={inputValues.contactUsButton.buttonText}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Button Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="contactUsButton.buttonLink"
              value={existingData.contactUsButton.buttonLink}
              disabled
            />
            <input
              type="text"
              name="contactUsButton.buttonLink"
              value={inputValues.contactUsButton.buttonLink}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Featured Title:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="featuredTitle"
              value={existingData.featuredTitle}
              disabled
            />
            <input
              type="text"
              name="featuredTitle"
              value={inputValues.featuredTitle}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="tabs">
          <button
            type="button"
            className={activeTab === "contactUsImages" ? "active" : ""}
            onClick={() => handleTabChange("contactUsImages")}
          >
            ContactUs Images
          </button>
          <button
            type="button"
            className={activeTab === "contactUslinkImages" ? "active" : ""}
            onClick={() => handleTabChange("contactUslinkImages")}
          >
            ContactLink Images
          </button>
          <button
            type="button"
            className={activeTab === "contactUsFeaturedImages" ? "active" : ""}
            onClick={() => handleTabChange("contactUsFeaturedImages")}
          >
            Featured Images
          </button>
        </div>

        {activeTab === "contactUsImages" && (
          <div className="tab-content">
            {Object.keys(inputValues.contactUsImages).map((key) => (
              <div className="form-group" key={key}>
                <label>{key}:</label>
                <div className="adjacent-inputs">
                  {existingData?.contactUsImages?.[key] && (
                    <img
                      src={
                        imagePreviews.contactUsImages?.[key] ||
                        existingData.contactUsImages[key]
                      }
                      alt="Contact Us Img Preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  <input
                    type="file"
                    name={`contactUsImages.${key}`}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contactUslinkImages" && (
          <div className="tab-content">
            {Object.keys(inputValues.contactUslinkImages).map((key) => (
              <div className="form-group" key={key}>
                <label>{key}:</label>
                <div className="adjacent-inputs">
                  {existingData?.contactUslinkImages?.[key] && (
                    <img
                      src={
                        imagePreviews.contactUslinkImages?.[key] ||
                        existingData.contactUslinkImages[key]
                      }
                      alt="Contact Link Img Preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  <input
                    type="file"
                    name={`contactUslinkImages.${key}`}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contactUsFeaturedImages" && (
          <div className="tab-content">
            {Object.keys(inputValues.contactUsFeaturedImages).map((key) => (
              <div className="form-group" key={key}>
                <label>{key}:</label>
                <div className="adjacent-inputs">
                  {existingData?.contactUsFeaturedImages?.[key] && (
                    <img
                      src={
                        imagePreviews.contactUsFeaturedImages?.[key] ||
                        existingData.contactUsFeaturedImages[key]
                      }
                      alt="Featured Img Preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  <input
                    type="file"
                    name={`contactUsFeaturedImages.${key}`}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
