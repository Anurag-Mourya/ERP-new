import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader02 from "../../Components/Loaders/Loader02";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { RxCross2, RxDotsHorizontal } from "react-icons/rx";
import { CiEdit, CiMail } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import { VscEdit } from "react-icons/vsc";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import InsideItemDetailsBox from "./InsideItemDetailsBox";
import { GrFormNextLink } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { fetchItemsWithTotalItems } from '../../FetchedApis/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { itemDetails } from "../../Redux/Actions/itemsActions";
import { itemLists } from "../../Redux/Actions/listApisActions";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";


const Quotations = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.itemDetail);
  // console.log("dddddddddddddddd", data);

  const itemList = useSelector(state => state?.itemList);
  // console.log("itemList", itemList)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [newstatex1, setNewstatex1] = useState(true);
  const [loadingSelectedQuotation, setLoadingSelectedQuotation] =
    useState(data?.loading); // Add state for loading selected quotation
  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {
    setLoading(true);
    const sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    }
    dispatch(itemLists(sendData));
  }, [currentPage, itemsPerPage, dispatch]);



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

  const handleRowClicked = (quotation) => {
    setNewstatex1(false)
    setSelectedQuotation(null);
    const sendData = {

      item_id: quotation.id,
      // fy: localStorage.getItem("FinancialYear"),
      fy: 2024,
      // warehouse_id: localStorage.getItem("selectedWarehouseId"),
      warehouse_id: "2",
      inout: "0",
      quantity: "50",
      unit_id: "2",

    }

    dispatch(itemDetails(sendData));
    setSelectedQuotation(data?.itemsDetail?.data?.stock);
  };



  const handleHideItemDetails = () => {
    setSelectedQuotation(false);
    setNewstatex1(true)
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDownloadPDF = () => {
    // Generate PDF from quotation details
    html2canvas(document.getElementById("item-details")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("quotation.pdf");
    });
  };

  const handlePrint = () => {
    // Generate PDF from quotation details and print
    html2canvas(document.getElementById("item-details")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.autoPrint();
      window.open(pdf.output("bloburl"), "_blank");
    });
  };

  const pagination = [];
  const totalPages = Math.ceil(itemList?.data?.total_items / itemsPerPage);
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
              Manage Items
            </h1>

            <p id="firsttagp">{itemList?.data?.total_items} records</p>

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
                  <div className="table-cellx12 serialnumber">S.No</div>
                  <div className="table-cellx12 namefield">Name</div>
                  <div className="table-cellx12 x23field">SKU</div>
                  {newstatex1 && (
                    <>
                      <div className="table-cellx12 x24field">Type</div>
                      <div className="table-cellx12 otherfields">Description</div>
                      <div className="table-cellx12 pricex2s">Price</div>
                    </>
                  )}
                </div>

                {itemList?.loading && !dataChanging === true ? (
                  <TableViewSkeleton />
                ) : <>
                  {itemList?.data?.item?.map((quotation, index) => (
                    <div
                      className={`table-rowx12 ${selectedQuotation && selectedQuotation.id === quotation.id
                        ? "selectedresult"
                        : ""
                        }`}
                      key={index}
                      onClick={() => handleRowClicked(quotation)}
                    >
                      <div className="table-cellx12 serialnumber">{index + 1}</div>
                      <div className="table-cellx12 namefield">{quotation.name}</div>
                      <div className="table-cellx12 x23field">{quotation.sku}</div>

                      {newstatex1 && (
                        <>
                          <div className="table-cellx12 x24field">{quotation.type}</div>
                          <div className="table-cellx12 otherfields">{quotation.description}</div>
                          <div className="table-cellx12 pricex2s">{quotation.price}/-</div>
                        </>
                      )}
                    </div>
                  ))}

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
                      </button>
                      <p>{pagination}</p>
                      <button
                        className="buttonsforprevnext"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <LiaAngleRightSolid />
                      </button>
                    </div>
                  </div>

                </>}
              </div>
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

export default Quotations;
