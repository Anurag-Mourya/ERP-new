import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown05 = ({ label, options, value, onChange, name, defaultOption }) => {
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

  const handleSelect = (account) => {
    onChange({ target: { name, value: account.id } });
    setIsOpen(false);
    setSearchTerm(''); // Reset search term on select
  };

  const filteredOptions = searchTerm.length === 0 ? options : options.filter(account =>
    account.account_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div ref={dropdownRef} className="customdropdownx12s86">
      <div onClick={() => setIsOpen(!isOpen)} className="dropdown-selected">
        {value ? options.find(account => account.id === value)?.account_name : defaultOption}

        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            {filteredOptions.map(account => (
              <div key={account.id} onClick={() => handleSelect(account)} className="dropdown-option">
                {account.account_name}
              </div>
            ))}
            {filteredOptions.length === 0 && <div className="dropdown-option">No options found</div>}
          </div>
        </div>
      )}
    </div>
  );
};


export default CustomDropdown05
