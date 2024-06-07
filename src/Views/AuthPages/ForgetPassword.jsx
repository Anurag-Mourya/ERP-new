import React, { useState } from "react";
import axios from "axios";
import "./authcss.scss";
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { LiaAngleLeftSolid } from "react-icons/lia";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Define otpSent state
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}/forgot/password`, { params: { email } });
      if (response.data.status === "200") {
        toast.success(response.data.message);
        setOtpSent(true);
      }
      if (response.data.success === false) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Forgot password request error:', error);
      toast.error('Failed to send forgot password request. Please try again later.');
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/verify/otp?email=${email}&otp=${otp}`);
      if (response.data.success) {
        // Save access token to session storage
        localStorage.setItem('ForgetaccessToken', response.data.access_token);

        toast.success('OTP verification successful. Redirecting to dashboard...');
        setTimeout(() => {
          Navigate("/change-password");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Failed to verify OTP. Please try again later.');
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
          <Link to={"/login"} id="backbtnsxks"><LiaAngleLeftSolid /></Link>
          <div id="beforeformtext">
            <h1>Forget Password?</h1>
            {otpSent ? (
              <>
                <p>Enter the OTP sent to your email:</p>
                <form id="verifyOtpForm" onSubmit={handleVerifyOtp}>
                  <div className="form-group">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      placeholder="Enter OTP"
                    />
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <p>Enter your email address and select Send Email.</p>
                <form id="forgetpasswordform" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                    />
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Email'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};


export default ForgetPassword
