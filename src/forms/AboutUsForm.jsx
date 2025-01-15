import React, { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";

function AboutUsForm() {
  const [inputValues, setInputValues] = useState({
    heading1: "",
    heading2: "",
    image: "",
    body: "",
  });

  const [existingData, setExistingData] = useState({
    heading1: "",
    heading2: "",
    image: "",
    body: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection8?id=1`
        );
        const data = response.data;
        setExistingData({
          heading1: data.data.heading1,
          heading2: data.data.heading2,
          image: data.data.image,
          body: data.data.body,
        });
        setImagePreview(data.data.image);
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
        image: file,
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

    if (inputValues.image instanceof File) {
      formData.append("aboutUsSection_img_1", inputValues.image);
    } else {
      formData.append("aboutUsSection_img_1", new Blob());
    }

    formData.append(
      "aboutUsSection",
      JSON.stringify({
        id: 1,
        heading1: inputValues.heading1,
        heading2: inputValues.heading2,
        image: "",
        body: inputValues.body,
      })
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection8/1`,
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
        <h2>About Us Form</h2>
        <div className="form-group">
          <label>Image:</label>
          <div className="adjacent-inputs">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Img Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Heading 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="heading1"
              value={existingData.heading1}
              disabled
            />
            <input
              type="text"
              name="heading1"
              value={inputValues.heading1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Heading 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="heading2"
              value={existingData.heading2}
              disabled
            />
            <input
              type="text"
              name="heading2"
              value={inputValues.heading2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Body 3:</label>
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

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AboutUsForm;
