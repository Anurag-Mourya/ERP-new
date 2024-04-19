import { useEffect, useRef } from 'react';

const DropdownLogic = ({ isOpen, onclose, onSelect }) => {
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onclose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onclose]);

    const handleSelect = (value) => {
        onSelect(value);
        onclose(); // Close the dropdown after selection if needed
    };

    return { dropdownRef, handleSelect };
};

export default DropdownLogic;