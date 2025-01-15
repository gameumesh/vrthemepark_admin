import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function GamesForm() {
  const [inputValues, setInputValues] = useState({
    id: 1,
    title: "",
    topHeading1: "",
    topHeading2: "",
    topBody: "",
    topCardsList: Array(4).fill({
      image: "",
      title: "",
      ratingText: "",
      body: "",
      button: "",
      buttonLink: "",
      link: "",
      linkName: "",
      linkUrl: "",
    }),
    carousel: {
      title1: "",
      title2: "",
      subTitle1: "",
      button1: "",
      button1EditLink: "",
      button2: "",
      button2EditLink: "",
    },
    slides: Array(2).fill({
      image: "",
      discount: "",
      product: "",
      gameIcon: "",
    }),
    bottomHeading1: "",
    bottomHeading2: "",
    bottomBody: "",
    bottomCardList: Array(4).fill({
      image: "",
      title: "",
      ratingText: "",
      body: "",
      button: "",
      buttonLink: "",
      link: "",
      linkName: "",
      linkUrl: "",
    }),
    button: "",
  });

  const [existingData, setExistingData] = useState({
    id: 1,
    title: "",
    topHeading1: "",
    topHeading2: "",
    topBody: "",
    topCardsList: Array(4).fill({
      image: "",
      title: "",
      ratingText: "",
      body: "",
      button: "",
      buttonLink: "",
      link: "",
      linkName: "",
      linkUrl: "",
    }),
    carousel: {
      title1: "",
      title2: "",
      subTitle1: "",
      button1: "",
      button1EditLink: "",
      button2: "",
      button2EditLink: "",
    },
    slides: Array(2).fill({
      image: "",
      discount: "",
      product: "",
      gameIcon: "",
    }),
    bottomHeading1: "",
    bottomHeading2: "",
    bottomBody: "",
    bottomCardList: Array(4).fill({
      image: "",
      title: "",
      ratingText: "",
      body: "",
      button: "",
      buttonLink: "",
      link: "",
      linkName: "",
      linkUrl: "",
    }),
    button: "",
  });

  const [activeCardTab1, setActiveCardTab1] = useState(0);
  const [activeCardTab2, setActiveCardTab2] = useState(0);
  const [activeSlideTab, setActiveSlideTab] = useState(0);
  const [imagePreviews, setImagePreviews] = useState({
    topCardsList: Array(4).fill(""),
    slides: Array(2).fill(""),
    bottomCardList: Array(4).fill(""),
  });
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection4?id=1`
        );
        const data = response.data;
        setExistingData({
          title: data.data.title,
          topHeading1: data.data.topHeading1,
          topHeading2: data.data.topHeading2,
          topBody: data.data.topBody,
          topCardsList: data.data.topCardsList.map((card) => ({
            image: card.image,
            title: card.title,
            ratingText: card.ratingText,
            body: card.body,
            button: card.button,
            buttonLink: card.buttonLink,
            link: card.link,
            linkName: card.linkName,
            linkUrl: card.linkUrl,
          })),
          carousel: {
            title1: data.data.carousel.title1,
            title2: data.data.carousel.title2,
            subTitle1: data.data.carousel.subTitle1,
            button1: data.data.carousel.button1,
            button1EditLink: data.data.carousel.button1EditLink,
            button2: data.data.carousel.button2,
            button2EditLink: data.data.carousel.button2EditLink,
          },
          slides: data.data.slides.map((slide) => ({
            image: slide.image,
            discount: slide.discount,
            product: slide.product,
            gameIcon: slide.gameIcon,
          })),
          bottomHeading1: data.data.bottomHeading1,
          bottomHeading2: data.data.bottomHeading2,
          bottomBody: data.data.bottomBody,
          bottomCardList: data.data.bottomCardList.map((card) => ({
            image: card.image,
            title: card.title,
            ratingText: card.ratingText,
            body: card.body,
            button: card.button,
            buttonLink: card.buttonLink,
            link: card.link,
            linkName: card.linkName,
            linkUrl: card.linkUrl,
          })),
          button: data.data.button,
        });
        setImagePreviews({
          topCardsList: data.data.topCardsList.map((card) => card.image),
          slides: data.data.slides.map((slide) => slide.image),
          bottomCardList: data.data.bottomCardList.map((card) => card.image),
        });
        setLoading(false);
      } catch (error) {
        alert("Error fetching existing data", error);
        setLoading(false);
      }
    };

    fetchExistingData();
  }, []);

  const handleInputChange = (e, index = null, section = null) => {
    const { name, value } = e.target;
    if (section === "topCardsList" && index !== null) {
      const updatedCards = inputValues.topCardsList.map((card, idx) =>
        idx === index ? { ...card, [name]: value } : card
      );
      setInputValues((prev) => ({
        ...prev,
        topCardsList: updatedCards,
      }));
    } else if (section === "slides" && index !== null) {
      const updatedSlides = inputValues.slides.map((slide, idx) =>
        idx === index ? { ...slide, [name]: value } : slide
      );
      setInputValues((prev) => ({
        ...prev,
        slides: updatedSlides,
      }));
    } else if (section === "bottomCardList" && index !== null) {
      const updatedOptions = inputValues.bottomCardList.map((card, idx) =>
        idx === index ? { ...card, [name]: value } : card
      );
      setInputValues((prev) => ({
        ...prev,
        bottomCardList: updatedOptions,
      }));
    } else if (section === "carousel") {
      setInputValues((prev) => ({
        ...prev,
        carousel: {
          ...prev.carousel,
          [name]: value,
        },
      }));
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e, index = null, section = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (section === "topCardsList" && index !== null) {
          const updatedCards = inputValues.topCardsList.map((card, idx) =>
            idx === index ? { ...card, image: file } : card
          );
          setInputValues((prev) => ({
            ...prev,
            topCardsList: updatedCards,
          }));

          const updatedPreviews = imagePreviews.topCardsList.map(
            (preview, idx) => (idx === index ? reader.result : preview)
          );
          setImagePreviews((prev) => ({
            ...prev,
            topCardsList: updatedPreviews,
          }));
        } else if (section === "slides" && index !== null) {
          const updatedSlides = inputValues.slides.map((slide, idx) =>
            idx === index ? { ...slide, image: file } : slide
          );
          setInputValues((prev) => ({
            ...prev,
            slides: updatedSlides,
          }));

          const updatedPreviews = imagePreviews.slides.map((preview, idx) =>
            idx === index ? reader.result : preview
          );
          setImagePreviews((prev) => ({
            ...prev,
            slides: updatedPreviews,
          }));
        } else if (section === "bottomCardList" && index !== null) {
          const updatedCards = inputValues.bottomCardList.map((card, idx) =>
            idx === index ? { ...card, image: file } : card
          );
          setInputValues((prev) => ({
            ...prev,
            bottomCardList: updatedCards,
          }));

          const updatedPreviews = imagePreviews.bottomCardList.map(
            (preview, idx) => (idx === index ? reader.result : preview)
          );
          setImagePreviews((prev) => ({
            ...prev,
            bottomCardList: updatedPreviews,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    inputValues.topCardsList.forEach((card, index) => {
      if (card.image instanceof File) {
        formData.append(`topCardsList[${index}].image`, card.image);
      } else {
        formData.append(`topCardsList[${index}].image`, new Blob());
      }
    });

    inputValues.slides.forEach((slide, index) => {
      if (slide.image instanceof File) {
        formData.append(`slides[${index}].image`, slide.image);
      } else {
        formData.append(`slides[${index}].image`, new Blob());
      }
      if (slide.gameIcon instanceof File) {
        formData.append(`slides[${index}].gameIcon`, slide.gameIcon);
      } else {
        formData.append(`slides[${index}].gameIcon`, new Blob());
      }
    });

    inputValues.bottomCardList.forEach((card, index) => {
      if (card.image instanceof File) {
        formData.append(`bottomCardList[${index}].image`, card.image);
      } else {
        formData.append(`bottomCardList[${index}].image`, new Blob());
      }
    });

    formData.append(
      "gamesTopSection",
      JSON.stringify({
        id: inputValues.id,
        title: inputValues.title,
        topHeading1: inputValues.topHeading1,
        topHeading2: inputValues.topHeading2,
        topBody: inputValues.topBody,
        bottomHeading1: inputValues.bottomHeading1,
        bottomHeading2: inputValues.bottomHeading2,
        bottomBody: inputValues.bottomBody,
        button: inputValues.button,
        carousel: {
          title1: inputValues.carousel.title1,
          title2: inputValues.carousel.title2,
          subTitle1: inputValues.carousel.subTitle1,
          button1: inputValues.carousel.button1,
          button1EditLink: inputValues.carousel.button1EditLink,
          button2: inputValues.carousel.button2,
          button2EditLink: inputValues.carousel.button2EditLink,
        },
        topCardsList: inputValues.topCardsList.map((card) => ({
          title: card.title,
          ratingText: card.ratingText,
          body: card.body,
          button: card.button,
          buttonLink: card.buttonLink,
          link: card.link,
          linkName: card.linkName,
          linkUrl: card.linkUrl,
        })),
        slides: inputValues.slides.map((slide) => ({
          discount: slide.discount,
          product: slide.product,
        })),
        bottomCardList: inputValues.bottomCardList.map((card) => ({
          title: card.title,
          ratingText: card.ratingText,
          body: card.body,
          button: card.button,
          buttonLink: card.buttonLink,
          link: card.link,
          linkName: card.linkName,
          linkUrl: card.linkUrl,
        })),
      })
    );

    // logFormData(formData);

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection4/1`,
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

  // const logFormData = (formData) => {
  //   const formDataObj = {};
  //   formData.forEach((value, key) => {
  //     if (value instanceof File) {
  //       formDataObj[key] = value.name;
  //     } else if (value instanceof Blob) {
  //       formDataObj[key] = "Blob (file)";
  //     } else {
  //       formDataObj[key] = value;
  //     }
  //   });
  //   console.log("FormData contents:", formDataObj);
  // };

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
        <h2>Games Form</h2>
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
          <label>Top Heading 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="topHeading1"
              value={existingData.topHeading1}
              disabled
            />
            <input
              type="text"
              name="topHeading1"
              value={inputValues.topHeading1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Top Heading 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="topHeading2"
              value={existingData.topHeading2}
              disabled
            />
            <input
              type="text"
              name="topHeading2"
              value={inputValues.topHeading2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Top Body:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="topBody"
              value={existingData.topBody}
              disabled
            />
            <input
              type="text"
              name="topBody"
              value={inputValues.topBody}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel Title 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="title1"
              value={existingData.carousel.title1}
              disabled
            />
            <input
              type="text"
              name="title1"
              value={inputValues.carousel.title1}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel Title 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="title2"
              value={existingData.carousel.title2}
              disabled
            />
            <input
              type="text"
              name="title2"
              value={inputValues.carousel.title2}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel SubTitle 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="subTitle1"
              value={existingData.carousel.subTitle1}
              disabled
            />
            <input
              type="text"
              name="subTitle1"
              value={inputValues.carousel.subTitle1}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel Button 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="button1"
              value={existingData.carousel.button1}
              disabled
            />
            <input
              type="text"
              name="button1"
              value={inputValues.carousel.button1}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel Button 1 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="button1EditLink"
              value={existingData.carousel.button1EditLink}
              disabled
            />
            <input
              type="text"
              name="button1EditLink"
              value={inputValues.carousel.button1EditLink}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel Button 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="button2"
              value={existingData.carousel.button2}
              disabled
            />
            <input
              type="text"
              name="button2"
              value={inputValues.carousel.button2}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Caraousel Button 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="button2EditLink"
              value={existingData.carousel.button2EditLink}
              disabled
            />
            <input
              type="text"
              name="button2EditLink"
              value={inputValues.carousel.button2EditLink}
              onChange={(e) => handleInputChange(e, null, "carousel")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Bottom Heading 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="bottomHeading1"
              value={existingData.bottomHeading1}
              disabled
            />
            <input
              type="text"
              name="bottomHeading1"
              value={inputValues.bottomHeading1}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bottom Heading 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="bottomHeading2"
              value={existingData.bottomHeading2}
              disabled
            />
            <input
              type="text"
              name="bottomHeading2"
              value={inputValues.bottomHeading2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Bottom Body:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="bottomBody"
              value={existingData.bottomBody}
              disabled
            />
            <input
              type="text"
              name="bottomBody"
              value={inputValues.bottomBody}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Button:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="button"
              value={existingData.button}
              disabled
            />
            <input
              type="text"
              name="button"
              value={inputValues.button}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="tabs">
          {Array.from({ length: 4 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeCardTab1 === index ? "active" : ""}
              onClick={() => setActiveCardTab1(index)}
            >
              Top Card {index + 1}
            </button>
          ))}
        </div>

        {existingData.topCardsList.map((card, index) => (
          <div
            key={index}
            style={{ display: activeCardTab1 === index ? "block" : "none" }}
          >
            <h3>Top Card {index + 1}</h3>
            <div className="form-group">
              <label>Image:</label>
              <div className="adjacent-inputs">
                {imagePreviews.topCardsList[index] && (
                  <img
                    src={imagePreviews.topCardsList[index]}
                    alt="Card Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, index, "topCardsList")}
                />
              </div>
            </div>
            {Object.keys(card).map(
              (key) =>
                key !== "image" && (
                  <div className="form-group" key={key}>
                    <label>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      :
                    </label>
                    <div className="adjacent-inputs">
                      <input
                        type="text"
                        name={key}
                        value={existingData.topCardsList[index][key]}
                        disabled
                      />
                      <input
                        type="text"
                        name={key}
                        value={inputValues.topCardsList[index][key]}
                        onChange={(e) =>
                          handleInputChange(e, index, "topCardsList")
                        }
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        ))}

        <div className="tabs">
          {Array.from({ length: 2 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeSlideTab === index ? "active" : ""}
              onClick={() => setActiveSlideTab(index)}
            >
              Slides {index + 1}
            </button>
          ))}
        </div>

        {existingData.slides.map((slide, index) => (
          <div
            key={index}
            style={{ display: activeSlideTab === index ? "block" : "none" }}
          >
            <h3>Slide {index + 1}</h3>
            <div className="form-group">
              <label>Image:</label>
              <div className="adjacent-inputs">
                {imagePreviews.slides[index] && (
                  <img
                    src={imagePreviews.slides[index]}
                    alt="New Slide Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, index, "slides")}
                />
              </div>
            </div>
            {Object.keys(slide).map(
              (key) =>
                key !== "image" && (
                  <div className="form-group" key={key}>
                    <label>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      :
                    </label>
                    <div className="adjacent-inputs">
                      <input
                        type="text"
                        name={key}
                        value={existingData.slides[index][key]}
                        disabled
                      />
                      <input
                        type="text"
                        name={key}
                        value={inputValues.slides[index][key]}
                        onChange={(e) => handleInputChange(e, index, "slides")}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        ))}

        <div className="tabs">
          {Array.from({ length: 4 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeCardTab2 === index ? "active" : ""}
              onClick={() => setActiveCardTab2(index)}
            >
              Bottom Card {index + 1}
            </button>
          ))}
        </div>

        {existingData.bottomCardList.map((card, index) => (
          <div
            key={index}
            style={{ display: activeCardTab2 === index ? "block" : "none" }}
          >
            <h3>Bottom Card {index + 1}</h3>
            <div className="form-group">
              <label>Image:</label>
              <div className="adjacent-inputs">
                {imagePreviews.bottomCardList[index] && (
                  <img
                    src={imagePreviews.bottomCardList[index]}
                    alt="Card Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, index, "bottomCardList")}
                />
              </div>
            </div>
            {Object.keys(card).map(
              (key) =>
                key !== "image" && (
                  <div className="form-group" key={key}>
                    <label>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      :
                    </label>
                    <div className="adjacent-inputs">
                      <input
                        type="text"
                        name={key}
                        value={existingData.bottomCardList[index][key]}
                        disabled
                      />
                      <input
                        type="text"
                        name={key}
                        value={inputValues.bottomCardList[index][key]}
                        onChange={(e) =>
                          handleInputChange(e, index, "bottomCardList")
                        }
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        ))}

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default GamesForm;
