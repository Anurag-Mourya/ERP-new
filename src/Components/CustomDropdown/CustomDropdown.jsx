import React, { useState, useEffect, useRef } from 'react';
import './customdropdown.scss';

const CustomDropdown = ({ label, options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find the label of the selected option to display
  const selectedOptionLabel = options.find(option => option.id === selectedValue)?.name || label;

  return (
    <div ref={wrapperRef} className="custom-dropdown">
      <div className="dropdown-label" onClick={() => setIsOpen(!isOpen)}>
        {selectedOptionLabel}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option.id} className="dropdown-item" onClick={() => { onChange(option.id); setIsOpen(false); }}>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
