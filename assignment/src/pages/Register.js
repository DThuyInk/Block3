import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const navigate = useNavigate();

  // Wizard step
  const [step, setStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    secret_question: "",
    answer: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate step fields
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (step === 2) {
      if (!formData.secret_question.trim())
        newErrors.secret_question = "Secret question is required";
      if (!formData.answer.trim()) newErrors.answer = "Answer is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next step
  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  // Previous step
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        // Lấy danh sách UserAccounts hiện tại
        const res = await axios.get("http://localhost:3001/UserAccounts");
        const users = res.data;
        // Tìm id lớn nhất
        let maxId = 0;
        users.forEach(u => {
          const idNum = parseInt(u.id, 10);
          if (!isNaN(idNum) && idNum > maxId) maxId = idNum;
        });
        const newId = (maxId + 1).toString();
        // Tạo dữ liệu mới với id tự động
        const newUser = { ...formData, id: newId, account_type: "user", status: "active" };
        await axios.post("http://localhost:3001/UserAccounts", newUser);
        toast.success("Registration successful. You are now signed in.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Error saving user:", error);
        toast.error("Error registering user.");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="card shadow p-4" style={{ width: "400px" }}>
        {/* Wizard Progress */}
        <div className="mb-4 text-center">
          <h3 className="mb-3">Register</h3>
          <div className="d-flex justify-content-between">
            <div className={`fw-bold ${step === 1 ? "text-primary" : "text-muted"}`}>
              Step 1: Account
            </div>
            <div className={`fw-bold ${step === 2 ? "text-primary" : "text-muted"}`}>
              Step 2: Security
            </div>
          </div>
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-3">
                <label className="form-label">Secret Question</label>
                <select
                  className={`form-control ${errors.secret_question ? "is-invalid" : ""}`}
                  name="secret_question"
                  value={formData.secret_question}
                  onChange={handleChange}
                >
                  <option value="">Select a question...</option>
                  <option value="What is your favorite color?">What is your favorite color?</option>
                  <option value="What is your favorite food?">What is your favorite food?</option>
                  <option value="What is your favorite movie?">What is your favorite movie?</option>
                  <option value="What is your favorite hobby?">What is your favorite hobby?</option>
                </select>
                {errors.secret_question && (
                  <div className="invalid-feedback">{errors.secret_question}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Answer</label>
                <input
                  type="text"
                  className={`form-control ${errors.answer ? "is-invalid" : ""}`}
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                />
                {errors.answer && (
                  <div className="invalid-feedback">{errors.answer}</div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
