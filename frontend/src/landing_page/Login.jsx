import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://zerodhabackend-6u2j.onrender.com"; // backend url

// 🔹 Login API function
const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation({
    mutationFn: loginUser,
  });

  // ✅ Redirect after successful login
  useEffect(() => {
    if (isSuccess) {
      // optional: localStorage me user save kar sakte ho
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // 🔁 Home page redirect
    }
  }, [isSuccess, navigate, data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-3">Login</h3>

            {isError && (
              <div className="alert alert-danger">
                {error.response?.data?.message || "Invalid credentials"}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />

              <button
                className="btn btn-success w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
