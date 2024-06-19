// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import DropDownHelperAccount from '../../Views/Helper/DropDownHelperAccount';

// const CustomDropdown15 = ({ options, value, type, onChange, name, defaultOption }) => {
//   const {
//     isOpen,
//     setIsOpen,
//     searchTerm,
//     setSearchTerm,
//     dropdownRef,
//     inputRef,
//     optionRefs,
//     filteredOptions,
//     handleKeyDown,
//     handleSelect,
//     focusedOptionIndex
//   } = DropDownHelperAccount(options, onChange, name, type);

//   // const handleSelect = (option) => {

//   //   onChange({ target: { name, value: (name === "paid_by" || name === "payment_mode" || name === "sale_acc_id" || name === "purchase_acc_id" || name === "account_id") ? option?.id : option?.account_name } });
//   //   setIsOpen(false);
//   //   setSearchTerm('');
//   // };
//   // const filteredOptions = searchTerm.length === 0 ? options : options?.filter(option =>
//   //   ption?.account_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
//   // );o

//   // let filteredOptions = [];

//   // if (name === "account_type" || name === "payment_mode" || name === "paid_by" || name === "sale_acc_id" || name === "purchase_acc_id" || name === "account_id") {
//   //   const uniqueAccountTypes = [...new Set(options?.map(account => account.account_type))];

//   //   filteredOptions = uniqueAccountTypes?.map(accountType => ({
//   //     account_type: accountType,
//   //     accounts: options.filter(account => account.account_type === accountType)
//   //   }));
//   // }
//   return (
//     <div ref={dropdownRef} className="customdropdownx12s86" onKeyDown={handleKeyDown}>
//       <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
//         {name === "paid_by" || name === "payment_mode" || name === "sale_acc_id" || name === "purchase_acc_id" || name === "account_id" ?
//           <> {value ? options?.find(account => account?.id === value)?.account_name : defaultOption}</>
//           :
//           <> {value ? options?.find(account => account?.account_name === value)?.account_name : defaultOption}</>}
//       </div>
//       {isOpen && (
//         <div className="dropdown-options">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="dropdown-search"
//             autoFocus
//             ref={inputRef}
//           />
//           <div className="dropdownoptoscroll">
//             {filteredOptions?.map((accountType, accountTypeIndex) => (
//               <div key={accountTypeIndex}>
//                 <div className="account-typename4">{accountType.account_type}</div>
//                 {accountType?.accounts?.map((account, accountIndex) => (
//                   <div
//                     key={account.id}
//                     ref={(el) => (optionRefs.current.accountName[accountTypeIndex][accountIndex] = el)}
//                     className={
//                       "dropdown-option" +
//                       (account.id === value ? " selectedoption" : "") +
//                       (accountIndex === focusedOptionIndex ? " focusedoption" : "")
//                     }
//                     onClick={() => handleSelect(account)}
//                   >
//                     {account.account_name}
//                   </div>
//                 ))}
//               </div>
//             ))}



//           </div>
//           {filteredOptions.length === 0 &&

//             <>

//               <div className="notdatafound02">
//                 <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe>
//               </div>

//               <div className="dropdown-option centeraligntext">No options found</div>
//             </>
//           }
//         </div>
//       )}

//     </div>
//   );
// };

// export default CustomDropdown15;

import React from 'react';
import DropDownHelperAccount from '../../Views/Helper/DropDownHelperAccount';

const CustomDropdown15 = ({ options, value, type, onChange, name, defaultOption }) => {
  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    inputRef,
    optionRefs,
    allOptions,
    handleKeyDown,
    handleSelect,
    focusedOptionIndex
  } = DropDownHelperAccount(options, onChange, name, type);

  return (
    <div ref={dropdownRef} tabIndex="0" className="customdropdownx12s86" onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} className={"dropdown-selected" + (value ? ' filledcolorIn' : '')}>
        {name === "paid_by" || name === "payment_mode" || name === "sale_acc_id" || name === "purchase_acc_id" || name === "account_id" ?
          <> {value ? options?.find(account => account?.id === value)?.account_name : defaultOption}</>
          :
          <> {value ? options?.find(account => account?.account_name === value)?.account_name : defaultOption}</>}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dropdown-search"
            autoFocus
            ref={inputRef}
          />
          <div className="dropdownoptoscroll">
            {allOptions.map((option, index) => (
              option.isHeading ? (
                <div key={index} className="account-typename4">
                  {option.account_type}
                </div>
              ) : (
                <div
                  key={option.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={"dropdown-option" +
                    (option.id === value ? " selectedoption" : "") +
                    (index === focusedOptionIndex ? " focusedoption" : "")
                  }
                  onClick={() => handleSelect(option)}
                >
                  {option.account_name}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown15;
