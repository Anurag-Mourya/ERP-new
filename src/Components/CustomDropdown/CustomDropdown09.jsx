import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown09 = ({ label, options, value, onChange, name, defaultOption, style }) => {
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

  let filteredOptions = [];

  if (name === "account_id" || name === "to_acc") {
    // Display all account types as headings and ensure each account type is only displayed once
    const uniqueAccountTypes = [...new Set(options.map(account => account.account_type))];
    filteredOptions = uniqueAccountTypes.map(accountType => ({
      account_type: accountType,
      accounts: options.filter(account => account.account_type === accountType)
    }));
  }

  return (
    <div ref={dropdownRef} className="customdropdownx12s86" style={style}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options.find(account => account.id === value)?.account_name : defaultOption}

        {/* <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 0.751994C11.2852 0.751994 7.60274 5.75195 6.28516 5.75195C4.96749 5.75195 1.28516 0.751953 1.28516 0.751953" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> */}
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

          {/* Display account type */}
          <div className="dropdownoptoscroll">
            {
              filteredOptions.map(accountType => (
                <div key={accountType.account_type} className="">

                  <div className="account-typename4">
                    {accountType.account_type}
                  </div>

                  {accountType.accounts.map(account => (
                    <div key={account.id} onClick={() => handleSelect(account)} className={"dropdown-option" + (account.id === value ? " selectedoption" : "")}>
                      {account.account_name}
                    </div>
                  ))}
                </div>
              ))
            }

          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown09;
