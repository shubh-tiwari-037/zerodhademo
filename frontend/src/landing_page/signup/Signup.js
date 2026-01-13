import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080"; // backend url

const UserApi = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const { mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: UserApi,
  });

  // ✅ Redirect to login after successful signup
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 1000); // 1 sec delay (optional)
    }
  }, [isSuccess, navigate]);

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
            <h3 className="text-center mb-3">Signup</h3>

            {isSuccess && (
              <div className="alert alert-success">
                Signup successful! Redirecting to login...
              </div>
            )}

            {isError && (
              <div className="alert alert-danger">
                {error.response?.data?.message || "Something went wrong"}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
              />

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

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Mobile Number"
                name="number"
                onChange={handleChange}
                required
              />

              <button
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Signup"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
