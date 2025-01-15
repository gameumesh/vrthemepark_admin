import React, { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username or password is incorrect");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${url}/VRThemePark/auth/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const { data, message } = response.data;

        if (data) {
          sessionStorage.setItem("token", data);
          console.log(message);
          window.location.reload();
        } else {
          alert("Login unsuccessful: Invalid token");
          setUsername("");
          setPassword("");
        }
      } else {
        alert("Login unsuccessful: Server error");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        "Login unsuccessful: " +
          (error.response?.data?.message || "Server error")
      );
      setUsername("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Oval height={80} width={80} color="#4fa94d" ariaLabel="loading" />
        </div>
      )}
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="l-form" onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
