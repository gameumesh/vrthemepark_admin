import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function ChooseUsForm() {
  const [inputValues, setInputValues] = useState({
    heading: "",
    cards: Array(3).fill({
      image: "",
      title: "",
      body: "",
    }),
    subHeading: "",
    address1: "",
    address2: "",
    body: "",
    options: Array(5).fill({
      image: "",
      title: "",
    }),
    footer: "",
  });

  const [existingData, setExistingData] = useState({
    heading: "",
    cards: Array(3).fill({
      image: "",
      title: "",
      body: "",
    }),
    subHeading: "",
    address1: "",
    address2: "",
    body: "",
    options: Array(5).fill({
      image: "",
      title: "",
    }),
    footer: "",
  });

  const [activeCardTab, setActiveCardTab] = useState(0);
  const [activeOptionTab, setActiveOptionTab] = useState(0);
  const [imagePreviews, setImagePreviews] = useState({
    cards: Array(3).fill(""),
    options: Array(5).fill(""),
  });
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection3?id=1`
        );
        const data = response.data;
        setExistingData({
          heading: data.data.heading,
          cards: data.data.whyChooseUsCard.map((card) => ({
            image: card.cardImgUrl,
            title: card.cardTitle,
            body: card.cardBody,
          })),
          subHeading: data.data.subHeading,
          address1: data.data.address1,
          address2: data.data.address2,
          body: data.data.body,
          options: data.data.whyChooseUsOptions.map((option) => ({
            image: option.optionImgUrl,
            title: option.optionTitle,
          })),
          footer: data.data.footer,
        });

        setImagePreviews({
          cards: data.data.whyChooseUsCard.map((card) => card.cardImgUrl),
          options: data.data.whyChooseUsOptions.map(
            (option) => option.optionImgUrl
          ),
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
    if (section === "cards" && index !== null) {
      const updatedCards = inputValues.cards.map((card, idx) =>
        idx === index ? { ...card, [name]: value } : card
      );
      setInputValues((prev) => ({
        ...prev,
        cards: updatedCards,
      }));
    } else if (section === "options" && index !== null) {
      const updatedOptions = inputValues.options.map((option, idx) =>
        idx === index ? { ...option, [name]: value } : option
      );
      setInputValues((prev) => ({
        ...prev,
        options: updatedOptions,
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
        if (section === "cards" && index !== null) {
          const updatedCards = inputValues.cards.map((card, idx) =>
            idx === index ? { ...card, image: file } : card
          );
          setInputValues((prev) => ({
            ...prev,
            cards: updatedCards,
          }));

          const updatedPreviews = imagePreviews.cards.map((preview, idx) =>
            idx === index ? reader.result : preview
          );
          setImagePreviews((prev) => ({
            ...prev,
            cards: updatedPreviews,
          }));
        } else if (section === "options" && index !== null) {
          const updatedOptions = inputValues.options.map((option, idx) =>
            idx === index ? { ...option, image: file } : option
          );
          setInputValues((prev) => ({
            ...prev,
            options: updatedOptions,
          }));

          const updatedPreviews = imagePreviews.options.map((preview, idx) =>
            idx === index ? reader.result : preview
          );
          setImagePreviews((prev) => ({
            ...prev,
            options: updatedPreviews,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    inputValues.cards.forEach((card, index) => {
      if (card.image instanceof File) {
        formData.append(`whyChooseUsCardList[${index}].image`, card.image);
      } else {
        formData.append(`whyChooseUsCardList[${index}].image`, new Blob());
      }
    });

    inputValues.options.forEach((option, index) => {
      if (option.image instanceof File) {
        formData.append(`whyChooseUsOptionsList[${index}].image`, option.image);
      } else {
        formData.append(`whyChooseUsOptionsList[${index}].image`, new Blob());
      }
    });

    formData.append(
      "whyChooseUs",
      JSON.stringify({
        id: 1,
        heading: inputValues.heading,
        whyChooseUsCard: inputValues.cards.map((card) => ({
          cardImgUrl: "",
          cardTitle: card.title,
          cardBody: card.body,
        })),
        subHeading: inputValues.subHeading,
        body: inputValues.body,
        whyChooseUsOptions: inputValues.options.map((option) => ({
          optionImgUrl: "",
          optionTitle: option.title,
        })),
        address1: inputValues.address1,
        address2: inputValues.address2,
        footer: inputValues.footer,
      })
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection3/1`,
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
        <h2>Choose Us Form</h2>
        <div className="form-group">
          <label>Heading:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="heading"
              value={existingData.heading}
              disabled
            />
            <input
              type="text"
              name="heading"
              value={inputValues.heading}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Sub Heading:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="subHeading"
              value={existingData.subHeading}
              disabled
            />
            <input
              type="text"
              name="subHeading"
              value={inputValues.subHeading}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="address1"
              value={existingData.address1}
              disabled
            />
            <input
              type="text"
              name="address1"
              value={inputValues.address1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="address2"
              value={existingData.address2}
              disabled
            />
            <input
              type="text"
              name="address2"
              value={inputValues.address2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Body:</label>
          <div className="adjacent-inputs">
            <input type="text" name="body" value={existingData.body} disabled />
            <input
              type="text"
              name="body"
              value={inputValues.body}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Footer:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="footer"
              value={existingData.footer}
              disabled
            />
            <input
              type="text"
              name="footer"
              value={inputValues.footer}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="tabs">
          {Array.from({ length: 3 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeCardTab === index ? "active" : ""}
              onClick={() => setActiveCardTab(index)}
            >
              Card {index + 1}
            </button>
          ))}
        </div>

        {existingData.cards.map((card, index) => (
          <div
            key={index}
            style={{ display: activeCardTab === index ? "block" : "none" }}
          >
            <h3>Card {index + 1}</h3>
            <div className="form-group">
              <label>Image:</label>
              <div className="adjacent-inputs">
                {imagePreviews.cards[index] && (
                  <img
                    src={imagePreviews.cards[index]}
                    alt="Card Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, index, "cards")}
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
                        value={existingData.cards[index][key]}
                        disabled
                      />
                      <input
                        type="text"
                        name={key}
                        value={inputValues.cards[index][key]}
                        onChange={(e) => handleInputChange(e, index, "cards")}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        ))}

        <div className="tabs">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeOptionTab === index ? "active" : ""}
              onClick={() => setActiveOptionTab(index)}
            >
              Option {index + 1}
            </button>
          ))}
        </div>

        {existingData.options.map((option, index) => (
          <div
            key={index}
            style={{ display: activeOptionTab === index ? "block" : "none" }}
          >
            <h3>Option {index + 1}</h3>
            <div className="form-group">
              <label>Image:</label>
              <div className="adjacent-inputs">
                {imagePreviews.options[index] && (
                  <img
                    src={imagePreviews.options[index]}
                    alt="New Option Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, index, "options")}
                />
              </div>
            </div>
            {Object.keys(option).map(
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
                        value={existingData.options[index][key]}
                        disabled
                      />
                      <input
                        type="text"
                        name={key}
                        value={inputValues.options[index][key]}
                        onChange={(e) => handleInputChange(e, index, "options")}
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

export default ChooseUsForm;
