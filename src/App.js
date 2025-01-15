import React, { useState, useEffect } from "react";
import "./App.css";
import { Header, Footer } from "./components/index";
import {
  AboutUs,
  ClientPage,
  ContactUs,
  GamesPage,
  HeroPage,
  ReviewPage,
  VrThemePark,
  WhyChooseUs,
} from "./pages/index";
import {
  AboutUsForm,
  ChooseUsForm,
  ClientForm,
  ContactForm,
  FooterForm,
  GamesForm,
  HeaderForm,
  HeroForm,
  ReviewForm,
  ThemeParkForm,
  DefaultForm,
} from "./forms/index";
import Login from "./components/Login";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState("default");
  const [userAuth, setUserAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_BASE_URL;

  const handleLogout = async (e) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.post(
          `${url}/VRThemePark/auth/signout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          sessionStorage.clear();
          alert("Successfully Logged Out!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
    setLoading(false);
  }, []);

  const handleComponentClick = (componentName) => {
    setSelectedComponent(componentName);
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
    <>
      {userAuth ? (
        <div className="home-container">
          <div className="nav-section sec1BG">
            <div onClick={() => handleComponentClick("header")}>
              <Header />
            </div>
            <div onClick={() => handleComponentClick("hero")}>
              <HeroPage />
            </div>
            <div onClick={() => handleComponentClick("chooseus")}>
              <WhyChooseUs />
            </div>
            <div onClick={() => handleComponentClick("games")}>
              <GamesPage />
            </div>
            <div onClick={() => handleComponentClick("themepark")}>
              <VrThemePark />
            </div>
            <div onClick={() => handleComponentClick("review")}>
              <ReviewPage />
            </div>
            <div onClick={() => handleComponentClick("client")}>
              <ClientPage />
            </div>
            <div onClick={() => handleComponentClick("about")}>
              <AboutUs />
            </div>
            <div onClick={() => handleComponentClick("contact")}>
              <ContactUs />
            </div>
            <div onClick={() => handleComponentClick("footer")}>
              <Footer />
            </div>
          </div>
          <div
            className="form-section"
            style={{
              flexDirection: "column",
              height: "100vh",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                margin: "10px",
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 1000,
              }}
            >
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div style={{ marginTop: "63px", overflowY: "auto", flex: 1 }}>
              {selectedComponent === "default" && <DefaultForm />}
              {selectedComponent === "header" && <HeaderForm />}
              {selectedComponent === "hero" && <HeroForm />}
              {selectedComponent === "chooseus" && <ChooseUsForm />}
              {selectedComponent === "games" && <GamesForm />}
              {selectedComponent === "themepark" && <ThemeParkForm />}
              {selectedComponent === "review" && <ReviewForm />}
              {selectedComponent === "client" && <ClientForm />}
              {selectedComponent === "about" && <AboutUsForm />}
              {selectedComponent === "contact" && <ContactForm />}
              {selectedComponent === "footer" && <FooterForm />}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
