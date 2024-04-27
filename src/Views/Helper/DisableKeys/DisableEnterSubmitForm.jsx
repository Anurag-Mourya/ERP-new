import React, { useEffect, useRef } from 'react';

const DisableEnterSubmitForm = ({ onSubmit, children }) => {
    const formRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        };

        const currentFormRef = formRef.current;
        if (currentFormRef) {
            currentFormRef.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (currentFormRef) {
                currentFormRef.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default DisableEnterSubmitForm;
