import React, { useState } from "react";
import "./Admin.css";
import { FaUserShield, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminCard = () => {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const {login}=useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result=await login(email,password);
      if(result.success){
        navigate('/allbuses');
      }
      else{
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong 😓");
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      {/* Login Box */}
      <div className="login-box">
        <div className="login-head">
          <div className="login-icon">
            <FaUserShield />
          </div>
          <h2 className="login-title">Admin Login</h2>
          <p className="login-subtitle">
            Access the Acropolis Bus Management System
          </p>

          </div>
          {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="admin@acropolis.edu"
              onChange={e=>
                setemail(e.target.value)
              }
              required
            />
            <FaEnvelope className="icon-inside" />
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              onChange={e=>setpassword(e.target.value)}
              required
            />
            <FaLock className="icon-inside" />
            {showPassword ? (
              <FaEyeSlash className="eye-icon" onClick={togglePassword} />
            ) : (
              <FaEye className="eye-icon" onClick={togglePassword} />
            )}
          </div>

          {/* Button */}
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
            <div className="login-help">
              <p className="help-text">
                Need help? Contact{" "}
                <a href="mailto:support@acropolis.edu">support@acropolis.edu</a>
              </p>
            </div>
      </div>
    </div>
  );
};

export default AdminCard;
