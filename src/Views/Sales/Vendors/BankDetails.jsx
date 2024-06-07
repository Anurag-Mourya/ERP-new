import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";


const BankDetails = ({ setUserData, switchCusData, customerData, tick, setTick, updateUserData }) => {
  const { isDublicate, isEdit, user } = customerData

  const display_name = localStorage.getItem("display_name");

  const [bankDetails, setBankDetails] = useState([
    {
      holder_name: display_name || "Mr",
      banks_name: "",
      account_no: "",
      re_enter_account_no: "",
      ifsc_code: "",
    },
  ]);



  useEffect(() => {
    if ((user?.id && isEdit || user?.id && isDublicate)) {
      if (user?.bank_details?.length >= 1) {
        setBankDetails((prevContact) =>
          user?.bank_details?.map((row) => {
            const existingRow = prevContact?.find((r) => r?.id === row?.id);
            if (existingRow) {
              // Update the existing row with new values
              return {
                ...existingRow,
                holder_name: row?.holder_name,
                banks_name: row?.banks_name,
                account_no: row?.account_no,
                re_enter_account_no: row?.re_enter_account_no,
                ifsc_code: row?.ifsc_code,
                id: row?.id,
              };
            } else {
              // Add a new row if it doesn't exist
              return {
                holder_name: row?.holder_name,
                banks_name: row?.banks_name,
                account_no: row?.account_no,
                re_enter_account_no: row?.re_enter_account_no,
                ifsc_code: row?.ifsc_code,
                id: row?.id,
              };
            }
          })
        );
      }
    }
  }, [user?.contact_person]);

  const handleChange = (fieldName, index, value) => {
    const updatedbankDetails = [...bankDetails];
    updatedbankDetails[index] = {
      ...updatedbankDetails[index],
      [fieldName]: value,
    };
    setBankDetails(updatedbankDetails);
    setUserData((prevUserData) => ({
      ...prevUserData,
      bank_details: updatedbankDetails,
    }));
    updateUserData({ bank_details: updatedbankDetails });
  };

  const addContactPerson = () => {
    setBankDetails((prevbankDetails) => [
      ...prevbankDetails,
      {
        holder_name: "Mr.",
        banks_name: "",
        last_name: "",
        account_no: "",
        re_enter_account_no: "",
        ifsc_code: "",
      },
    ]);
  };


  //return true for set tick mark if all required fields are filled
  const setTickBankDetails = () => {
    const isBasicDetailsFilled1 =
      bankDetails[0]?.account_no !== "" &&
      bankDetails[0]?.re_enter_account_no !== "" &&
      bankDetails[0]?.re_enter_account_no === bankDetails[0]?.account_no &&
      bankDetails[0]?.banks_name !== "" &&
      bankDetails[0]?.ifsc_code !== "";

    setTick({
      ...tick,
      bankTick: isBasicDetailsFilled1,
    });

    return isBasicDetailsFilled1;
  };

  useEffect(() => {
    setTickBankDetails();
  }, [bankDetails]);

  useEffect(() => {
    updateUserData({ bank_details: bankDetails });
  }, []);

  // Handle errors for fields
  const account_noError = !(bankDetails[0]).account_no;
  const re_enter_account_noError = !bankDetails[0].re_enter_account_no || bankDetails[0]?.re_enter_account_no !== bankDetails[0]?.account_no;
  const ifsc_codeError = !bankDetails[0].ifsc_code;
  const banks_nameError = !bankDetails[0].banks_name;

  const deleteContactPerson = (index) => {
    const updatedbankDetails = bankDetails?.filter((_, i) => i !== index);
    setBankDetails(updatedbankDetails);
    setUserData((prevUserData) => ({
      ...prevUserData,
      bank_details: updatedbankDetails,
    }));
    updateUserData({ bank_details: updatedbankDetails });
  };




  return (
    <>
      {switchCusData === "Bank" ?
        <div id="secondx2_customer">
          <div id="main_forms_desigin_cus">
            {bankDetails?.map((person, index) => (
              <div className="x1parenchild54" key={index}>
                <div className="iconheading">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                    <rect x="4" y="2" width="17.5" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10.59 13.7408C9.96125 14.162 8.31261 15.0221 9.31674 16.0983C9.80725 16.624 10.3536 17 11.0404 17H14.9596C15.6464 17 16.1928 16.624 16.6833 16.0983C17.6874 15.0221 16.0388 14.162 15.41 13.7408C13.9355 12.7531 12.0645 12.7531 10.59 13.7408Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M15 9C15 10.1046 14.1046 11 13 11C11.8954 11 11 10.1046 11 9C11 7.89543 11.8954 7 13 7C14.1046 7 15 7.89543 15 9Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Bank {index + 1} details</p>
                  {index >= 1 &&
                    <AiOutlineDelete onClick={() => deleteContactPerson(index)} className="deletecust" style={{ cursor: "pointer" }} />
                  }
                </div>
                <div className="insidesectiony1">
                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Account Holder Name</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input required value={person.holder_name} onChange={(e) => handleChange("holder_name", index, e.target.value)} placeholder="Enter account holder name" name="holder_name" />
                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className=''>Bank Name</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input required value={person.banks_name} onChange={(e) => handleChange("banks_name", index, e.target.value)} placeholder="Enter bank name" name="banks_name" />

                        </span>
                      </div>
                    </div>
                    {banks_nameError && <p className="error-message">
                      {otherIcons.error_svg}
                      Please fill the bank name.</p>}


                    <div className="form_commonblock">
                      <label className=''>Account Number</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <input required value={person.account_no} type="number" onChange={(e) => handleChange("account_no", index, e.target.value)} placeholder="Enter account number" name="account_no" />

                        </span>
                      </div>


                    </div>

                  </div>
                  {account_noError && <p className="error-message">
                    {otherIcons.error_svg}
                    Please fill the account no.</p>}


                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Re-Enter Account Number</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <input required type="number" value={person.re_enter_account_no} onChange={(e) => handleChange("re_enter_account_no", index, e.target.value)} placeholder="Re-Enter account number" name="re_enter_account_no" />

                        </span>
                      </div>
                      {re_enter_account_noError && <p className="error-message">
                        {otherIcons.error_svg}
                        Please re-enter correct account no.</p>}

                    </div>

                    <div className="form_commonblock">
                      <label className=''>IFSC</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input type="text" value={person.ifsc_code} onChange={(e) => handleChange("ifsc_code", index, e.target.value)} placeholder="Enter IFSC code" name="ifsc_code" />
                        </span>
                      </div>
                      {ifsc_codeError && <p className="error-message">
                        {otherIcons.error_svg}
                        Please enter IFSC code.</p>}
                    </div>


                  </div>

                </div>

                <div className="breakerci"></div>


              </div>
            ))}
          </div>

          <button onClick={addContactPerson} className="addcust" type='button'>
            Add New Bank<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
              <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        : ""}
    </>
  );
};

export default BankDetails;
