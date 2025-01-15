import React, { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import apiCall from "../utils/ApiHandler";

function HeaderForm() {
  const [inputValues, setInputValues] = useState({
    logoImage1: "",
    navlink1: "",
    navEditLink1: "",
    navlink2: "",
    navEditLink2: "",
    navlink3: "",
    navEditLink3: "",
    navlink4: "",
    navEditLink4: "",
    buttonText1: "",
    buttonEditText1: "",
    buttonText2: "",
    buttonEditText2: "",
  });

  const [existingData, setExistingData] = useState({
    logoImage1: "",
    navlink1: "",
    navEditLink1: "",
    navlink2: "",
    navEditLink2: "",
    navlink3: "",
    navEditLink3: "",
    navlink4: "",
    navEditLink4: "",
    buttonText1: "",
    buttonEditText1: "",
    buttonText2: "",
    buttonEditText2: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await apiCall(
          "get",
          "/VRThemePark/user/getSection1?id=1"
        );
        setExistingData({
          logoImage1: response.data.logoImage1,
          navlink1: response.data.navlink1,
          navEditLink1: response.data.navEditLink1,
          navlink2: response.data.navlink2,
          navEditLink2: response.data.navEditLink2,
          navlink3: response.data.navlink3,
          navEditLink3: response.data.navEditLink3,
          navlink4: response.data.navlink4,
          navEditLink4: response.data.navEditLink4,
          buttonText1: response.data.buttonText1,
          buttonEditText1: response.data.buttonEditText1,
          buttonText2: response.data.buttonText2,
          buttonEditText2: response.data.buttonEditText2,
        });
        setImagePreview(response.data.logoImage1);
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
        logoImage1: file,
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

    // If inputValues has a logo image, append it; otherwise, send an empty Blob
    if (inputValues.logoImage1) {
      formData.append("logoImage1", inputValues.logoImage1);
    } else {
      formData.append("logoImage1", new Blob());
    }

    // Append the JSON stringified headerSection data
    formData.append(
      "headerSection",
      JSON.stringify({
        id: 1,
        logoImage1: existingData.logoImage1, // Keep the existing logo image if none is uploaded
        navlink1: inputValues.navlink1,
        navEditLink1: inputValues.navEditLink1,
        navlink2: inputValues.navlink2,
        navEditLink2: inputValues.navEditLink2,
        navlink3: inputValues.navlink3,
        navEditLink3: inputValues.navEditLink3,
        navlink4: inputValues.navlink4,
        navEditLink4: inputValues.navEditLink4,
        buttonText1: inputValues.buttonText1,
        buttonEditText1: inputValues.buttonEditText1,
        buttonText2: inputValues.buttonText2,
        buttonEditText2: inputValues.buttonEditText2,
      })
    );

    // Get token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Not Authorized!");
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      // Call the reusable apiCall function for a PUT request
      const response = await apiCall(
        "put",
        `/VRThemePark/admin/getSection1/1`, // The relative endpoint
        formData,
        true, // isFormData is true because we're sending FormData
        token // Pass the token for Authorization
      );

      if (response) {
        console.log("Server response:", response);
        alert("Form Updated Successfully!");
        window.location.reload(); // Reload the page on success
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
        <h2>Header Form</h2>
        <div className="form-group">
          <label>Logo Image:</label>
          <div className="adjacent-inputs">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="logo Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input type="file" name="logoImage1" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navlink1"
              value={existingData.navlink1}
              disabled
            />
            <input
              type="text"
              name="navlink1"
              value={inputValues.navlink1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 1 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navEditLink1"
              value={existingData.navEditLink1}
              disabled
            />
            <input
              type="text"
              name="navEditLink1"
              value={inputValues.navEditLink1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navlink2"
              value={existingData.navlink2}
              disabled
            />
            <input
              type="text"
              name="navlink2"
              value={inputValues.navlink2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 2 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navEditLink2"
              value={existingData.navEditLink2}
              disabled
            />
            <input
              type="text"
              name="navEditLink2"
              value={inputValues.navEditLink2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 3:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navlink3"
              value={existingData.navlink3}
              disabled
            />
            <input
              type="text"
              name="navlink3"
              value={inputValues.navlink3}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 3 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navEditLink3"
              value={existingData.navEditLink3}
              disabled
            />
            <input
              type="text"
              name="navEditLink3"
              value={inputValues.navEditLink3}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 4:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navlink4"
              value={existingData.navlink4}
              disabled
            />
            <input
              type="text"
              name="navlink4"
              value={inputValues.navlink4}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 4 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navEditLink4"
              value={existingData.navEditLink4}
              disabled
            />
            <input
              type="text"
              name="navEditLink4"
              value={inputValues.navEditLink4}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Button 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="buttonText1"
              value={existingData.buttonText1}
              disabled
            />
            <input
              type="text"
              name="buttonText1"
              value={inputValues.buttonText1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Button 1 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="buttonEditText1"
              value={existingData.buttonEditText1}
              disabled
            />
            <input
              type="text"
              name="buttonEditText1"
              value={inputValues.buttonEditText1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Button 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="buttonText2"
              value={existingData.buttonText2}
              disabled
            />
            <input
              type="text"
              name="buttonText2"
              value={inputValues.buttonText2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Button 2 Link:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="buttonEditText2"
              value={existingData.buttonEditText2}
              disabled
            />
            <input
              type="text"
              name="buttonEditText2"
              value={inputValues.buttonEditText2}
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

export default HeaderForm;
