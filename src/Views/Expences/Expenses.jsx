import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";
import Loader02 from "../../Components/Loaders/Loader02";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { RxCross2, RxDotsHorizontal } from "react-icons/rx";
import { CiMail } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import { VscEdit } from "react-icons/vsc";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import axiosInstance from "../../Configs/axiosInstance";
import Sidebar from "../../Components/NavigationBars/Sidebar";
// import InsideInvoicesbox from "../Sales/InsideInvoicesbox";
// import Insideexpensesbox from "./Insideexpensesbox";


const Expenses = () => {
    const [expenses, setexpenses] = useState([]);
    const [totalexpenses, setTotalExpenses] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [dataChanging, setDataChanging] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExpenses, setselectedExpense] = useState(null);
    const [loadingselectedExpenses, setLoadingselectedExpenses] = useState(false); // Add state for loading selected quotation
    const [isOpen, setIsOpen] = useState(false);

    console.log("selectedExpenses", selectedExpenses)
    useEffect(() => {
        fetchexpenses();
    }, [currentPage, itemsPerPage]);

    const fetchexpenses = async () => {
        setLoading(true);
        try {
            // /purchase-order/list ? fy = 2024
            const response = await axiosInstance.post(`/expense/list`, {
                noofrec: itemsPerPage,
                currentpage: currentPage,
            });

            const data = response.data;
            setexpenses(data);
            console.log("expense list", data)
            setTotalExpenses(data.count);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setDataChanging(true);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
        setDataChanging(true);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRowClicked = (params) => {
        setselectedExpense(null); // Reset selectedExpenses to null when a new row is clicked
        setLoadingselectedExpenses(true); // Set loading state for selected quotation

        // Immediately open selected quotation box          
        // setselectedExpense(params.data);
        console.log("expenses id", params.data.id)
        const filterExpense = expenses.filter(val => val?.id === params.data.id)
        console.log("expenses", filterExpense);
        setselectedExpense(filterExpense[0]);
        setLoadingselectedExpenses(false);
    };


    const handleHideItemDetails = () => {
        setselectedExpense(false);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDownloadPDF = () => {
        // Generate PDF from quotation details
        html2canvas(document.getElementById("item-details")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('quotation.pdf');
        });
    };

    const handlePrint = () => {
        // Generate PDF from quotation details and print
        html2canvas(document.getElementById("item-details")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.autoPrint();
            window.open(pdf.output('bloburl'), '_blank');
        });
    };

    const pagination = [];
    const totalPages = Math.ceil(totalexpenses / itemsPerPage);
    const visiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (currentPage - startPage < Math.floor(visiblePages / 2)) {
        endPage = Math.min(totalPages, startPage + visiblePages - 1);
    }

    if (endPage === totalPages && totalPages > visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (startPage > 1) {
        pagination.push(
            <button key={1} onClick={() => handlePageChange(1)}>
                1
            </button>
        );
        if (startPage > 2) {
            pagination.push(<span key={-1}>...</span>);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagination.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                disabled={i === currentPage}
            >
                {i}
            </button>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagination.push(<span key={-2}>...</span>);
        }
        pagination.push(
            <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </button>
        );
    }

    const columnDefs = selectedExpenses
        ? [
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                headerName: "DSDSDS",
                width: 50,
                resizable: false,
            },
            {
                headerName: "S.No",
                field: "id",
                width: 67,
                valueGetter: (params) => params.node.rowIndex + 1,
                resizable: false,
            },

            { headerName: "Sale Order ID", field: "Purchase_id", width: 273, resizable: false, }
        ]
        : [


            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                headerName: "",
                width: 50,
            },
            {
                headerName: "S.No",
                field: "id",
                width: 67,
                valueGetter: (params) => params.node.rowIndex + 1,
            },
            { headerName: "Transaction Date", field: "transaction_date" },
            {
                headerName: "Created At",
                field: "created_at",
                valueGetter: (params) =>
                    new Date(params.data.created_at).toLocaleDateString(),
            },
            { headerName: "Expense Name", field: "expense_head_id" },

            { headerName: "Total", field: "amount" },

        ];

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
                    <h1 id="firstheading">
                        <img src="https://cdn-icons-png.freepik.com/512/6050/6050937.png?ga=GA1.1.1034769832.1711897768&" alt="" />
                        Manage expenses
                    </h1>

                    <div id="buttonsdata">

                        {/* fetch expenses */}
                        <Link className="mainprimarycolorback" to={"/dashboard/create-expenses"}>
                            Create Expenses
                        </Link>

                    </div>
                </div>

                <div id="mainsectioncsls">
                    <div id="leftsidecontentxls">
                        <div id="filterbox">
                            <div id="searchbox">
                                <input
                                    id="commonmcsearchbar"
                                    type="text"
                                    placeholder="Search expenses"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                < IoSearchOutline />
                            </div>
                            <div id="buttonsdataxsd585">
                                <p id="firsttagp">{totalexpenses} records</p>
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
                        </div>
                        <div id="item-listsforcontainer">
                            {loading && !dataChanging && (
                                <div id="spearateheightforloader">
                                    <Loader02 />
                                </div>
                            )}
                            <div className="ag-theme-alpine" id="newtableofagtheme" style={{ height: "calc(100vh - 276px)", width: '100%' }}>
                                <AgGridReact
                                    rowData={loading ? [] : expenses}
                                    columnDefs={columnDefs}
                                    rowSelection="multiple"
                                    onRowClicked={handleRowClicked} // Add click handler for row
                                />
                            </div>
                        </div>
                        <div className="paginationofeachsegment">
                            <button
                                className="buttonsforprevnext"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <LiaAngleLeftSolid />
                                {/* Prev */}
                            </button>
                            <p>
                                {pagination}
                            </p>
                            <button
                                className="buttonsforprevnext"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                {/* Next */}
                                <LiaAngleRightSolid />
                            </button>
                        </div>
                    </div>
                    {/* Display quotation details */}

                    {loadingselectedExpenses ? (
                        <div id="rightsidecontentxsa">
                            <Loader02 />
                        </div>
                    ) : (
                        <>
                            {selectedExpenses && !loadingselectedExpenses && (
                                <div id="rightsidecontentxsa">
                                    <div id="item-details">
                                        <div className="topitemdetailsrow">
                                            <h2>
                                                <img src="https://cdn-icons-png.freepik.com/512/4628/4628528.png?ga=GA1.1.981296541.1712039579&" alt="" />
                                                {selectedExpenses.quotation_id}
                                            </h2>

                                            <div id="middletoolofqls">
                                                <Link to={`/dashboard/edit-expenses/${selectedExpenses.id}`}
                                                    className="childmisdlsx56s"><VscEdit /> Edit </Link>
                                                <div className="childmisdlsx56s"><CiMail /> Send Mail</div>
                                                <div className="childmisdlsx56s dropbtn" onClick={handleToggle}><BsFiletypePdf />PDF/Print</div>
                                                {isOpen && (
                                                    <div ref={dropdownRef} className="dropdown-contentxs565s4">
                                                        <button onClick={handleDownloadPDF}>
                                                            <BsFiletypePdf />
                                                            Download PDF
                                                        </button>
                                                        <button onClick={handlePrint}>
                                                            <IoPrintOutline />
                                                            Print
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="childmisdlsx56s"><RxDotsHorizontal /></div>
                                            </div>
                                            <div id="insidetedsroswlxk">
                                                <div onClick={handleHideItemDetails}><RxCross2 /></div>
                                                <Link to={"#"}><TfiHelpAlt /></Link>
                                            </div>
                                        </div>
                                        {/* <Insideexpensesbox selectedExpenses={selectedExpenses} /> */}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                </div>
                <Toaster />
            </div>
        </>
    );
};


export default Expenses
