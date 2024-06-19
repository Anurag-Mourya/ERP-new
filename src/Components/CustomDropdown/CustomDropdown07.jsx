import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown07 = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null); // State variable to hold selected value
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
    onChange(option);
    setIsOpen(false);
    setSelectedValue(option); // Store selected value in state variable
  };

  return (
    <div ref={dropdownRef} className="customdropdownx12s86" tabIndex="0">
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (selectedValue && (selectedValue.name === 'In' || selectedValue.name === 'Out') ? ' filledcolorIn' : '')}>
        {selectedValue ? selectedValue.name : 'Select Transaction Type'} {/* Display selected value or default 'Select' */}
        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {selectedValue && selectedValue.name !== 'In' && selectedValue.name !== 'Out' && <p>{label}</p>} {/* Display label only if value is not 'In' or 'Out' */}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <div className="dropdownoptoscroll">
            <div onClick={() => handleSelect({ name: 'In' })} className={"dropdown-option" + (selectedValue && selectedValue.name === 'In' ? " selectedoption" : "")}>
              In
            </div>
            <div onClick={() => handleSelect({ name: 'Out' })} className={"dropdown-option" + (selectedValue && selectedValue.name === 'Out' ? " selectedoption" : "")}>
              Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown07;
