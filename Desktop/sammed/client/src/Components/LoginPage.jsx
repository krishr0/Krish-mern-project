import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted: ', email, password);

    axios.post("http://localhost:9000/api/user/login", { email, password })
      .then((res) => {
        alert("Login successful");
        console.log(res.data);

        // Store user data in localStorage if needed
        localStorage.setItem("user-email", email);
        localStorage.setItem("user-name", res.data.fullname || "");
        localStorage.setItem("user-role", res.data.role || "user");

        // Redirect to menu page
        navigate("/menu");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("Wrong email or password");
        } else {
          alert("Server error. Try again later.");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="LoginForm">
      <div className="floating-food">🍔</div>
      <div className="floating-food">🍣</div>
      <div className="floating-food">🍕</div>

      <div className="auth-container">
        <div className="logo">BCAQuickBite</div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder=" " 
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder=" " 
              required
            />
            <label>Password</label>
            <i 
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`} 
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <button type="submit" className="submit-btn">Sign In</button>

          <div className="auth-switch">
            New user? <Link to='/register'>Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
