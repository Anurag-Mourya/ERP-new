import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        name,
        password,
        mobile_no: mobileNo,
        email,
      });
      const response = await axios.post(`${apiUrl}/register?${queryParams}`);

      // Extract user data from the response
      const { user, access_token } = response.data;

      // Store user data and access token in local storage
      localStorage.setItem('UserData', JSON.stringify(user));
      localStorage.setItem('AccessToken', access_token);

      if (response.data.success === true) {
        toast.success("An email has been sent. Please verify your email.");
        Navigate("/create-organisation")
      }

      if (response.data.success === false) {

        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Registration error');
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
              Register<span className="waveofhand">🚀</span>
            </h1>
            <h2>Sign Up for a New Account</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='enter your name'
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='create a password'
              />
            </div>
            <div className="form-group">
              <label>Mobile Number:</label>
              <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                placeholder='enter your mobile number'
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='enter your email'
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
          <div id="newsecrl">
            <p>or</p>
            <p><Link to={"/login"} >Already have an account? Log In</Link></p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
