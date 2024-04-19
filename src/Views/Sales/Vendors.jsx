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
import { CiEdit, CiMail } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import { VscEdit } from "react-icons/vsc";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import InsideCustomerBox from "./InsideCustomerBox";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SalesOrderList = () => {
  const [quotations, setQuotations] = useState([]);
  const [totalQuotations, setTotalQuotations] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [loadingSelectedQuotation, setLoadingSelectedQuotation] = useState(false); // Add state for loading selected quotation
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchQuotations();
  }, [currentPage, itemsPerPage]);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/vendors/list?is_vendor=1`, {
        fy: "2024",
        noofrec: itemsPerPage,
        currentpage: currentPage,
      });

      const data = response.data;
      setQuotations(data.user);
      setTotalQuotations(data.count);
    } catch (error) {
      console.error("Error fetching quotations:", error);
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
    setSelectedQuotation(null); // Reset selectedQuotation to null when a new row is clicked
    setLoadingSelectedQuotation(true); // Set loading state for selected quotation
    // Immediately open selected quotation box
    setSelectedQuotation(params.data);

    // Fetch quotation details using the API endpoint

    axios.post(`${apiUrl}/vendors/view`, { user_id: params.data.id })
      .then(response => {
        setSelectedQuotation(response.data.user);
      })
      .catch(error => {
        console.error("Error fetching quotation details:", error);
      })
      .finally(() => {
        setLoadingSelectedQuotation(false); // Reset loading state for selected quotation
      });
  };

  const handleHideItemDetails = () => {
    setSelectedQuotation(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };



  const pagination = [];
  const totalPages = Math.ceil(totalQuotations / itemsPerPage);
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

  const columnDefs = selectedQuotation
    ? [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerName: "",
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
      { headerName: 'Name', field: 'name', width: 273, resizable: false },

    ]
    : [


      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerName: "",
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
      { headerName: 'Name', field: 'name' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Mobile No', field: 'mobile_no' },
      { headerName: 'Vendor Type', field: 'vendor_type' },
      { headerName: 'Company Name', field: 'company_name' },
      { headerName: 'Display Name', field: 'display_name' },
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
            <img src="https://cdn-icons-png.freepik.com/512/10302/10302971.png?ga=GA1.1.1322639485.1711617724&" alt="" />
            Manage Vendors
          </h1>
          <div id="buttonsdata">
            <Link className="mainprimarycolorback" to={"/dashboard/create-vendor"}>
              Create Vendor
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
                  placeholder="Search organization"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <IoSearchOutline />
              </div>
              <div id="buttonsdataxsd585">
                <p id="firsttagp">{totalQuotations} records</p>
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
                  rowData={loading ? [] : quotations}
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

          {loadingSelectedQuotation ? (
            <div id="rightsidecontentxsa">
              <Loader02 />
            </div>
          ) : (
            <>
              {selectedQuotation && !loadingSelectedQuotation && (
                <div id="rightsidecontentxsa">
                  <div id="item-details">
                    <div className="topitemdetailsrow">
                      <h2>
                        <img src="https://cdn-icons-png.freepik.com/512/6474/6474448.png?ga=GA1.1.1132558896.1711309931&" alt="" />
                        {selectedQuotation.quotation_id}
                      </h2>

                      <div id="middletoolofqls">
                        <div className="childmisdlsx56s"><VscEdit /> Edit</div>

                        <div className="childmisdlsx56s"><RxDotsHorizontal /></div>
                      </div>
                      <div id="insidetedsroswlxk">
                        <div onClick={handleHideItemDetails}><RxCross2 /></div>
                        <Link to={"#"}><TfiHelpAlt /></Link>
                      </div>
                    </div>
                    <InsideCustomerBox selectedCustomer={selectedQuotation} />
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


export default SalesOrderList

