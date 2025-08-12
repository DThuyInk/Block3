import React, { useState, useMemo } from 'react';
import './App.css';
import { persons } from './person';

const allSkills = Array.from(new Set(persons.flatMap(p => p.skills)));

function sortPersons(list, order) {
  return [...list].sort((a, b) => {
    if (order === 'asc') return a.firstName.localeCompare(b.firstName);
    else return b.firstName.localeCompare(a.firstName);
  });
}

function multiSort(list) {
  return [...list].sort((a, b) => {
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
  const arr = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return arr;
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

  const sortedPersons = useMemo(() => sortPersons(persons, sortOrder), [sortOrder]);
  const filteredPersons = useMemo(() => {
    return persons.filter(({ age, skills }) => {
      const min = minAge ? Number(minAge) : -Infinity;
      const max = maxAge ? Number(maxAge) : Infinity;
      return age >= min && age <= max && (skill ? skills.includes(skill) : true);
    });
  }, [minAge, maxAge, skill]);
  const skillRanking = useMemo(() => getSkillRanking(persons), []);
  const searchedPersons = useMemo(() => {
    const filtered = persons.filter(({ firstName, lastName }) =>
      (firstName + ' ' + lastName).toLowerCase().includes(search.toLowerCase())
    );
    return multiSort(filtered);
  }, [search]);
  const statistics = useMemo(() => getStatistics(searchedPersons), [searchedPersons]);

  return (
    <div style={{ padding: 20 }}>
      {/* 1. Sort firstName */}
      <h2>Person List</h2>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
      </button>
      <ul>
        {sortedPersons.map(({ id, firstName, lastName, age, city, skills }) => (
          <li key={id}>
            <b>{firstName} {lastName}</b> - Age: {age} - City: {city} - Skills: {skills.join(', ')}
          </li>
        ))}
      </ul>

      {/* 2. Lọc theo tuổi và skill */}
      <h2>Filter by Age & Skill</h2>
      <input
        type="number"
        placeholder="Min age"
        value={minAge}
        onChange={e => setMinAge(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="number"
        placeholder="Max age"
        value={maxAge}
        onChange={e => setMaxAge(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <select value={skill} onChange={e => setSkill(e.target.value)}>
        <option value="">All skills</option>
        {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <ul>
        {filteredPersons.length ? filteredPersons.map(({ id, firstName, lastName, skills }) => (
          <li key={id}>
            {firstName} – {lastName} – {skills.join(', ')}
          </li>
        )) : <li>No found.</li>}
      </ul>

      {/* 3. Bảng xếp hạng skill */}
      <h2>Skill Ranking</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {skillRanking.map(([skill, count], idx) => (
            <tr key={skill}>
              <td style={idx === 0 ? { fontWeight: 'bold' } : {}}>{skill}</td>
              <td style={idx === 0 ? { fontWeight: 'bold' } : {}}>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 4. Tìm kiếm và sort đa tiêu chí */}
      <h2>Multi-criteria Search & Sort</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <ul>
        {searchedPersons.map(({ id, firstName, lastName, age, isActive }) => (
          <li key={id}>
            {firstName} {lastName} - Age: {age} - Active: {isActive ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
      <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>
        <b>Statistics</b><br />
        Total persons: {statistics.total}<br />
        Average age: {statistics.avgAge}<br />
        Active persons: {statistics.activeCount}
      </div>
    </div>
  );
}

export default App;
