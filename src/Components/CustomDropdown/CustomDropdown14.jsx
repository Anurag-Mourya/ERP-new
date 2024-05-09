import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown14 = ({ options, value, onChange, name, defaultOption, customerName }) => {
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
    onChange({ target: { name, value: option } });  // using `labelid` as the value
    setIsOpen(false);
    setSearchTerm(''); // Reset search term on select
  };

  const filteredOptions = searchTerm.length === 0 ? options : options?.filter(option =>
    Object.values(option).some(value =>
      typeof value === 'string' &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div ref={dropdownRef} className="customdropdownx12s86">
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {value ? options?.find(account => account?.tax_percentge === value)?.tax_percentge : defaultOption}
      </div>
      {/* {isOpen && ( */}
      <div className="dropdown-options">
        <input
          type="text"
          placeholder="Search address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dropdown-search"
        />
        <div className="dropdownoptoscroll">
          {filteredOptions?.map(option => (
            <div key={option.id} onClick={() => handleSelect(option)}
              className={"dropdown-option" + (option?.id === value?.id ? " selectedoption" : "")}
            >
              <p className='dex1s2schilds2'>Customer Name: {customerName} </p>
              <p>  Street1: {option?.street_1}  </p>
              <p>  Street 2: {option?.street_2}  </p>
              <p>  Landmark: {option?.landmark ? option?.landmark : "No landmark"}  </p>
              <p>  Locality: {option?.locality ? option?.locality : "No locality"}  </p>
              <p>  House No: {option?.house_no ? option?.house_no : "No house_no"}  </p>
              <p>  Fax Number: {option?.fax_no ? option?.fax_no : "No fax_no"}  </p>
              <p>  Phone:  {option?.phone_no ? option?.phone_no : "No phone_no"}  </p>
            </div>


          ))}
          {filteredOptions?.length === 0 && <div className="dropdown-option">No options found</div>}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default CustomDropdown14;