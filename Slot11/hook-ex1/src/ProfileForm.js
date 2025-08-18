import React, { useState } from "react";
import PropTypes from "prop-types";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name không được để trống!";
    if (!email.trim()) newErrors.email = "Email không được để trống!";
    else if (!email.includes("@")) newErrors.email = "Email phải hợp lệ!";
    if (!age || isNaN(age) || Number(age) < 1) newErrors.age = "Age tối thiểu là 1!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (setter, field) => (e) => {
    const value = e.target.value;
    setter(value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (field === "name") {
        if (!value.trim()) newErrors.name = "Name không được để trống!";
        else newErrors.name = undefined;
      }
      if (field === "email") {
        if (!value.trim()) newErrors.email = "Email không được để trống!";
        else if (!value.includes("@")) newErrors.email = "Email phải hợp lệ!";
        else newErrors.email = undefined;
      }
      if (field === "age") {
        if (!value || isNaN(value) || Number(value) < 1) newErrors.age = "Age tối thiểu là 1!";
        else newErrors.age = undefined;
      }
      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowToast(true);
      setSubmittedData({ name, email, age });
      setShowModal(true);
      if (onSubmit) onSubmit({ name, email, age });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange(setName, "name")}
            style={{ flex: 1, minWidth: 0, width: '200px', boxSizing: 'border-box' }}
          />
          <div style={{ width: '180px', minHeight: '1em', marginLeft: 8, display: 'flex', alignItems: 'center' }}>
            {errors.name && <span style={{ color: "red", whiteSpace: 'nowrap' }}>{errors.name}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange(setEmail, "email")}
            style={{ flex: 1, minWidth: 0, width: '200px', boxSizing: 'border-box' }}
          />
          <div style={{ width: '180px', minHeight: '1em', marginLeft: 8, display: 'flex', alignItems: 'center' }}>
            {errors.email && <span style={{ color: "red", whiteSpace: 'nowrap' }}>{errors.email}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={handleChange(setAge, "age")}
            min={1}
            style={{ flex: 1, minWidth: 0, width: '200px', boxSizing: 'border-box' }}
          />
          <div style={{ width: '180px', minHeight: '1em', marginLeft: 8, display: 'flex', alignItems: 'center' }}>
            {errors.age && <span style={{ color: "red", whiteSpace: 'nowrap' }}>{errors.age}</span>}
          </div>
        </div>
        <button
          type="submit"
          disabled={!name || !email || !email.includes("@") || !age || isNaN(age) || Number(age) < 1}
        >
          Submit
        </button>
      </form>
      {showToast && (
        <div style={{ background: "#4caf50", color: "white", padding: "8px", marginTop: "10px" }}>
          Submitted successfully!
        </div>
      )}
      {showModal && submittedData && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{ background: "white", padding: 24, borderRadius: 8, minWidth: 300 }}>
            <h2>Submitted Profile</h2>
            <div style={{ border: "1px solid #eee", borderRadius: 6, padding: 16, marginBottom: 16 }}>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Age:</strong> {submittedData.age}</p>
            </div>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProfileForm;
