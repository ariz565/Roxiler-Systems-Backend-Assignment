import React from 'react';

const SearchInput = ({ value, onSearchChange }) => {
  return (
    <div> 
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onSearchChange(e.target.value)} 
        placeholder="Search by title, description, or price"
      />
    </div>
  );
};

export default SearchInput;
