import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../App.css";

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const cardStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "32px 40px",
  minWidth: "420px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  position: "relative",
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
        <h2 style={{ textAlign: "center", marginBottom: 16, fontWeight: "bold" }}>BUILD YOUR PROFILE</h2>
        <div style={tabStyle}>
          <button style={tabItemStyle(tab === 0)} disabled>About</button>
          <button style={tabItemStyle(tab === 1)} disabled={tab < 1}>Account</button>
          <button style={tabItemStyle(tab === 2)} disabled={tab < 2}>Address</button>
          </div>
        {tab === 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 120, height: 120, border: "2px solid #eaeaea", borderRadius: "50%", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {about.picture ? (
                  <img src={about.picture} alt="Profile" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                ) : (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#bbb" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" stroke="#bbb" strokeWidth="2"/></svg>
                )}
              </div>
              <div style={{ fontWeight: "bold", fontSize: 14 }}>CHOOSE PICTURE</div>
            </div>
            <form style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }} autoComplete="off">
              <div>
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
                  background: aboutValid ? '#3b79ffff' : '#eaeaea',
                  color: aboutValid ? '#fff' : '#aaa',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 0',
                  fontWeight: 'bold',
                  fontSize: 16,
                  cursor: aboutValid ? 'pointer' : 'not-allowed',
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
          <form style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }} autoComplete="off">
            <div style={{ textAlign: "left" }}>
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
                background: accountValid ? '#3b79ffff' : '#eaeaea',
                color: accountValid ? '#fff' : '#aaa',
                border: 'none',
                borderRadius: 6,
                padding: '12px 40px',
                fontWeight: 'bold',
                fontSize: 16,
                cursor: accountValid ? 'pointer' : 'not-allowed',
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
          <form style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }} autoComplete="off">
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
                  borderRadius: 6,
                  padding: '12px 32px',
                  fontWeight: 'bold',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
                onClick={() => setTab(1)}
              >
                Previous
              </button>
              <button
                type="button"
                style={{
                  background: addressValid ? '#3b79ffff' : '#eaeaea',
                  color: addressValid ? '#fff' : '#aaa',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 32px',
                  fontWeight: 'bold',
                  fontSize: 16,
                  cursor: addressValid ? 'pointer' : 'not-allowed',
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
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 420, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'relative' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 24 }}>Your Profile</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6faff' }}>
                {about.picture ? (
                  <img src={about.picture} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#bbb" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" stroke="#bbb" strokeWidth="2"/></svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>About</div>
                <div>First Name: {about.firstName}</div>
                <div>Last Name: {about.lastName}</div>
                <div>Email: {about.email}</div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Account</div>
              <div>User name: {account.username}</div>
              <div>Secret question: {(() => {
                switch(account.question) {
                  case 'pet': return 'What is your first pet’s name?';
                  case 'mother': return 'What is your mother’s maiden name?';
                  case 'city': return 'In which city were you born?';
                  case 'teacher': return 'Who was your favorite teacher?';
                  default: return '';
                }
              })()}</div>
              <div>Answer: {account.answer}</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Address</div>
              <div>Street Name: {address.streetName}</div>
              <div>Street Number: {address.streetNumber}</div>
              <div>City: {address.city}</div>
              <div>Country: {address.country}</div>
            </div>
            <button
              type="button"
              style={{ marginTop: 32, background: '#3b79ffff', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 32px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', float: 'right' }}
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
