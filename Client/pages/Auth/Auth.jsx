import React, { useState } from 'react';
import './Auth.css';
import Logo from "../../image/ghj.png";
import { useDispatch, useSelector } from 'react-redux';
import { signUp, logIn } from '../../actions/AuthAction';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  console.log(loading);
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" });
  const [confirmPass, setconfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpass ? dispatch(signUp(data)) : setconfirmPass(false);

    } else {
      // const encryptPassword = '';
      // data.password = encryptPassword;
      // data.confirmpass = encryptPassword;
      dispatch(logIn(data));
    }
  }

  const resetForm = () => {
    setconfirmPass(true);
    setData({
      firstname: "", lastname: "", password: "", confirmpass: "", username: ""
    });
  }

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>TriExpress</h1>
          <h5>Let's Stay Connected</h5>
        </div>
      </div>
      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp &&
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            }

          </div>
          <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>
            * Confirm Password is not same.
          </span>

          <div style={{ paddingBottom: "20px" }}>
            <span style={{ fontSize: '12px', cursor: "pointer", textDecoration:"underline"}} onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>
              {isSignUp ? "Already have an account. Login!" : "Don't have an account? Sign Up"}
            </span>
            <button className="button infoButton" type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Log In"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Auth