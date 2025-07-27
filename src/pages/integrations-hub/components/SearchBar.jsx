import React from 'react';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search integrations..." }) => {
  return (
    <div className="mb-6">
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default SearchBar;