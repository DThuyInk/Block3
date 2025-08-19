import React, { useState, useMemo } from 'react';
import { students } from '../data/students';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';

const StudentsPage = ({search, setSearch}) => {
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortType, setSortType] = useState('none');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    let result = students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      let matchAge = true;
      if (ageRange === 'lte20') matchAge = s.age <= 20;
      else if (ageRange === '21to25') matchAge = s.age >= 21 && s.age <= 25;
      else if (ageRange === 'gt25') matchAge = s.age > 25;
      let matchAvatar = true;
      if (hasAvatar) matchAvatar = !!s.avatar;
      return matchSearch && matchAge && matchAvatar;
    });
    if (sortType === 'ageAsc') result.sort((a, b) => a.age - b.age);
    else if (sortType === 'ageDesc') result.sort((a, b) => b.age - a.age);
    else if (sortType === 'nameAsc') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === 'nameDesc') result.sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [search, ageRange, hasAvatar, sortType]);

  return (
    <section id="students" style={{padding: '2rem'}}>
      <h2 style={{color: '#1976d2'}}>Danh sách sinh viên</h2>
      <div style={{display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem'}}>
        <Filters search={search} setSearch={setSearch} ageRange={ageRange} setAgeRange={setAgeRange} hasAvatar={hasAvatar} setHasAvatar={setHasAvatar} />
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>
      <StudentGrid students={filteredStudents} onViewDetails={setSelectedStudent} />
      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </section>
  );
};

export default StudentsPage;
