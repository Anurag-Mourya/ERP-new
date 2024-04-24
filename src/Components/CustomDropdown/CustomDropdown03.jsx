import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown03 = ({ label, options, value, onChange, name, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.id } });
    setIsOpen(false);
    setSearchTerm(''); // Reset search term on select
  };

  const filteredOptions = searchTerm.length === 0 ? options : options.filter(option => 
    option.name ? option.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );
  
  return (
    <div ref={dropdownRef} className="customdropdownx12s86">
      <div onClick={() => setIsOpen(!isOpen)} className="dropdown-selected">
        {value ? options.find(option => option.id === value)?.name : defaultOption}

        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </div>
      {isOpen && (
        <div className="dropdown-options">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
          />
            <div className="dropdownoptoscroll">
            {filteredOptions.map(option => (
            <div key={option.id} onClick={() => handleSelect(option)} className="dropdown-option">
              {option.name}
            </div>
          ))}
            </div>
          {filteredOptions.length === 0 && <div className="dropdown-option">No options found</div>}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown03;
