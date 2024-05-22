import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown16 = ({ options, value, onChange, name, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

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
    onChange({ target: { name, value: option.id } }); // Change here to pass option.id
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = searchTerm.length === 0 ? options : options?.filter(option =>
    option?.account_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="customdropdownx12s86">
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options?.find(account => account?.id === value)?.account_name : defaultOption}
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
              <div key={option.id} onClick={() => handleSelect(option)} className={"dropdown-option" + (option.id === value ? " selectedoption" : "")}>
                {option.account_name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown16;
