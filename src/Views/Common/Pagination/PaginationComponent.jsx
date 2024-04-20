import React from 'react'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import { generatePagination } from './PaginationUtils';

const PaginationComponent = ({ itemList, setDataChangingProp, currentPage,
    setCurrentPage, itemsPerPage,
    setItemsPerPage, }) => {

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setDataChangingProp(true);
        // Add logic to fetch data for the new page here
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
        // Add logic to fetch data for the new items per page here
        setDataChangingProp(true);

    };

    const getTotalPages = () => Math.ceil(itemList / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = getTotalPages();
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const pagination = generatePagination(currentPage, itemsPerPage, itemList, handlePageChange);
    return (
        <div id="filterbox">
            <div id="buttonsdataxsd585">
                <div id="itemsPerPage">
                    <label htmlFor="itemsPerPage">Items per page </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            <div className="paginationofeachsegment">
                <button
                    className="buttonsforprevnext"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <LiaAngleLeftSolid />
                </button>
                <p>{pagination}</p>
                <button
                    className="buttonsforprevnext"
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(itemList / itemsPerPage)}
                >
                    <LiaAngleRightSolid />
                </button>
            </div>
        </div>
    )
}

export default PaginationComponent