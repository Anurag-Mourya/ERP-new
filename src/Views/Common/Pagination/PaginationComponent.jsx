// import React, { useState } from 'react';
// import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
// import { generatePagination } from './PaginationUtils';

// const PaginationComponent = ({
//   itemList,
//   setDataChangingProp,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   setItemsPerPage,
// }) => {
//   const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     setDataChangingProp(true);
//     // Add logic to fetch data for the new page here
//   };

//   const handleItemsPerPageChange = (value) => {
//     setItemsPerPage(Number(value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//     // Add logic to fetch data for the new items per page here
//     setDataChangingProp(true);
//     setIsItemsPerPageOpen(false); // Close the dropdown after selection
//   };

//   const getTotalPages = () => Math.ceil(itemList / itemsPerPage);

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     const totalPages = getTotalPages();
//     if (currentPage < totalPages) {
//       handlePageChange(currentPage + 1);
//     }
//   };

//   const pagination = generatePagination(
//     currentPage,
//     itemsPerPage,
//     itemList,
//     handlePageChange
//   );

//   const itemsPerPageOptions = [10, 25, 50, 100];

//   return (
//     <div id="filterbox">
//       <div id="buttonsdataxsd585">
//         <div id="itemsPerPage" className="custom-dropdown">
//           <div
//             className="dropdown-header"
//             onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
//           >
//             {itemsPerPage}
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#434343"} fill={"none"}>
//               <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </div>
//           {isItemsPerPageOpen && (
//             <div className="dropdown-content">
//               {itemsPerPageOptions.map((option) => (
//                 <div
//                   key={option}
//                   className="dropdown-option"
//                   onClick={() => handleItemsPerPageChange(option)}
//                 >
//                   {option}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="paginationofeachsegment">
//         <button
//           className="buttonsforprevnext"
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//         >
//           <LiaAngleLeftSolid />
//         </button>
//         <p>{pagination}</p>
//         <button
//           className="buttonsforprevnext"
//           onClick={handleNextPage}
//           disabled={currentPage === Math.ceil(itemList / itemsPerPage)}
//         >
//           <LiaAngleRightSolid />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaginationComponent;










import React, { useState, useEffect } from 'react';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { generatePagination } from './PaginationUtils';
import { TfiControlSkipBackward } from 'react-icons/tfi';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

const PaginationComponent = ({
  itemList,
  setDataChangingProp,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const getTotalPages = () => Math.ceil(itemList / itemsPerPage);
  const totalPages = getTotalPages();

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setDataChangingProp(true);
      // Add logic to fetch data for the new page here
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
    setInputPage(1);
    // Add logic to fetch data for the new items per page here
    setDataChangingProp(true);
    setIsItemsPerPageOpen(false); // Close the dropdown after selection
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/, '');
    if (value === '' || (value > 0 && value <= totalPages)) {
      setInputPage(value === '' ? '' : Number(value));
    }
  };

  const handleInputBlur = () => {
    if (inputPage === '' || (inputPage >= 1 && inputPage <= totalPages)) {
      if (inputPage !== '' && inputPage !== currentPage) {
        handlePageChange(inputPage);
      } else {
        setInputPage(currentPage);
      }
    }
  };

  const itemsPerPageOptions = [10, 25, 50, 100];

  return (
    <div id="filterbox">
      {currentPage > 1 ? (
        <button
          className="buttonsforprevnext xkljspo5654sdf16558"
          onClick={() => handlePageChange(1)}
        >
          <TfiControlSkipBackward />
          Go back to page 1
        </button>
      ) : (
        <div className='xkljspo5654sdf16558'></div>
      )}
      <div className="xjskljklws4855q98">
        <button
          className="buttonsfosdf65sd6f"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <IoIosArrowRoundBack />Previous page
        </button>
        <button
          className="buttonsforpsdf65sd6f"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next page<IoIosArrowRoundForward /></button>
      </div>
      <div className="paginationofeachsegment2x85w">
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min="1"
          max={totalPages}
        />
        <span> of {totalPages}</span>

        <div id="buttonsdataxsd585">
          <div id="itemsPerPage" className="custom-dropdown">
            <div
              className="dropdown-header"
              onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
            >
              {itemsPerPage}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#434343"} fill={"none"}>
                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {isItemsPerPageOpen && (
              <div className="dropdown-content">
                {itemsPerPageOptions.map((option) => (
                  <div
                    key={option}
                    className="dropdown-option"
                    onClick={() => handleItemsPerPageChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
