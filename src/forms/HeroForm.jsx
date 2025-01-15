import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function HeroForm() {
  const [inputValues, setInputValues] = useState({
    tabText1: "",
    tabText2: "",
    cardReviewCount: "",
    cardTitle: "",
    cardBody: "",
    cardButton: "",
    cardVisitorCount: "",
    cardFooter: "",
    liveButton: "",
    button1: "",
    button1Link: "",
    button2: "",
    button2Link: "",
    runningText: "",
    button3: "",
    button3Link: "",
  });

  const [existingData, setExistingData] = useState({
    tabText1: "",
    tabText2: "",
    cardReviewCount: "",
    cardTitle: "",
    cardBody: "",
    cardButton: "",
    cardVisitorCount: "",
    cardFooter: "",
    liveButton: "",
    button1: "",
    button1Link: "",
    button2: "",
    button2Link: "",
    runningText: "",
    button3: "",
    button3Link: "",
  });
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection2?id=1`
        );
        const data = response.data;
        setExistingData({
          tabText1: data.data.tab1,
          tabText2: data.data.tab2,
          cardReviewCount: data.data.heroSectionCard.reviewCounts,
          cardTitle: data.data.heroSectionCard.cardHeading,
          cardBody: data.data.heroSectionCard.cardBody,
          cardButton: data.data.heroSectionCard.cardButton,
          cardVisitorCount: data.data.heroSectionCard.cardVisitor,
          cardFooter: data.data.heroSectionCard.cardFooter,
          liveButton: data.data.liveButton,
          button1: data.data.button1,
          button1Link: data.data.button1Link,
          button2: data.data.button2,
          button2Link: data.data.button2Link,
          runningText: data.data.runningText,
          button3: data.data.button3,
          button3Link: data.data.button3Link,
        });
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
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "heroSection",
      JSON.stringify({
        id: 1,
        tab1: inputValues.tabText1,
        tab2: inputValues.tabText2,
        heroSectionCard: {
          cardId: null,
          reviewCounts: inputValues.cardReviewCount,
          cardHeading: inputValues.cardTitle,
          cardBody: inputValues.cardBody,
          cardButton: inputValues.cardButton,
          cardVisitor: inputValues.cardVisitorCount,
          cardFooter: inputValues.cardFooter,
        },
        liveButton: inputValues.liveButton,
        button1: inputValues.button1,
        button1Link: inputValues.button1Link,
        button2: inputValues.button2,
        button2Link: inputValues.button2Link,
        runningText: inputValues.runningText,
        button3: inputValues.button3,
        button3Link: inputValues.button3Link,
      })
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection2/1`,
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
        <h2>Hero Form</h2>
        {Object.keys(inputValues).map((key) => (
          <div className="form-group" key={key}>
            <label>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .replace("Tab ", "Tab Text ")
                .replace("Card ", "Card ")
                .replace("Vistior", "Visitor") + ":"}
            </label>
            <div className="adjacent-inputs">
              <input
                type="text"
                name={key}
                value={existingData[key]}
                disabled
              />
              <input
                type="text"
                name={key}
                value={inputValues[key]}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default HeroForm;
