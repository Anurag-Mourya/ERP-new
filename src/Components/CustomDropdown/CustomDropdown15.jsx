import React from 'react';
import DropDownHelperAccount from '../../Views/Helper/DropDownHelperAccount';

const CustomDropdown15 = ({ options, value, type, onChange, name, defaultOption }) => {
  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    allOptions,
    handleKeyDown,
    handleSelect,
    focusedOptionIndex
  } = DropDownHelperAccount(options, onChange, name, type);

  return (
    <div ref={dropdownRef} tabIndex="0" className="customdropdownx12s86" onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {name === "paid_by" || name === "payment_mode" || name === "sale_acc_id" || name === "purchase_acc_id" || name === "account_id" ?
          <> {value ? options?.find(account => account?.id === value)?.account_name : defaultOption}</>
          :
          <> {value ? options?.find(account => account?.account_name === value)?.account_name : defaultOption}</>}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
            autoFocus
            ref={inputRef}
          />
          <div className="dropdownoptoscrollxxx">
            {allOptions.map((option, index) => (
              option.isHeading ? (
                <div key={index} className="account-typename4">
                  {option.account_type}
                </div>
              ) : (
                <div
                  key={option.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={"dropdown-option" +
                    (option.id === value ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")
                  }
                  onClick={() => handleSelect(option)}
                >
                  {option.account_name}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown15;
