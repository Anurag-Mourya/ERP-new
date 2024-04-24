import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CustomerContactDetail = ({ setUserData, updateUserData }) => {
    const { masterData } = useSelector(state => state?.masterData);
    console.log("masterData", masterData);

    const [contactPersons, setContactPersons] = useState(() => {
        const savedContactPersons = localStorage.getItem('contactPersons');
        return savedContactPersons ? JSON.parse(savedContactPersons) : [
            {
                salutation: '',
                first_name: '',
                last_name: '',
                mobile_no: '',
                work_phone: '',
                email: '',
            }
        ];
    });

    const handleChange = (fieldName, index, value) => {
        const updatedContactPersons = [...contactPersons];
        updatedContactPersons[index] = {
            ...updatedContactPersons[index],
            [fieldName]: value,
        };
        setContactPersons(updatedContactPersons);
        setUserData(prevUserData => ({
            ...prevUserData,
            contact_persons: updatedContactPersons,
        }));
        updateUserData({ contact_persons: updatedContactPersons });
    };

    const addContactPerson = () => {
        setContactPersons(prevContactPersons => [
            ...prevContactPersons,
            {
                salutation: '',
                first_name: '',
                last_name: '',
                mobile_no: '',
                work_phone: '',
                email: '',
            }
        ]);
    };

    useEffect(() => {
        // Save contactPersons to local storage whenever it changes
        localStorage.setItem('contactPersons', JSON.stringify(contactPersons));

        // Set up event listener to remove data from local storage when leaving the page
        const handleBeforeUnload = () => {
            localStorage.removeItem('contactPersons');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [contactPersons]);
    return (
        <>
            {contactPersons?.map((person, index) => (
                <div key={index}>
                    <h3>Contact Person {index + 1}</h3>

                    <div id="secondx2_customer">
                        <div id="main_forms_desigin_cus">
                            <div className="form-group">
                                <label className='color_red'>Email*</label>
                                <span>
                                    <input
                                        type="email"
                                        value={person.email}
                                        onChange={(e) => handleChange('email', index, e.target.value)}
                                        placeholder='Email'
                                        name='email'
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <label className='color_red'>Person Contact Details*</label>
                                <div id="inputx12">
                                    <span>
                                        <select
                                            name="salutation"
                                            value={person.salutation}
                                            onChange={(e) => handleChange('salutation', index, e.target.value)}
                                            style={{ width: "150px" }}
                                        >
                                            <option value="">Salutation</option>
                                            {masterData?.map(type => {
                                                if (type?.type === "4") {
                                                    return (
                                                        <option key={type.labelid} value={type.label}>{type.label}</option>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </select>
                                    </span>
                                    <span>
                                        <input
                                            value={person.first_name}
                                            onChange={(e) => handleChange('first_name', index, e.target.value)}
                                            placeholder='First name'
                                            name='first_name'
                                        />
                                    </span>
                                    <span>
                                        <input
                                            value={person.last_name}
                                            onChange={(e) => handleChange('last_name', index, e.target.value)}
                                            placeholder='Last name'
                                            name='last_name'
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="secondx2_customer">
                        <div id="main_forms_desigin_cus">
                            <div className="form-group">
                                <label className='color_red'>Mobile no*</label>
                                <span>
                                    <input
                                        type="number"
                                        value={person.mobile_no}
                                        onChange={(e) => handleChange('mobile_no', index, e.target.value)}
                                        placeholder='Enter mobile no.'
                                        name='mobile_no'
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <label className='color_red'>Work Phone*</label>
                                <div id="inputx12">
                                    <span>
                                        <input
                                            type="number"
                                            value={person.work_phone}
                                            onChange={(e) => handleChange('work_phone', index, e.target.value)}
                                            placeholder='Enter work phone'
                                            name='work_phone'
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addContactPerson}>Add Contact Person</button>
        </>
    );
};

export default CustomerContactDetail;
