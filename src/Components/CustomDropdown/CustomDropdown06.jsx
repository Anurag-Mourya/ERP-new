import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const CustomDropdown06 = ({ label, options, value, onChange, name, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (account) => {
    const selectedItems = [...value];
    const index = selectedItems?.findIndex(item => item === account?.id);

    if (index === -1) {
      selectedItems.push(account?.id);
    } else {
      selectedItems.splice(index, 1);
    }

    onChange(selectedItems);
    setIsOpen(false);
    setSearchTerm('');
  };

  const isSelected = (accountId) => value?.includes(accountId);

  const renderSelectedOptions = () => {
    // Ensure value is always an array
    const selectedValues = Array.isArray(value) ? value : [];

    return selectedValues.map(id => {
      const selectedAccount = options?.find(account => account?.id === id);
      return (
        <div key={id} className={`selectedoption5465cds ${isOpen ? 'open' : ''}`}>
          {selectedAccount?.display_name}
          <div className="remove-option" onClick={() => handleSelect(selectedAccount)}><RxCross2 /></div>
        </div>
      );
    });
  };


  const filteredOptions = searchTerm.length === 0 ? options : options?.filter(account =>
    account.display_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  // console.log("value",value)
  // console.log("options",options)

  return (
    <>

      <div ref={dropdownRef} className="customdropdownx12s86" tabIndex="0">
        <div onClick={handleToggleDropdown} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>

          {/* {isOpen && (
          <input
            type="text"
            // placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
          />
        )} */}
          <p>Preferred Vendor</p>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            <div className="dropdownoptoscroll">
              {filteredOptions.map(account => (
                <div
                  key={account.id}
                  onClick={() => handleSelect(account)}
                  className={`dropdown-option ${isSelected(account?.id) ? 'selectedoption' : ''}`}
                >
                  {account?.display_name}
                </div>
              ))}
              {filteredOptions?.length === 0 && <div className="dropdown-option">No options found</div>}
            </div>
          </div>
        )}
        <div id="absoluteofvalselcc">
          {renderSelectedOptions()}
        </div>
      </div>
    </>
  );
};
export default CustomDropdown06;