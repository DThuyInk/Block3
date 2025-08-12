import React, { useState } from 'react';
import './App.css';

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
    }
  };

  // --- Company Table State ---
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [category, setCategory] = useState('All');

  // Lấy danh sách category duy nhất
  const categories = ['All', ...Array.from(new Set(companies.map(c => c.category)))];

  // Lọc theo category
  let filteredCompanies = category === 'All'
    ? companies
    : companies.filter(c => c.category === category);

  // Tìm kiếm theo tên
  if (search.trim() !== '') {
    filteredCompanies = filteredCompanies.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sắp xếp
  if (sortType === 'asc') {
    filteredCompanies = [...filteredCompanies].sort((a, b) => a.start - b.start);
  } else if (sortType === 'desc') {
    filteredCompanies = [...filteredCompanies].sort((a, b) => b.start - a.start);
  } else if (sortType === 'range') {
    filteredCompanies = [...filteredCompanies].sort((a, b) => (a.end - a.start) - (b.end - b.start));
  }

  return (
    <div className="App" style={{ padding: "40px" }}>
      {/* --- Company Table --- */}
      <h2>Company List</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search company name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={() => setSearch(search)}>Search</button>
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          style={{ marginLeft: 16, marginRight: 8 }}
        >
          <option value="asc">Năm tăng dần</option>
          <option value="desc">Năm giảm dần</option>
          <option value="range">Chọn từ Start-End</option>
        </select>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', marginBottom: 24 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No result</td>
            </tr>
          ) : (
            filteredCompanies.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
