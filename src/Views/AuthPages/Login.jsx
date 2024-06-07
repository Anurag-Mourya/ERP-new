import React, { useState } from "react";
import axios from "axios";
import "./authcss.scss";
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // http://localhost:8000/api/login
      const response = await axios.post(
        `${apiUrl}/login?email=${email}&password=${password}`
      );

      // Extract user data from the response
      const { user, access_token } = response.data;

      // Store user data and access token in local storage
      localStorage.setItem("UserData", JSON.stringify(user));
      localStorage.setItem("AccessToken", access_token);

      // Show alert for successful login
      if (response.data.success === true) {
        toast.success("Login successful");
        // Navigate("/organisations")
        // Navigate("/")
        window.location.href = '/';
      }

      if (response.data.success === false) {

        toast.error(response.data.message);
      }

      // Redirect user to the dashboard or perform other actions
      // window.location.href = '/dashboard';
    } catch (error) {
      toast.error("Failed to login. Please check your email and password.");

    }

    setLoading(false);
  };

  return (
    <>

      <div id="formpagefologin">
        <div className="blob"></div>
        <div className="blob_two"></div>
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            <div
              className="box-root flex-flex"
              style={{ gridArea: "top / start / 8 / end" }}
            >
              <div className="box-root" style={{ flexGrow: 1 }}></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "4 / 2 / auto / 5" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "6 / start / auto / 2" }}
            >
              <div
                className="box-root box-background--blue800"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "7 / start / auto / 4" }}
            >
              <div
                className="box-root box-background--blue animationLeftRight"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "8 / 4 / auto / 6" }}
            >
              <div
                className="box-root box-background--gray100 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "2 / 15 / auto / end" }}
            >
              <div
                className="box-root box-background--cyan200 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "3 / 14 / auto / end" }}
            >
              <div
                className="box-root box-background--blue animationRightLeft"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "4 / 17 / auto / 20" }}
            >
              <div
                className="box-root box-background--gray100 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "5 / 14 / auto / 17" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
          </div>
        </div>

        <div id="formsectionloginco">
          <div id="beforeformtext">
            <h1>
              Login<span className="waveofhand">👋</span>
            </h1>
            <h2>Welcome Back to Your Dashboard</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link to={"/forget-password"} id="forgetpasswordtext">forget password?</Link>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div id="newsecrl">
              <p>or</p>
              <p><Link to={"/register"} >Don't have any account?</Link></p>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
