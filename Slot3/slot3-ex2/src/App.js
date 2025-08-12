import React, { useState, useMemo } from 'react';
import './App.css';
import { persons } from './person';

const allSkills = Array.from(new Set(persons.flatMap(p => p.skills)));

function multiSort(list, sortOrder) {
  return [...list].sort((a, b) => {
    const firstNameCompare = sortOrder === 'asc'
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName);
    if (firstNameCompare !== 0) return firstNameCompare;
    if (b.isActive - a.isActive !== 0) return b.isActive - a.isActive;
    if (a.age - b.age !== 0) return a.age - b.age;
    return a.lastName.localeCompare(b.lastName);
  });
}

function getSkillRanking(persons) {
  const freq = persons.reduce((acc, p) => {
    p.skills.forEach(skill => acc[skill] = (acc[skill] || 0) + 1);
    return acc;
  }, {});
  return Object.entries(freq).sort((a, b) => b[1] - a[1]);
}

function getStatistics(persons) {
  const total = persons.length;
  const avgAge = total ? (persons.reduce((sum, p) => sum + p.age, 0) / total).toFixed(1) : 0;
  const activeCount = persons.filter(p => p.isActive).length;
  return { total, avgAge, activeCount };
}

function App() {
  const [sortOrder, setSortOrder] = useState('asc');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [skill, setSkill] = useState('');
  const [search, setSearch] = useState('');

  const processedPersons = useMemo(() => {
    return multiSort(
      persons.filter(({ age, skills, firstName, lastName }) => {
        const min = minAge ? Number(minAge) : -Infinity;
        const max = maxAge ? Number(maxAge) : Infinity;
        const nameMatch = (firstName + ' ' + lastName).toLowerCase().includes(search.toLowerCase());
        const skillMatch = skill ? skills.includes(skill) : true;
        return age >= min && age <= max && nameMatch && skillMatch;
      }),
      sortOrder
    );
  }, [sortOrder, minAge, maxAge, skill, search]);

  const skillRanking = useMemo(() => getSkillRanking(processedPersons), [processedPersons]);
  const statistics = useMemo(() => getStatistics(processedPersons), [processedPersons]);

  return (
    <div className="container">
      <h2 className="main-title">Person Management System</h2>
      <div className="controls">
        <button
          className="sort-btn"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
        <input
          className="input"
          type="number"
          placeholder="Min age"
          value={minAge}
          onChange={e => setMinAge(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Max age"
          value={maxAge}
          onChange={e => setMaxAge(e.target.value)}
        />
        <select className="input" value={skill} onChange={e => setSkill(e.target.value)}>
          <option value="">All skills</option>
          {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          className="input"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="tables-row">
        <div className="table-wrapper" style={{ flex: 3 }}>
          <table className="person-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Skills</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {processedPersons.length ? processedPersons.map(({ id, firstName, lastName, age, city, skills, isActive }) => (
                <tr key={id}>
                  <td>{firstName} {lastName}</td>
                  <td>{age}</td>
                  <td>{city}</td>
                  <td>
                    {skills.map((sk, idx) => (
                      <span key={sk} className="skill-badge" style={{ background: '#e0f7fa', color: '#00796b', marginRight: 4 }}>
                        {sk}
                        {idx < skills.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </td>
                  <td>
                    <span className={isActive ? "active-badge" : "inactive-badge"}>
                      {isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#e53935', fontWeight: 'bold' }}>No found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="statistics-box">
            <b>Statistics</b><br />
            <span>Total persons: <span className="stat-value">{statistics.total}</span></span><br />
            <span>Average age: <span className="stat-value">{statistics.avgAge}</span></span><br />
            <span>Active persons: <span className="stat-value">{statistics.activeCount}</span></span>
          </div>
        </div>
        <div className="table-wrapper" style={{ flex: 1, maxWidth: 260 }}>
          <h3 className="skill-title">Skill Ranking</h3>
          <table className="skill-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {skillRanking.map(([skill, count], idx) => (
                <tr key={skill} className={idx === 0 ? "top-skill-row" : ""}>
                  <td>{skill}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
