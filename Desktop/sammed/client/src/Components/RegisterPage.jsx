import "../styles/register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted", fullname, email, password);

    axios.post(
      "http://localhost:9000/api/user/register",
      { fullname, email, password }
    )
    .then((res) => {
      console.log(res);

      if (res.status === 201 || res.status === 200) {
        alert("User Registered Successfully");
        navigate("/login");
      } else if (res.status === 203) {
        alert("User Already Exists!");
      } else {
        alert("Failed to register... Try again later");
      }
    })
    .catch((err) => {
      console.log("Error while registering:", err);
      alert("Something went wrong");
    });
  };

  return (
    <div id="RegisterForm">
      <div className="auth-container">
        <div className="logo">BCAQuickBite</div>

        {/* ✅ onSubmit added here */}
        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>

            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {/* ✅ Button is submit type */}
          <button type="submit" className="submit-btn">
            Create Account
          </button>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
