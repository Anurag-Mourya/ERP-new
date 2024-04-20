import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { creditNotesDetails } from "../../../Redux/Actions/notesActions";
import { useDispatch, useSelector } from "react-redux";
import { creditNoteLists } from "../../../Redux/Actions/listApisActions";
import { GoPlus } from "react-icons/go";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import { TbListDetails } from "react-icons/tb";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";


const CreditNotes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dataChanging, setDataChanging] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const creditList = useSelector(state => state?.creditNoteList);

    useEffect(() => {
        fetchcreditNotes();
    }, [currentPage, itemsPerPage]);

    const fetchcreditNotes = async () => {
        try {
            const sendData = {
                fy: "2024",
                noofrec: itemsPerPage,
                currentpage: currentPage,
            }
            dispatch(creditNoteLists(sendData));

            setDataChanging(false);

        } catch (error) {
            console.error("Error fetching creditNotes:", error);
        }
    };



    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleRowClicked = (quotation) => {
        Navigate(`/dashboard/creditnote-details?id=${quotation.id}`)
    };


    //logic for checkBox...
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleCheckboxChange = (rowId) => {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };
    useEffect(() => {
        const areAllRowsSelected = creditList?.data?.every((row) => selectedRows.includes(row.id));
        setSelectAll(areAllRowsSelected);
    }, [selectedRows, creditList]);

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : creditList?.map((row) => row.id));
    };
    //logic for checkBox...

    const handleDataChange = (newValue) => {
        setDataChanging(newValue);
    };

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <TopLoadbar />
            <div id="middlesection">
                <div id="Anotherbox">
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            <img src={"/Icons/bags-shopping.svg"} alt="" />
                            Manage Credit Notes
                        </h1>
                        <p id="firsttagp">{creditList?.data?.length} records</p>
                        <div id="searchbox">
                            <input
                                id="commonmcsearchbar"
                                type="text"
                                placeholder="Search organization"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <IoSearchOutline />
                        </div>
                    </div>

                    <div id="buttonsdata">
                        <div className="mainx1">
                            <img src="/Icons/sort-size-down.svg" alt="" />
                            <p>Sort by</p>
                        </div>
                        <div className="mainx1">
                            <img src="/Icons/filters.svg" alt="" />
                            <p>Filter</p>
                        </div>
                        <Link className="linkx1" to={"/dashboard/create-items"}>
                            Create Item <GoPlus />
                        </Link>
                    </div>
                </div>

                <div id="mainsectioncsls">
                    <div id="leftsidecontentxls">
                        <div id="item-listsforcontainer">
                            <div id="newtableofagtheme">
                                <div className="table-headerx12">
                                    <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                        />
                                        <div className="checkmark"></div>
                                    </div>
                                    <div className="table-cellx12 namefield"><TbListDetails />Transaction Date</div>
                                    <div className="table-cellx12 namefield"><TbListDetails />Credit Note ID</div>
                                    <div className="table-cellx12 x23field">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        Refrence No</div>

                                    <div className="table-cellx12 x24field">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                                            <path d="M12 22L10 16H2L4 22H12ZM12 22H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        Status</div>


                                </div>

                                {creditList?.loading || dataChanging === true ? (
                                    <TableViewSkeleton />
                                ) : <>
                                    {creditList?.data?.map((quotation, index) => (
                                        <div
                                            className={`table-rowx12 ${selectedRows.includes(quotation?.id) ? "selectedresult" : ""}`}
                                            key={index}
                                        >
                                            <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                                                <input
                                                    checked={selectedRows.includes(quotation?.id)}
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(quotation?.id)}
                                                />
                                                <div className="checkmark"></div>
                                            </div>
                                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 namefield">
                                                {quotation?.transaction_date || "N/A"}
                                            </div>
                                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                                                {quotation?.credit_note_id || "N/A"}
                                            </div>
                                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                                                {quotation?.reference_no || "N/A"}
                                            </div>
                                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                                                {quotation?.is_approved || "N/A"}
                                            </div>


                                        </div>
                                    ))}

                                    <PaginationComponent
                                        itemList={creditList?.data?.length}
                                        setDataChangingProp={handleDataChange}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        itemsPerPage={itemsPerPage}
                                        setItemsPerPage={setItemsPerPage} />
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </>
    );
};


export default CreditNotes;
