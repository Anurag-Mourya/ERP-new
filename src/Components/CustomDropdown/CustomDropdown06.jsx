import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useOutsideClick from "../../Views/Helper/PopupData";

const CustomDropdown06 = ({ label, options, value, onChange, name, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionRefs = useRef([]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };


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
    setFocusedOptionIndex(-1);
    dropdownRef.current.focus();
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

  const handleKeyDown = (e) => {
    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          setFocusedOptionIndex((prevIndex) => {
            let nextIndex = prevIndex;
            do {
              nextIndex = nextIndex < filteredOptions.length - 1 ? nextIndex + 1 : 0;
            } while (filteredOptions[nextIndex]?.active === "0" && nextIndex !== prevIndex);
            optionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          setFocusedOptionIndex((prevIndex) => {
            let nextIndex = prevIndex;
            do {
              nextIndex = nextIndex > 0 ? nextIndex - 1 : filteredOptions.length - 1;
            } while (filteredOptions[nextIndex]?.active === "0" && nextIndex !== prevIndex);
            optionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return nextIndex;
          });
          break;
        case 'Enter':
          if (focusedOptionIndex >= 0 && filteredOptions[focusedOptionIndex]?.active !== "0") {
            handleSelect(filteredOptions[focusedOptionIndex]);
          }
          break;
        case 'Tab':
          setIsOpen(false);
          break;
        default:
          break;
      }
    } else if (e.key === "ArrowDown") {
      setIsOpen(true);
    }
  };


  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setFocusedOptionIndex(-1);
    }
  }, [isOpen]);

  useOutsideClick(dropdownRef, () => setIsOpen(false));
  return (
    <>

      <div ref={dropdownRef} className="customdropdownx12s86" tabIndex="0" onKeyDown={handleKeyDown}>
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
              {filteredOptions.map((account, index) => (
                <div
                  key={account.id}
                  onClick={() => handleSelect(account)}
                  // className={`${isSelected(account?.id) ? 'selectedoption' : ''}`}
                  className={"dropdown-option" +
                    (isSelected(account?.id) ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")}

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