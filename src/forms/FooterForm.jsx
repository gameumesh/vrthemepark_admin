import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function FooterForm() {
  const [inputValues, setInputValues] = useState({
    id: 1,
    navLink1: "",
    navLink2: "",
    navLink3: "",
    navLink4: "",
    navLink5: "",
    image: "",
    body: "",
    navLink6: "",
    navLink7: "",
    navLink8: "",
    navLink9: "",
    navLink10: "",
  });

  const [existingData, setExistingData] = useState({
    id: 1,
    navLink1: "",
    navLink2: "",
    navLink3: "",
    navLink4: "",
    navLink5: "",
    image: "",
    body: "",
    navLink6: "",
    navLink7: "",
    navLink8: "",
    navLink9: "",
    navLink10: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection10?id=1`
        );
        const data = response.data;
        setExistingData({
          navLink1: data.data.navLink1,
          navLink2: data.data.navLink2,
          navLink3: data.data.navLink3,
          navLink4: data.data.navLink4,
          navLink5: data.data.navLink5,
          image: data.data.image,
          body: data.data.body,
          navLink6: data.data.navLink6,
          navLink7: data.data.navLink7,
          navLink8: data.data.navLink8,
          navLink9: data.data.navLink9,
          navLink10: data.data.navLink10,
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
      formData.append("footerSection_img_1", inputValues.image);
    } else {
      formData.append("footerSection_img_1", new Blob());
    }
    formData.append(
      "newFooterSection",
      JSON.stringify({
        id: 1,
        navLink1: inputValues.navLink1,
        navLink2: inputValues.navLink2,
        navLink3: inputValues.navLink3,
        navLink4: inputValues.navLink4,
        navLink5: inputValues.navLink5,
        image: "",
        body: inputValues.body,
        navLink6: inputValues.navLink6,
        navLink7: inputValues.navLink7,
        navLink8: inputValues.navLink8,
        navLink9: inputValues.navLink9,
        navLink10: inputValues.navLink10,
      })
    );

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in sessionStorage");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/VRThemePark/admin/getSection10/1`,
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
        <h2>Footer Form</h2>
        <div className="form-group">
          <label>Image:</label>
          <div className="adjacent-inputs">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Img"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input type="file" name="Img" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 1:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink1"
              value={existingData.navLink1}
              disabled
            />
            <input
              type="text"
              name="navLink1"
              value={inputValues.navLink1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 2:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink2"
              value={existingData.navLink2}
              disabled
            />
            <input
              type="text"
              name="navLink2"
              value={inputValues.navLink2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 3:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink3"
              value={existingData.navLink3}
              disabled
            />
            <input
              type="text"
              name="navLink3"
              value={inputValues.navLink3}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 4:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink4"
              value={existingData.navLink4}
              disabled
            />
            <input
              type="text"
              name="navLink4"
              value={inputValues.navLink4}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 5:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink5"
              value={existingData.navLink5}
              disabled
            />
            <input
              type="text"
              name="navLink5"
              value={inputValues.navLink5}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 6:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink6"
              value={existingData.navLink6}
              disabled
            />
            <input
              type="text"
              name="navLink6"
              value={inputValues.navLink6}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 7:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink7"
              value={existingData.navLink7}
              disabled
            />
            <input
              type="text"
              name="navLink7"
              value={inputValues.navLink7}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 8:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink8"
              value={existingData.navLink8}
              disabled
            />
            <input
              type="text"
              name="navLink8"
              value={inputValues.navLink8}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 9:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink9"
              value={existingData.navLink9}
              disabled
            />
            <input
              type="text"
              name="navLink9"
              value={inputValues.navLink9}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Navlink 10:</label>
          <div className="adjacent-inputs">
            <input
              type="text"
              name="navLink10"
              value={existingData.navLink10}
              disabled
            />
            <input
              type="text"
              name="navLink10"
              value={inputValues.navLink10}
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

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FooterForm;
