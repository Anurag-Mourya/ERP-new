import { useState, useRef, useEffect } from 'react';
import useOutsideClick from './PopupData';

const DropDownHelper = (options, onChange, name, type) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const optionRefs = useRef([]);

    const handleSelect = (option) => {
        onChange({ target: { name, value: type === "masters" ? option.labelid : type === "taxRate" ? option?.tax_percentge : option.id } });
        setIsOpen(false);
        setSearchTerm('');
        setFocusedOptionIndex(-1);
        dropdownRef.current.focus(); // Focus back to the dropdown after selection
    };

    let filteredOptions = [];

    if (type === "categories") {
        filteredOptions = searchTerm.length === 0 ? options : options.filter(option =>
            option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    } else if (type === "masters") {
        filteredOptions = searchTerm.length === 0 ? options : options.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    } else if (type === "taxRate") {
        filteredOptions = searchTerm.length === 0 ? options : options.filter(option =>
            option?.tax_percentge?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }



    const handleKeyDown = (e) => {
        if (isOpen) {
            switch (e.key) {
                case 'ArrowDown':
                    setFocusedOptionIndex((prevIndex) => {
                        const nextIndex = prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0;
                        optionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        return nextIndex;
                    });
                    break;
                case 'ArrowUp':
                    setFocusedOptionIndex((prevIndex) => {
                        const nextIndex = prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1;
                        optionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        return nextIndex;
                    });
                    break;
                case 'Enter':
                    if (focusedOptionIndex >= 0) {
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

    return {
        isOpen,
        setIsOpen,
        searchTerm,
        setSearchTerm,
        focusedOptionIndex,
        setFocusedOptionIndex,
        dropdownRef,
        inputRef,
        optionRefs,
        filteredOptions,
        handleKeyDown,
        handleSelect,
    };
};

export default DropDownHelper;
