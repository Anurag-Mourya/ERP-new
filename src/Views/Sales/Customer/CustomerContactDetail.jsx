import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";


const CustomerContactDetail = ({ setUserData, switchCusData, customerData, updateUserData }) => {
  const { masterData } = useSelector((state) => state?.masterData);
  const { isDublicate, isEdit, user } = customerData

  const [contactPersons, setContactPersons] = useState(() => {
    const savedContactPersons = sessionStorage.getItem("contactPersons");
    return savedContactPersons
      ? JSON.parse(savedContactPersons)
      : [
        {
          salutation: "",
          first_name: "",
          last_name: "",
          mobile_no: "",
          work_phone: "",
          email: "",
        },
      ];
  });

  useEffect(() => {
    if ((user?.id && isEdit || user?.id && isDublicate)) {
      setContactPersons((prevContact) =>
        user?.contact_person?.map((row) => {
          const existingRow = prevContact?.find((r) => r?.id === row?.id);
          if (existingRow) {
            // Update the existing row with new values
            return {
              ...existingRow,
              first_name: row?.first_name,
              last_name: row?.last_name,
              email: row?.email,
              mobile_no: row?.mobile_no,
              salutation: row?.salutation,
              work_phone: row?.work_phone,
              id: row?.id,
            };
          } else {
            // Add a new row if it doesn't exist
            return {
              first_name: row?.first_name,
              last_name: row?.last_name,
              email: row?.email,
              mobile_no: row?.mobile_no,
              salutation: row?.salutation,
              work_phone: row?.work_phone,
              id: row?.id,
            };
          }
        })
      );
    }
  }, [user?.contact_person]);

  const handleChange = (fieldName, index, value) => {
    const updatedContactPersons = [...contactPersons];
    updatedContactPersons[index] = {
      ...updatedContactPersons[index],
      [fieldName]: value,
    };
    setContactPersons(updatedContactPersons);
    setUserData((prevUserData) => ({
      ...prevUserData,
      contact_persons: updatedContactPersons,
    }));
    updateUserData({ contact_persons: updatedContactPersons });
  };

  const addContactPerson = () => {
    setContactPersons((prevContactPersons) => [
      ...prevContactPersons,
      {
        salutation: "",
        first_name: "",
        last_name: "",
        mobile_no: "",
        work_phone: "",
        email: "",
      },
    ]);
  };

  const deleteContactPerson = (index) => {
    const updatedContactPersons = contactPersons.filter((_, i) => i !== index);
    setContactPersons(updatedContactPersons);
    setUserData((prevUserData) => ({
      ...prevUserData,
      contact_persons: updatedContactPersons,
    }));
    updateUserData({ contact_persons: updatedContactPersons });
  };

  useEffect(() => {
    // Save contactPersons to local storage whenever it changes
    sessionStorage.setItem("contactPersons", JSON.stringify(contactPersons));

    // Set up event listener to remove data from local storage when leaving the page
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("contactPersons");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [contactPersons]);


  return (
    <>
      {switchCusData === "Contact" ?
        <div id="secondx2_customer">
          <div id="main_forms_desigin_cus">
            {contactPersons?.map((person, index) => (
              <div className="x1parenchild54" key={index}>
                <div className="iconheading">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                    <rect x="4" y="2" width="17.5" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10.59 13.7408C9.96125 14.162 8.31261 15.0221 9.31674 16.0983C9.80725 16.624 10.3536 17 11.0404 17H14.9596C15.6464 17 16.1928 16.624 16.6833 16.0983C17.6874 15.0221 16.0388 14.162 15.41 13.7408C13.9355 12.7531 12.0645 12.7531 10.59 13.7408Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M15 9C15 10.1046 14.1046 11 13 11C11.8954 11 11 10.1046 11 9C11 7.89543 11.8954 7 13 7C14.1046 7 15 7.89543 15 9Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Contact persons {index + 1}</p>
                  {index >= 1 &&
                    <AiOutlineDelete onClick={() => deleteContactPerson(index)} className="deletecust" style={{ cursor: "pointer" }} />
                  }
                </div>
                <div className="insidesectiony1">
                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Salutation</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <select
                            name="salutation"
                            value={person.salutation}
                            onChange={(e) =>
                              handleChange("salutation", index, e.target.value)
                            }
                            style={{ width: "150px" }}
                          >
                            <option value="">Salutation</option>
                            {masterData?.map((type) => {
                              if (type?.type === "4") {
                                return (
                                  <option key={type.labelid} value={type.label}>
                                    {type.label}
                                  </option>
                                );
                              }
                              return null;
                            })}
                          </select>
                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className=''>First name</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input value={person.first_name} onChange={(e) => handleChange("first_name", index, e.target.value)} placeholder="First name" name="first_name" />

                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className=''>Last name</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <input value={person.last_name} onChange={(e) => handleChange("last_name", index, e.target.value)} placeholder="Last name" name="last_name" />

                        </span>
                      </div>
                    </div>
                  </div>




                  <div id="fcx3s1parent">
                    <div className="form_commonblock">
                      <label>Email</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <input type="email" value={person.email} onChange={(e) => handleChange("email", index, e.target.value)} placeholder="Email" name="email" />

                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className=''>Mobile no</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input type="number" value={person.mobile_no} onChange={(e) => handleChange("mobile_no", index, e.target.value)} placeholder="Enter mobile no." name="mobile_no" />
                        </span>
                      </div>
                    </div>

                    <div className="form_commonblock">
                      <label className=''>Work no</label>
                      <div id="inputx1">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                            <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <input type="number" value={person.work_phone} onChange={(e) => handleChange("work_phone", index, e.target.value)} placeholder="Enter work phone" name="work_phone" />

                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="breakerci"></div>


              </div>
            ))}
          </div>

          <button onClick={addContactPerson} className="addcust" type='button'>
            Add Contact Person<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
              <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        : ""}
    </>
  );
};

export default CustomerContactDetail;
