import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomDropdown20 = ({ options, value, onChange, name, defaultOption }) => {
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

    onChange({ target: { name, value: option?.account_type } });
    setIsOpen(false);
    setSearchTerm('');
  };
  // const filteredOptions = searchTerm.length === 0 ? options : options?.filter(option =>
  //   ption?.account_type?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  // );o

  const filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    option.account_type ? option.account_type.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  return (
    <div ref={dropdownRef} className="customdropdownx12s86">
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options.find(option => option.account_type === value)?.account_type : defaultOption}

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
            {
              filteredOptions?.map(accountType => (
                <div key={accountType.id} onClick={() => handleSelect(accountType)} className={"dropdown-option" + (accountType?.account_type === value ? " selectedoption" : "")}>
                  {accountType?.account_type}
                </div>


              ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomDropdown20;
