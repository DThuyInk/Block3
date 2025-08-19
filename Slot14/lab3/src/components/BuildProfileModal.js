import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../App.css";

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const cardStyle = {
  background: "linear-gradient(135deg, #f6faff 0%, #eaf3ff 100%)",
  borderRadius: "18px",
  padding: "40px 48px",
  minWidth: "440px",
  maxWidth: "520px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  position: "relative",
  border: "1.5px solid #eaeaea",
};

const tabStyle = {
  display: "flex",
  borderBottom: "2px solid #eaeaea",
  marginBottom: "24px",
};

const tabItemStyle = (active) => ({
  padding: "12px 32px",
  cursor: "pointer",
  background: active ? "#3b79ffff" : "#f8f8f8",
  color: active ? "#fff" : "#333",
  borderRadius: active ? "8px 8px 0 0" : "8px 8px 0 0",
  fontWeight: active ? "bold" : "normal",
  marginRight: "8px",
  border: "none",
});

function BuildProfileModal({ onClose }) {
  // Address tab state
  const [address, setAddress] = useState({
    streetName: "",
    streetNumber: "",
    city: "",
    country: "Viet Nam",
  });
  const [addrTouched, setAddrTouched] = useState({ streetName: false, streetNumber: false, city: false, country: false });

  // Address validation
  const streetNameValid = address.streetName.trim().length > 0;
  const streetNumberValid = address.streetNumber.trim().length > 0;
  const cityValid = address.city.trim().length > 0;
  const countryValid = address.country.length > 0;
  const addressValid = streetNameValid && streetNumberValid && cityValid && countryValid;

  // Profile modal state
  const [showProfile, setShowProfile] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [tab, setTab] = useState(0);
  const [about, setAbout] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: null,
  });
  const fileInputRef = React.useRef();
  const [touched, setTouched] = useState({ firstName: false, lastName: false, email: false });

  // Account tab state
  const [account, setAccount] = useState({
    username: "",
    password: "",
    confirm: "",
    question: "",
    answer: "",
  });
  const [accTouched, setAccTouched] = useState({ username: false, password: false, confirm: false, question: false, answer: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Account validation
  const usernameValid = account.username.length >= 6;
  const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(account.password);
  const confirmValid = account.confirm === account.password && account.confirm.length > 0;
  const questionValid = account.question.length > 0;
  const answerValid = account.answer.trim().length > 0;
  const accountValid = usernameValid && passwordValid && confirmValid && questionValid && answerValid;

  // Validation logic
  const validateName = (name) => name.trim().length > 0;
  const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const firstNameValid = validateName(about.firstName);
  const lastNameValid = validateName(about.lastName);
  const emailValid = validateEmail(about.email);
  const aboutValid = firstNameValid && lastNameValid && emailValid;

  // Xử lý chọn ảnh
  const handleChoosePicture = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAbout(a => ({ ...a, picture: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={modalStyle}>
      <div style={cardStyle}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}
          aria-label="Close"
        >
          ×
        </button>
        <h2 style={{
          textAlign: "center",
          marginBottom: 32,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 1,
          color: "#3b79ff",
          textShadow: "0 2px 8px #eaf3ff",
        }}>BUILD YOUR PROFILE</h2>
        <div style={{ ...tabStyle, marginBottom: 32 }}>
          <button style={tabItemStyle(tab === 0)} disabled>About</button>
          <button style={tabItemStyle(tab === 1)} disabled={tab < 1}>Account</button>
          <button style={tabItemStyle(tab === 2)} disabled={tab < 2}>Address</button>
        </div>
        {tab === 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handlePictureChange}
              />
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "3px solid #3b79ff33",
                  boxShadow: "0 2px 12px #3b79ff22",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "#fff",
                }}
                onClick={handleChoosePicture}
                title="Click to choose picture"
              >
                {about.picture ? (
                  <img src={about.picture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                ) : (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#bbb" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" stroke="#bbb" strokeWidth="2"/></svg>
                )}
              </div>
              <div
                style={{ fontWeight: 700, fontSize: 15, cursor: "pointer", color: "#3b79ff", letterSpacing: 0.5, marginTop: 2 }}
                onClick={handleChoosePicture}
              >CHOOSE PICTURE</div>
            </div>
            <form style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: "#f6faff",
              borderRadius: 10,
              padding: "24px 28px",
              boxShadow: "0 2px 8px #eaf3ff44",
              border: "1px solid #eaeaea",
            }} autoComplete="off">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#3b79ff', marginBottom: 6 }}>About Information</div>
                <input
                  type="text"
                  value={about.firstName}
                  placeholder="First Name"
                  style={{
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${touched.firstName ? (firstNameValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAbout(a => ({ ...a, firstName: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, firstName: true }))}
                />
                {!firstNameValid && touched.firstName && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Please enter your first name</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={about.lastName}
                  placeholder="Last Name"
                  style={{
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${touched.lastName ? (lastNameValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAbout(a => ({ ...a, lastName: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, lastName: true }))}
                />
                {!lastNameValid && touched.lastName && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Please enter your last name</div>
                )}
              </div>
              <div>
                <input
                  type="email"
                  value={about.email}
                  placeholder="Email"
                  style={{
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${touched.email ? (emailValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAbout(a => ({ ...a, email: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                />
                {!emailValid && touched.email && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Please enter a valid email</div>
                )}
              </div>
              <button
                type="button"
                style={{
                  marginTop: 16,
                  width: '40%',
                  background: aboutValid ? 'linear-gradient(90deg, #3b79ff 0%, #44c3ff 100%)' : '#eaeaea',
                  color: aboutValid ? '#fff' : '#aaa',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px 0',
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: aboutValid ? 'pointer' : 'not-allowed',
                  letterSpacing: 1,
                  boxShadow: aboutValid ? '0 2px 8px #3b79ff44' : 'none',
                  transition: 'background 0.2s',
                }}
                disabled={!aboutValid}
                onClick={() => aboutValid && setTab(1)}
              >
                Next
              </button>
            </form>
          </div>
        )}
        {tab === 1 && (
          <form style={{
            maxWidth: 400,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            background: "#f6faff",
            borderRadius: 10,
            padding: "24px 28px",
            boxShadow: "0 2px 8px #eaf3ff44",
            border: "1px solid #eaeaea",
          }} autoComplete="off">
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#3b79ff', marginBottom: 6 }}>Account Information</div>
              <input
                type="text"
                value={account.username}
                placeholder="User name"
                style={{
                  width: "92%",
                  padding: "12px",
                  borderRadius: 6,
                  border: `1.5px solid ${accTouched.username ? (usernameValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                  background: "#f6faff",
                }}
                onChange={e => setAccount(a => ({ ...a, username: e.target.value }))}
                onBlur={() => setAccTouched(t => ({ ...t, username: true }))}
              />
              {!usernameValid && accTouched.username && (
                <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Username must be at least 6 characters</div>
              )}
            </div>
            <div style={{ position: "relative", textAlign: "left" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={account.password}
                placeholder="Password"
                style={{
                  width: "85%",
                  padding: "12px 40px 12px 12px",
                  borderRadius: 6,
                  border: `1.5px solid ${accTouched.password ? (passwordValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                  background: "#f6faff",
                }}
                onChange={e => setAccount(a => ({ ...a, password: e.target.value }))}
                onBlur={() => setAccTouched(t => ({ ...t, password: true }))}
              />
              <span style={{ position: "absolute", right: 12, top: 12, cursor: "pointer" }} onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {!passwordValid && accTouched.password && (
                <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>
                  Password must be at least 8 characters, include uppercase, number, and special character
                </div>
              )}
            </div>
            <div style={{ position: "relative", textAlign: "left" }}>
              <input
                type={showConfirm ? "text" : "password"}
                value={account.confirm}
                placeholder="Confirm password"
                style={{
                  width: "85%",
                  padding: "12px 40px 12px 12px",
                  borderRadius: 6,
                  border: `1.5px solid ${accTouched.confirm ? (confirmValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                  background: "#f6faff",
                }}
                onChange={e => setAccount(a => ({ ...a, confirm: e.target.value }))}
                onBlur={() => setAccTouched(t => ({ ...t, confirm: true }))}
              />
              <span style={{ position: "absolute", right: 12, top: 12, cursor: "pointer" }} onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
              {!confirmValid && accTouched.confirm && (
                <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Passwords do not match</div>
              )}
            </div>
            <div style={{ textAlign: "left" }}>
              <select
                value={account.question}
                style={{
                  width: "98.75%",
                  padding: "12px",
                  borderRadius: 6,
                  border: `1.5px solid ${accTouched.question ? (questionValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                  background: "#f6faff",
                  color: account.question ? '#333' : '#aaa',
                }}
                onChange={e => setAccount(a => ({ ...a, question: e.target.value }))}
                onBlur={() => setAccTouched(t => ({ ...t, question: true }))}
              >
                <option value="" disabled>Select secret question</option>
                <option value="pet">What is your first pet’s name?</option>
                <option value="mother">What is your mother’s maiden name?</option>
                <option value="city">In which city were you born?</option>
                <option value="teacher">Who was your favorite teacher?</option>
              </select>
              {!questionValid && accTouched.question && (
                <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Please select a secret question</div>
              )}
            </div>
            <div style={{ textAlign: "left" }}>
              <input
                type="text"
                value={account.answer}
                placeholder="Answer"
                style={{
                  width: "92%",
                  padding: "12px",
                  borderRadius: 6,
                  border: `1.5px solid ${accTouched.answer ? (answerValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                  background: "#f6faff",
                }}
                onChange={e => setAccount(a => ({ ...a, answer: e.target.value }))}
                onBlur={() => setAccTouched(t => ({ ...t, answer: true }))}
              />
              {!answerValid && accTouched.answer && (
                <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Please enter your answer</div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button
                type="button"
                style={{
                  background: '#fff',
                  color: '#333',
                  border: '1.5px solid #eaeaea',
                  height: 48,
                  borderRadius: 6,
                  padding: '12px 32px',
                  fontWeight: 'bold',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
                onClick={() => setTab(0)}
              >
                Previous
              </button>
            <button
              type="button"
              style={{
                background: accountValid ? 'linear-gradient(90deg, #3b79ff 0%, #44c3ff 100%)' : '#eaeaea',
                color: accountValid ? '#fff' : '#aaa',
                border: 'none',
                borderRadius: 8,
                padding: '14px 40px',
                fontWeight: 700,
                fontSize: 17,
                cursor: accountValid ? 'pointer' : 'not-allowed',
                letterSpacing: 1,
                boxShadow: accountValid ? '0 2px 8px #3b79ff44' : 'none',
                transition: 'background 0.2s',
              }}
              disabled={!accountValid}
              onClick={() => accountValid && setTab(2)}
            >
              Next
            </button>
            </div>
          </form>
        )}
        {tab === 2 && (
          <form style={{
            maxWidth: 440,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            background: "#f6faff",
            borderRadius: 10,
            padding: "24px 28px",
            boxShadow: "0 2px 8px #eaf3ff44",
            border: "1px solid #eaeaea",
          }} autoComplete="off">
            <div style={{ fontWeight: 700, fontSize: 16, color: '#3b79ff', marginBottom: 6 }}>Address Information</div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={address.streetName}
                  placeholder="Street Name"
                  style={{
                    width: "75%",
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${addrTouched.streetName ? (streetNameValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAddress(a => ({ ...a, streetName: e.target.value }))}
                  onBlur={() => setAddrTouched(t => ({ ...t, streetName: true }))}
                />
                {!streetNameValid && addrTouched.streetName && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Required</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={address.streetNumber}
                  placeholder="Street Number"
                  style={{
                    width: "75%",
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${addrTouched.streetNumber ? (streetNumberValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAddress(a => ({ ...a, streetNumber: e.target.value }))}
                  onBlur={() => setAddrTouched(t => ({ ...t, streetNumber: true }))}
                />
                {!streetNumberValid && addrTouched.streetNumber && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Required</div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={address.city}
                  placeholder="City"
                  style={{
                    width: "75%",
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${addrTouched.city ? (cityValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                  onBlur={() => setAddrTouched(t => ({ ...t, city: true }))}
                />
                {!cityValid && addrTouched.city && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Required</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={address.country}
                  style={{
                    width: "75%",
                    padding: "12px",
                    borderRadius: 6,
                    border: `1.5px solid ${addrTouched.country ? (countryValid ? '#2ecc71' : '#e74c3c') : '#eaeaea'}`,
                    background: "#f6faff",
                  }}
                  onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
                  onBlur={() => setAddrTouched(t => ({ ...t, country: true }))}
                >
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Korea">Korea</option>
                  <option value="Italy">Italy</option>
                  <option value="USA">USA</option>
                  <option value="Japan">Japan</option>
                  <option value="France">France</option>
                </select>
                {!countryValid && addrTouched.country && (
                  <div style={{ color: '#e74c3c', fontSize: 13, marginTop: 2 }}>Required</div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button
                type="button"
                style={{
                  background: '#fff',
                  color: '#333',
                  border: '1.5px solid #eaeaea',
                  borderRadius: 8,
                  padding: '14px 32px',
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: 'pointer',
                  letterSpacing: 1,
                }}
                onClick={() => setTab(1)}
              >
                Previous
              </button>
              <button
                type="button"
                style={{
                  background: addressValid ? 'linear-gradient(90deg, #3b79ff 0%, #44c3ff 100%)' : '#eaeaea',
                  color: addressValid ? '#fff' : '#aaa',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px 32px',
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: addressValid ? 'pointer' : 'not-allowed',
                  letterSpacing: 1,
                  boxShadow: addressValid ? '0 2px 8px #3b79ff44' : 'none',
                  transition: 'background 0.2s',
                }}
                disabled={!addressValid}
                onClick={() => {
                  if (addressValid) {
                    setShowProfile(true);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2500);
                  }
                }}
              >
                Finish
              </button>
            </div>
          </form>
        )}
      {/* Profile Modal */}
      {showProfile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f6faff 0%, #eaf3ff 100%)',
            borderRadius: 18,
            padding: '40px 48px',
            minWidth: 440,
            maxWidth: 520,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            position: 'relative',
            border: '1.5px solid #eaeaea',
          }}>
            <h2 style={{
              textAlign: 'center',
              fontWeight: 800,
              marginBottom: 32,
              fontSize: 28,
              letterSpacing: 1,
              color: '#3b79ff',
              textShadow: '0 2px 8px #eaf3ff',
            }}>Your Profile</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32 }}>
              <div style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                border: '3px solid #3b79ff33',
                boxShadow: '0 2px 12px #3b79ff22',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                overflow: 'hidden',
              }}>
                {about.picture ? (
                  <img src={about.picture} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#bbb" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" stroke="#bbb" strokeWidth="2"/></svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: '#3b79ff' }}>About</div>
                <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>First Name:</span> {about.firstName}</div>
                <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Last Name:</span> {about.lastName}</div>
                <div style={{ fontSize: 16 }}><span style={{ fontWeight: 600 }}>Email:</span> {about.email}</div>
              </div>
            </div>
            <div style={{
              background: '#f6faff',
              borderRadius: 10,
              padding: '18px 24px',
              marginBottom: 18,
              boxShadow: '0 2px 8px #eaf3ff44',
              border: '1px solid #eaeaea',
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: '#3b79ff' }}>Account</div>
              <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>User name:</span> {account.username}</div>
              <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Secret question:</span> {(() => {
                switch(account.question) {
                  case 'pet': return 'What is your first pet’s name?';
                  case 'mother': return 'What is your mother’s maiden name?';
                  case 'city': return 'In which city were you born?';
                  case 'teacher': return 'Who was your favorite teacher?';
                  default: return '';
                }
              })()}</div>
              <div style={{ fontSize: 16 }}><span style={{ fontWeight: 600 }}>Answer:</span> {account.answer}</div>
            </div>
            <div style={{
              background: '#f6faff',
              borderRadius: 10,
              padding: '18px 24px',
              boxShadow: '0 2px 8px #eaf3ff44',
              border: '1px solid #eaeaea',
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: '#3b79ff' }}>Address</div>
              <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Street Name:</span> {address.streetName}</div>
              <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Street Number:</span> {address.streetNumber}</div>
              <div style={{ fontSize: 16, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>City:</span> {address.city}</div>
              <div style={{ fontSize: 16 }}><span style={{ fontWeight: 600 }}>Country:</span> {address.country}</div>
            </div>
            <button
              type="button"
              style={{
                marginTop: 36,
                background: 'linear-gradient(90deg, #3b79ff 0%, #44c3ff 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '14px 40px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                float: 'right',
                boxShadow: '0 2px 8px #3b79ff44',
                letterSpacing: 1,
                transition: 'background 0.2s',
              }}
              onClick={() => { setShowProfile(false); onClose(); }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Toast message */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: '#3b79ffff',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: 8,
          fontWeight: 'bold',
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(44,204,113,0.15)',
          zIndex: 3000,
        }}>
          Submitted successfully!
        </div>
      )}
    </div>
    </div>
  );
}

export default BuildProfileModal;
