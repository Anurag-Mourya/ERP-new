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
import Insidequoationsbox from "./Insidequoationsbox";
import { FiChevronDown } from "react-icons/fi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import InsideSaleOrderbox from "./InsideSaleOrderbox";
import { saleOrderLists } from "../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import { GoPlus } from "react-icons/go";
import InsideItemDetailsBox from "../Items/InsideItemDetailsBox";
import { saleOrderDetails } from "../../Redux/Actions/saleOrderActions";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SalesOrderList = () => {
  const dispatch = useDispatch();

  const saleListData = useSelector(state => state?.saleList);
  const saleDetailData = useSelector(state => state?.saleDetail);

  const saleList = saleListData?.data?.sale_orders;
  const saleDetail = saleDetailData?.data?.data?.salesOrder;
  // console.log("saleDetailData", saleDetailData)
  // console.log("saleListData", saleListData)



  const [quotations, setQuotations] = useState([]);
  const [totalQuotations, setTotalQuotations] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);
  const [loadingselectedSalesOrder, setLoadingSelectedSalesOrder] = useState(false); // Add state for loading selected quotation
  const [isOpen, setIsOpen] = useState(false);
  const [newstatex1, setNewstatex1] = useState(true);
  console.log("selectedSalesOrder", selectedSalesOrder)

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

      dispatch(saleOrderLists(sendData));

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
    setSelectedSalesOrder(null); // Reset selectedSalesOrder to null when a new row is clicked
    // setLoadingSelectedSalesOrder(true); // Set loading state for selected quotation
    // Immediately open selected quotation box
    setSelectedSalesOrder(params.data);
    setNewstatex1(false)
    // Fetch quotation details using the API endpoint
    const sendData = {
      id: params?.id,
    }
    dispatch(saleOrderDetails(sendData));
    setSelectedSalesOrder(saleDetail);
    setLoadingSelectedSalesOrder(false); // Reset loading state for selected quo
  };

  const handleHideItemDetails = () => {
    setSelectedSalesOrder(false);
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
  const totalPages = Math.ceil(saleListData?.data?.count / itemsPerPage);
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

  const convert = [
    {
      convertTo: "convert-sales",
      slug: "to-invoices",
      name: "Convert to Invoices"
    }
  ]

  return (
    <>
      <TopLoadbar />

      {/* starting new table code */}
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              <img src={"/Icons/bags-shopping.svg"} alt="" />
              Manage Sales Orders
            </h1>

            <p id="firsttagp">{saleListData?.data?.count} records</p>

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
              {saleListData?.loading && !dataChanging && (
                <div id="spearateheightforloader">
                  <Loader02 />
                </div>
              )}
              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div className="table-cellx12 serialnumber">S.No</div>
                  <div className="table-cellx12 namefield">Sale Order Id</div>
                  <div className="table-cellx12 x23field">Refrence No</div>
                  {newstatex1 && (
                    <>
                      <div className="table-cellx12 x24field">Customer Name</div>
                      {/* <div className="table-cellx12">Unit</div> */}
                      <div className="table-cellx12 otherfields">Status</div>
                      <div className="table-cellx12 pricex2s">Total</div>
                      {/* <div className="table-cellx12">Created At</div> */}
                    </>
                  )}
                </div>
                {saleList?.map((quotation, index) => (
                  <div
                    className={`table-rowx12 ${selectedSalesOrder && selectedSalesOrder.id === quotation.id
                      ? "selectedresult"
                      : ""
                      }`}
                    key={index}
                    onClick={() => handleRowClicked(quotation)}
                  >
                    <div className="table-cellx12 serialnumber">{index + 1}</div>
                    <div className="table-cellx12 namefield">{quotation.sale_order_id}</div>
                    <div className="table-cellx12 x23field">{quotation.reference_no}</div>

                    {newstatex1 && (
                      <>
                        <div className="table-cellx12 x24field">{quotation.customer_name}</div>
                        {/* <div className="table-cellx12">{quotation.unit}</div> */}
                        <div className="table-cellx12 otherfields">{quotation.is_approved}</div>
                        <div className="table-cellx12 pricex2s">{quotation.total}/-</div>
                        {/* <div className="table-cellx12">{new Date(quotation.created_at).toLocaleDateString("en-GB")}</div> */}
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
          </div>
          {/* Display quotation details */}

          {loadingselectedSalesOrder ? (
            <div id="rightsidecontentxsa">
              <Loader02 />
            </div>
          ) : (
            <>
              {selectedSalesOrder && !loadingselectedSalesOrder && (
                <div id="rightsidecontentxsa">
                  <div id="item-details">
                    <div className="topitemdetailsrow">
                      <h2>
                        {/* <img src="https://cdn-icons-png.freepik.com/512/6474/6474448.png?ga=GA1.1.1132558896.1711309931&" alt="" /> */}
                        {selectedSalesOrder?.sale_order_id}
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
                      selectedSalesOrder={selectedSalesOrder}
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
