import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function ClientForm() {
  const [inputValues, setInputValues] = useState({
    heading1: "",
    heading2: "",
    body: "",
    clientSectionImages: Array(3).fill({
      image: "",
    }),
  });

  const [existingData, setExistingData] = useState({
    heading1: "",
    heading2: "",
    body: "",
    clientSectionImages: Array(3).fill({
      image: "",
    }),
  });

  const [activeCardTab, setActiveCardTab] = useState(0);
  const [imagePreviews, setImagePreviews] = useState({
    clientSectionImages: Array(3).fill(""),
  });
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection7?id=1`
        );
        const data = response.data;
        setExistingData({
          heading1: data.data.heading1,
          heading2: data.data.heading2,
          body: data.data.body,
          clientSectionImages: data.data.clientSectionImages.map((img) => ({
            image: img.image,
          })),
        });
        setImagePreviews({
          clientSectionImages: data.data.clientSectionImages.map(
            (img) => img.image
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
    if (section === "clientSectionImages" && index !== null) {
      const updatedImages = inputValues.clientSectionImages.map((img, idx) =>
        idx === index ? { ...img, [name]: value } : img
      );
      setInputValues((prev) => ({
        ...prev,
        clientSectionImages: updatedImages,
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
        if (section === "clientSectionImages" && index !== null) {
          const updatedCards = inputValues.clientSectionImages.map(
            (card, idx) => (idx === index ? { ...card, image: file } : card)
          );
          setInputValues((prev) => ({
            ...prev,
            clientSectionImages: updatedCards,
          }));

          const updatedPreviews = imagePreviews.clientSectionImages.map(
            (preview, idx) => (idx === index ? reader.result : preview)
          );
          setImagePreviews((prev) => ({
            ...prev,
            clientSectionImages: updatedPreviews,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    inputValues.clientSectionImages.forEach((card, index) => {
      if (card.image instanceof File) {
        formData.append(`clientSectionImagesList[${index}].image`, card.image);
      } else {
        formData.append(`clientSectionImagesList[${index}].image`, new Blob());
      }
    });

    formData.append(
      "clientSection",
      JSON.stringify({
        id: 1,
        heading1: inputValues.heading1,
        heading2: inputValues.heading2,
        clientSectionImages: inputValues.clientSectionImages.map((img) => ({
          image: "",
        })),
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
        `${url}/VRThemePark/admin/getSection7/1`,
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
        <h2>Our Client Form</h2>
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

        <div className="tabs">
          {Array.from({ length: 3 }, (_, index) => (
            <button
              type="button"
              key={index}
              className={activeCardTab === index ? "active" : ""}
              onClick={() => setActiveCardTab(index)}
            >
              Client Image {index + 1}
            </button>
          ))}
        </div>

        {existingData.clientSectionImages.map((img, index) => (
          <div
            key={index}
            style={{ display: activeCardTab === index ? "block" : "none" }}
          >
            <h3>Image {index + 1}</h3>
            <div className="form-group">
              <div className="adjacent-inputs">
                {imagePreviews.clientSectionImages[index] && (
                  <img
                    src={imagePreviews.clientSectionImages[index]}
                    alt="Images Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    handleFileChange(e, index, "clientSectionImages")
                  }
                />
              </div>
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

export default ClientForm;
