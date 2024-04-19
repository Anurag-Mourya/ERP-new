import DropdownLogic from './DropdownLogic'; // Adjust the import path as needed

const CustomeDropdown2 = ({ isOpen, onclose, onSelect, dropDownContent }) => {
    const { dropdownRef, handleSelect } = DropdownLogic({ isOpen, onclose, onSelect });

    return (
        <div ref={dropdownRef} id='drop_down_positon'>
            <div className="drop_down_content">
                {dropDownContent?.map((val) => (
                    <div key={val?.id} onClick={() => handleSelect(val)}>{val.expense_name ? val.expense_name : val}</div>
                ))}
            </div>
        </div>
    );
};

export default CustomeDropdown2;