import React, { useState } from 'react'

const DeleveryAddress = () => {
    const [selectedOption, setSelectedOption] = useState('organization');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div className="f1wrapofcreqx1">
            <div className="cust_dex1s1">
                Delevery address
                <div id="radio-toggle">

                    <label htmlFor="organization">Organization</label>
                    <input
                        type="radio"
                        id="organization"
                        name="delivery-address"
                        value="organization"
                        checked={selectedOption === 'organization'}
                        onChange={handleOptionChange}
                    />

                    <label htmlFor="customer">Customer</label>
                    <input
                        type="radio"
                        id="customer"
                        name="delivery-address"
                        value="customer"
                        checked={selectedOption === 'customer'}
                        onChange={handleOptionChange}
                    />
                </div>

            </div>
        </div>
    )
}

export default DeleveryAddress