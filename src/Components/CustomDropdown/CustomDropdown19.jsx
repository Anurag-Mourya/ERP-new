import React, { useState, useRef, useEffect } from 'react';
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../Views/Helper/PopupData';

const CustomDropdown19 = ({ label, options, value, onChange, name, defaultOption, setBasicDetailsDisplayName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleSelect = (option) => {
    // onChange({ target: { name, value: option.type } });
    // console.log("options", option)

    setBasicDetailsDisplayName(
      {
        // ...basicDetails,
        display_name: option
      }
    )
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <>
      <div ref={dropdownRef}>

        <input style={{ width: "100%" }} type="text" name="display_name"
          value={value}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Display Name"
          autoFill="off"
          onChange={onChange}
        />

        <div className="customdropdownx12s86">
          {isOpen && (
            <div className="dropdown-options">

              <div className="dropdownoptoscroll">
                {options.map(option => (
                  <div key={option.id} onClick={() => handleSelect(option)} className={"dropdown-option" + (option.id === value ? " selectedoption" : "") + (option.active == 0 ? " inactive-option" : "")}>
                    {option}
                  </div>
                ))}
              </div>


            </div>
          )}
        </div>
      </div >
    </>
  );
};

export default CustomDropdown19;
