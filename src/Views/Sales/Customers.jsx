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
import { GoPlus } from "react-icons/go";
import InsideItemDetailsBox from "../Items/InsideItemDetailsBox";
import { customersList, customersView } from "../../Redux/Actions/customerActions";
import { useDispatch, useSelector } from "react-redux";


const SalesOrderList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [loadingSelectedQuotation, setLoadingSelectedQuotation] = useState(false); // Add state for loading selected quotation
  const [isOpen, setIsOpen] = useState(false);
  const [newstatex1, setNewstatex1] = useState(true);
  const [loading, setLoading] = useState(false);

  const cusView = useSelector(state => state?.viewCustomer);
  const cusList = useSelector(state => state?.customerList);
  // console.log("cusList", cusList)
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuotations();
  }, [currentPage, itemsPerPage]);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const sendData = {
        fy: "2024",
        noofrec: itemsPerPage,
        currentpage: currentPage,

      }
      dispatch(customersList(sendData));
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
    setNewstatex1(false)
    setSelectedQuotation(null);
    const sendData = {
      user_id: params?.id,
    }
    dispatch(customersView(sendData));
    setSelectedQuotation(cusView?.data?.user);
  };

  const handleHideItemDetails = () => {
    setSelectedQuotation(false);
    setNewstatex1(true)
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };



  const pagination = [];
  const totalPages = Math.ceil(cusList?.data?.count / itemsPerPage);
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
              Manage Customer
            </h1>

            <p id="firsttagp">{cusList?.data?.count} records</p>

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
            <Link className="linkx1" to={"/dashboard/create-customer"}>
              Create Customer <GoPlus />
            </Link>
          </div>
        </div>

        <div id="mainsectioncsls">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              {cusList?.loading && !dataChanging && (
                <div id="spearateheightforloader">
                  <Loader02 />
                </div>
              )}

              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div className="table-cellx12 serialnumber">S.No</div>
                  <div className="table-cellx12 namefield">Name</div>
                  <div className="table-cellx12 x23field">Email</div>
                  {newstatex1 && (
                    <>
                      {/* <div className="table-cellx12">Unit</div> */}
                      <div className="table-cellx12 otherfields">Mobile No</div>
                      <div className="table-cellx12 pricex2s">Company Type</div>
                      <div className="table-cellx12 pricex2s">Company Name</div>
                      <div className="table-cellx12 pricex2s">Display Name</div>
                      {/* <div className="table-cellx12">Created At</div> */}
                    </>
                  )}
                </div>
                {cusList?.data?.user?.map((quotation, index) => (
                  <div
                    className={`table-rowx12 ${selectedQuotation && selectedQuotation.id === quotation.id
                      ? "selectedresult"
                      : ""
                      }`}
                    key={index}
                    onClick={() => handleRowClicked(quotation)}
                  >
                    <div className="table-cellx12 serialnumber">{index + 1}</div>
                    <div className="table-cellx12 namefield">{quotation.first_name}</div>
                    <div className="table-cellx12 x23field">{quotation.email}</div>

                    {newstatex1 && (
                      <>
                        <div className="table-cellx12 x24field">{quotation.mobile_no}</div>
                        {/* <div className="table-cellx12">{quotation.unit}</div> */}
                        <div className="table-cellx12 otherfields">{quotation.customer_type}</div>
                        <div className="table-cellx12 pricex2s">{quotation.company_name}/-</div>
                        <div className="table-cellx12 pricex2s">{quotation.display_name}/-</div>

                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
              <p>{pagination}</p>
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
                        {/* <img src="https://cdn-icons-png.freepik.com/512/6474/6474448.png?ga=GA1.1.1132558896.1711309931&" alt="" /> */}
                        {selectedQuotation.name}
                      </h2>

                      <div id="middletoolofqls">
                        <div className="childmisdlsx56s">
                          <VscEdit /> Edit
                        </div>

                        <div className="childmisdlsx56s">
                          <RxDotsHorizontal />
                        </div>
                      </div>
                      <div id="insidetedsroswlxk">
                        <div onClick={handleHideItemDetails}>
                          <RxCross2 />
                        </div>
                        <Link to={"#"}>
                          <TfiHelpAlt />
                        </Link>
                      </div>
                    </div>
                    <InsideItemDetailsBox
                      selectedQuotation={selectedQuotation}
                    />
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
