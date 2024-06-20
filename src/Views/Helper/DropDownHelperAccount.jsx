import { useState, useRef, useEffect } from 'react';
import useOutsideClick from './PopupData';

const DropDownHelperAccount = (options, onChange, name, type) => {
    const optionRefs = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const handleSelect = (option) => {
        onChange({ target: { name, value: option.labelid } });
        setIsOpen(false);
        setSearchTerm('');
        setFocusedOptionIndex(-1);
    };

    const filteredOptions = options.filter(option =>
        option.account_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    const groupedOptions = filteredOptions.reduce((acc, option) => {
        const accountType = option.account_type;
        if (!acc[accountType]) {
            acc[accountType] = [];
        }
        acc[accountType].push(option);
        return acc;
    }, {});

    const allOptions = Object.keys(groupedOptions).reduce((acc, accountType) => {
        acc.push({ account_type: accountType, isHeading: true });
        acc.push(...groupedOptions[accountType]);
        return acc;
    }, []);

    useEffect(() => {
        optionRefs.current = allOptions.map(() => null);
    }, [allOptions]);

    const handleKeyDown = (e) => {
        if (isOpen) {
            switch (e.key) {
                case 'ArrowDown':
                    setFocusedOptionIndex((prevIndex) => {
                        let nextIndex = prevIndex + 1;
                        while (nextIndex < allOptions.length && allOptions[nextIndex].isHeading) {
                            nextIndex++;
                        }
                        if (nextIndex >= allOptions.length) {
                            nextIndex = 0;
                            while (nextIndex < allOptions.length && allOptions[nextIndex].isHeading) {
                                nextIndex++;
                            }
                        }
                        scrollToOption(nextIndex);

                        return nextIndex;
                    });
                    break;
                case 'ArrowUp':
                    setFocusedOptionIndex((prevIndex) => {
                        let nextIndex = prevIndex - 1;
                        while (nextIndex >= 0 && allOptions[nextIndex].isHeading) {
                            nextIndex--;
                        }
                        if (nextIndex < 0) {
                            nextIndex = allOptions.length - 1;
                            while (nextIndex >= 0 && allOptions[nextIndex].isHeading) {
                                nextIndex--;
                            }
                        }
                        scrollToOption(nextIndex);
                        return nextIndex;
                    });
                    break;
                case 'Enter':
                    if (focusedOptionIndex >= 0 && !allOptions[focusedOptionIndex].isHeading) {
                        handleSelect(allOptions[focusedOptionIndex]);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const scrollToOption = (index) => {
        const optionRef = optionRefs.current[index];
        if (optionRef) {
            const dropdown = dropdownRef.current;
            const optionTop = optionRef.offsetTop;
            const optionBottom = optionTop + optionRef.offsetHeight;
            const dropdownScrollTop = dropdown.scrollTop;
            const dropdownHeight = dropdown.clientHeight;

            if (optionBottom > dropdownScrollTop + dropdownHeight) {
                // Scroll down
                dropdown.scrollTop = optionBottom - dropdownHeight;
            } else if (optionTop < dropdownScrollTop) {
                // Scroll up
                dropdown.scrollTop = optionTop;
            }
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
        allOptions,
        handleKeyDown,
        handleSelect,
    };
};

export default DropDownHelperAccount;
