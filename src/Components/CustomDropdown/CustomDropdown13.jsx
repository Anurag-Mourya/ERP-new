import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropDownHelper from '../../Views/Helper/DropDownHelper';

const CustomDropdown13 = ({ options, value, onChange, name, type, defaultOption }) => {

  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    filteredOptions,
    handleKeyDown,
    handleSelect,
    focusedOptionIndex
  } = DropDownHelper(options, onChange, name, type);



  // const handleSelect = (option) => {
  //   onChange({ target: { name, value: option?.tax_percentge } });  // using `labelid` as the value
  //   setIsOpen(false);
  //   setSearchTerm(''); // Reset search term on select
  // };


  return (
    <div ref={dropdownRef} className="customdropdownx12s86" tabIndex="0" onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options?.find(account => account?.tax_percentge === value)?.tax_percentge : defaultOption}
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
          <div className="dropdownoptoscroll">
            {filteredOptions?.map((option, index) => (
              <div key={option.id}
                onClick={() => handleSelect(option)}
                ref={(el) => (optionRefs.current[index] = el)}
                className={
                  "dropdown-option" +
                  (option.tax_percentge === value ? " selectedoption" : "") +
                  (index === focusedOptionIndex ? " focusedoption" : "")
                }
              >
                {option.tax_percentge}
              </div>
            ))}
            {filteredOptions.length === 0 &&
              <>
                <div className="notdatafound02">
                  <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe>
                </div>
                <div className="dropdown-option centeraligntext">No options found</div>
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown13;