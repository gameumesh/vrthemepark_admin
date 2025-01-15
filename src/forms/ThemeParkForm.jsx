import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function ThemeParkForm() {
  const [inputValues, setInputValues] = useState({
    heading: "",
    subHeading: "",
    body: "",
    vrThemeParkImg: "",
    button: "",
    buttonLink: "",
  });

  const [existingData, setExistingData] = useState({
    heading: "",
    subHeading: "",
    body: "",
    vrThemeParkImg: "",
    button: "",
    buttonLink: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection5?id=1`
        );
        const data = response.data;
        setExistingData({
          heading: data.data.heading,
          subHeading: data.data.subHeading,
          body: data.data.body,
          vrThemeParkImg: data.data.vrThemeParkImg,
          button: data.data.button,
          buttonLink: data.data.buttonLink,
        });
        setImagePreview(data.data.vrThemeParkImg);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputValues((prev) => ({
        ...prev,
        vrThemeParkImg: file,
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

    if (inputValues.vrThemeParkImg instanceof File) {
      formData.append("vrThemeParkSection_img_1", inputValues.vrThemeParkImg);
    } else {
      formData.append("vrThemeParkSection_img_1", new Blob());
    }
    formData.append(
      "vrThemeParkSection",
      JSON.stringify({
        id: 1,
        heading: inputValues.heading,
        subHeading: inputValues.subHeading,
        body: inputValues.body,
        button: inputValues.button,
        buttonLink: inputValues.buttonLink,
      })
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection5/1`,
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
        <h2>Theme Park Form</h2>
        <div className="form-group">
          <label>VR Theme Park Image:</label>
          <div className="adjacent-inputs">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="VR Theme Park Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input
              type="file"
              name="vrThemeParkImg"
              onChange={handleFileChange}
            />
          </div>
        </div>
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

        <div className="form-group">
          <label>Button Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="buttonLink"
              value={existingData.buttonLink}
              disabled
            />
            <input
              type="text"
              name="buttonLink"
              value={inputValues.buttonLink}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ThemeParkForm;
