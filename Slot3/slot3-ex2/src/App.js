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
    <div style={{ padding: 20 }}>
      <h2>Person Table & Skill Ranking</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
        <input
          type="number"
          placeholder="Min age"
          value={minAge}
          onChange={e => setMinAge(e.target.value)}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="Max age"
          value={maxAge}
          onChange={e => setMaxAge(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select value={skill} onChange={e => setSkill(e.target.value)} style={{ marginRight: 8 }}>
          <option value="">All skills</option>
          {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: 16 }}>
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
                  <td>{skills.join(', ')}</td>
                  <td>{isActive ? 'Yes' : 'No'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>No found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div style={{ marginBottom: 16 }}>
            <b>Statistics</b><br />
            Total persons: {statistics.total}<br />
            Average age: {statistics.avgAge}<br />
            Active persons: {statistics.activeCount}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Skill Ranking</h3>
          <table border="1" cellPadding="6" style={{ width: '100%' }}>
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
        </div>
      </div>
    </div>
  );
}

export default App;
