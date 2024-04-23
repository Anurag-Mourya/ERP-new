import React, { useState } from 'react';

const CustomerContactDetail = ({ userData, setUserData, updateUserData, handleDropdownChange, salutations }) => {
    const [contactPersons, setContactPersons] = useState([
        {
            salutation: '',
            first_name: '',
            last_name: '',
            mobile_no: '',
            work_phone: '',
            email: '',
        }
    ]);

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

        updateUserData({ contact_persons: contactPersons });
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

    console.log("contactPersons", contactPersons)
    return (
        <>
            {contactPersons?.map((person, index) => (
                <div key={index}>
                    <h3>Contact Person {index + 1}</h3>
                    <label>
                        Salutation:
                        {/* Add your CustomDropdown component here */}
                    </label>
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
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <label className='color_red'>Person Contact Details*</label>
                                <div id="inputx12">
                                    <span>
                                        <input
                                            type="input"
                                            name="purchase_price"
                                            placeholder="Salutation"
                                            value={person.salutation}
                                            onChange={(e) => handleChange('salutation', index, e.target.value)}
                                        />
                                    </span>
                                    <span>
                                        <input
                                            value={person.first_name}
                                            onChange={(e) => handleChange('first_name', index, e.target.value)}
                                            placeholder='First name'
                                        />
                                    </span>
                                    <span>
                                        <input
                                            value={person.last_name}
                                            onChange={(e) => handleChange('last_name', index, e.target.value)}
                                            placeholder='Last name'
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
