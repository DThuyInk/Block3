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
    <div style={{ maxWidth: 420, margin: "auto", padding: "0 8px" }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontWeight: 500, marginBottom: 2 }}>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange(setName, "name")}
            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16, outline: errors.name ? '2px solid #f44336' : 'none', transition: 'outline 0.2s' }}
          />
          {errors.name && <span style={{ color: "#f44336", fontSize: 13 }}>{errors.name}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontWeight: 500, marginBottom: 2 }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange(setEmail, "email")}
            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16, outline: errors.email ? '2px solid #f44336' : 'none', transition: 'outline 0.2s' }}
          />
          {errors.email && <span style={{ color: "#f44336", fontSize: 13 }}>{errors.email}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontWeight: 500, marginBottom: 2 }}>Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={handleChange(setAge, "age")}
            min={1}
            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16, outline: errors.age ? '2px solid #f44336' : 'none', transition: 'outline 0.2s' }}
          />
          {errors.age && <span style={{ color: "#f44336", fontSize: 13 }}>{errors.age}</span>}
        </div>
        <button
          type="submit"
          disabled={!name || !email || !email.includes("@") || !age || isNaN(age) || Number(age) < 1}
          style={{
            background: 'linear-gradient(90deg, #005bea 0%, #00c6fb 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '12px 0',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginTop: 8,
            opacity: (!name || !email || !email.includes("@") || !age || isNaN(age) || Number(age) < 1) ? 0.6 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          Submit
        </button>
      </form>
      {showToast && (
        <div style={{ background: "#4caf50", color: "white", padding: "8px 16px", marginTop: "16px", borderRadius: 6, textAlign: 'center', fontWeight: 500 }}>
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
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{ background: "white", padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
            <h2 style={{ marginBottom: 16, textAlign: 'center' }}>Submitted Profile</h2>
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 18, marginBottom: 18, background: '#f7fafd' }}>
              <p style={{ margin: '8px 0' }}><strong>Name:</strong> {submittedData.name}</p>
              <p style={{ margin: '8px 0' }}><strong>Email:</strong> {submittedData.email}</p>
              <p style={{ margin: '8px 0' }}><strong>Age:</strong> {submittedData.age}</p>
            </div>
            <button onClick={() => setShowModal(false)} style={{
              background: 'linear-gradient(90deg, #005bea 0%, #00c6fb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '10px 0',
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              width: '100%',
              marginTop: 8
            }}>Close</button>
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
