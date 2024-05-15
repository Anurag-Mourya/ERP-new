import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomDropdown15 = ({ options, value, onChange, name, defaultOption }) => {
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
  let filteredOptions = [];

  if (name === "account_type") {
    // Display all account types as headings and ensure each account type is only displayed once
    const uniqueAccountTypes = [...new Set(options?.map(account => account.account_type_formated))];
    filteredOptions = uniqueAccountTypes.map(accountType => ({
      account_type_formated: accountType,
      accounts: options.filter(account => account.account_type_formated === accountType)
    }));
    console.log("uniqueAccountTypes", filteredOptions)
  }
  return (
    <div ref={dropdownRef} className="customdropdownx12s86">
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options?.find(account => account?.account_type === value)?.account_type : defaultOption}
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
            {name === "account_type" && (
              filteredOptions.map(accountType => (
                <div key={accountType.account_type_formated} className="">

                  <div className="account-typename4">
                    {accountType.account_type_formated}
                  </div>

                  {accountType.accounts.map(account => (
                    <div key={account.id} onClick={() => handleSelect(account)} className={"dropdown-option" + (account.id === value ? " selectedoption" : "")}>
                      {account.account_type}
                    </div>
                  ))}
                </div>
              ))
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default CustomDropdown15;
