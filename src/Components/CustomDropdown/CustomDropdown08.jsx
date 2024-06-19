import React, { useState, useRef, useEffect } from 'react';
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';
import DropDownHelper from '../../Views/Helper/DropDownHelper';

const CustomDropdown08 = ({ options, setShowPopup, value, onChange, name, type, defaultOption }) => {
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


  return (
    <div ref={dropdownRef} className="customdropdownx12s86" onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options.find(option => option.id === value)?.name : defaultOption}
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
            {filteredOptions.map(option => (
              <div key={option.id} onClick={() => handleSelect(option)} className={"dropdown-option" + (option.id === value ? " selectedoption" : "") + (option.active == 0 ? " inactive-option" : "")}>
                {option.name}
              </div>
            ))}
          </div>
          {filteredOptions.length === 0 &&
            <>

              <div className="notdatafound02">
                <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe>
              </div>

              <div className="dropdown-option centeraligntext">No options found</div>
            </>
          }

          <div className="lastbuttonsecofdropdown"><p style={{ cursor: "pointer" }} onClick={() => setShowPopup(true)}><GoPlus />Add Sub-Category</p></div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown08;
