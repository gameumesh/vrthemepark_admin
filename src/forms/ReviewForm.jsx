import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function ReviewForm() {
  const [inputValues, setInputValues] = useState({
    revImage: "",
    revHeading: "",
    revBody: "",
    revCards: Array(4).fill({
      title: "",
      body: "",
      date: "",
      rating: "",
    }),
  });

  const [existingData, setExistingData] = useState({
    revImage: "",
    revHeading: "",
    revBody: "",
    revCards: Array(4).fill({
      title: "",
      body: "",
      date: "",
      rating: "",
    }),
  });

  const [activeCardTab, setActiveCardTab] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection6?id=1`
        );
        const data = response.data;
        setExistingData({
          revImage: data.data.revImage,
          revHeading: data.data.revHeading,
          revBody: data.data.revBody,
          revCards: data.data.revCards.map((card) => ({
            title: card.title,
            body: card.body,
            date: card.date,
            rating: card.rating,
          })),
        });
        setImagePreview(data.data.revImage);
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

    if (section === "revCards" && index !== null) {
      const updatedCards = inputValues.revCards.map((card, idx) => {
        if (idx === index) {
          // For rating field, if it's empty or unchanged, keep the existing rating
          if (name === "rating" && (value === "" || value === null)) {
            return { ...card, rating: existingData.revCards[idx].rating };
          }
          return { ...card, [name]: value };
        }
        return card;
      });

      setInputValues((prev) => ({
        ...prev,
        revCards: updatedCards,
      }));
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputValues((prev) => ({
        ...prev,
        revImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (inputValues.revImage instanceof File) {
      formData.append("reviewSection_img_1", inputValues.revImage);
    } else {
      formData.append("reviewSection_img_1", new Blob());
    }

    formData.append(
      "reviewSection",
      JSON.stringify({
        id: 1,
        revImage: "",
        revHeading: inputValues.revHeading,
        revBody: inputValues.revBody,
        revCards: inputValues.revCards.map((card) => ({
          title: card.title,
          body: card.body,
          date: card.date,
          rating: card.rating || 4,
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
        `${url}/VRThemePark/admin/getSection6/1`,
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

  const restrictRatingInput = (e) => {
    // Allow only numbers 1-5 and control keys like backspace, delete, tab, etc.
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];

    const validInput = /^[1-5]$/; // Only digits 1 to 5

    if (!allowedKeys.includes(e.key) && !validInput.test(e.key)) {
      e.preventDefault(); // Prevent invalid input
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
        <h2>Review Form</h2>
        <div className="form-group">
          <label>Review Image:</label>
          <div className="adjacent-inputs">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Review Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input type="file" name="revImage" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Sub Heading:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="revHeading"
              value={existingData.revHeading}
              disabled
            />
            <input
              type="text"
              name="revHeading"
              value={inputValues.revHeading}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Review Body:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="revBody"
              value={existingData.revBody}
              disabled
            />
            <input
              type="text"
              name="revBody"
              value={inputValues.revBody}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="tabs">
          {Array.from({ length: 4 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeCardTab === index ? "active" : ""}
              onClick={() => setActiveCardTab(index)}
            >
              Review Card {index + 1}
            </button>
          ))}
        </div>

        {existingData.revCards.map((card, index) => (
          <div
            key={index}
            style={{ display: activeCardTab === index ? "block" : "none" }}
          >
            <h3>Card {index + 1}</h3>
            {Object.keys(card).map((key) => (
              <div className="form-group" key={key}>
                <label>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </label>
                <div className="adjacent-inputs">
                  <input
                    type={key === "rating" ? "number" : "text"} // Adjust for rating input
                    name={key}
                    value={existingData.revCards[index][key]}
                    disabled
                  />
                  <input
                    type={key === "rating" ? "number" : "text"} // Adjust for rating input
                    name={key}
                    value={inputValues.revCards[index][key]}
                    min="1"
                    max="5"
                    onChange={(e) => handleInputChange(e, index, "revCards")}
                    onKeyDown={restrictRatingInput} // Restrict non-numeric input for rating
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
