// src/components/MonthDropdown.js
import React from 'react';

const MonthDropdown = ({ selected, onMonthChange }) => {
  const months = ['January', 'February', /* ... */ 'December']; 

  return (
    <select value={selected} onChange={(e) => onMonthChange(e.target.value)}>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
