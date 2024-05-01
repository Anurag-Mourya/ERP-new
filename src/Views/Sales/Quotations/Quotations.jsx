import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { quotationLists } from "../../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";

const Quotations = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const qutList = useSelector(state => state?.quoteList);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetchQuotations();
  }, [currentPage, itemsPerPage]);

  const fetchQuotations = async () => {
    try {
      const sendData = {
        fy: "2024",
        noofrec: itemsPerPage,
        currentpage: currentPage,
      }
      dispatch(quotationLists(sendData));
      setDataChanging(false)
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/quotation-details?id=${quotation.id}`)
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
    const areAllRowsSelected = qutList?.data?.quotations?.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, qutList?.data?.quotations]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : qutList?.data?.quotations?.map((row) => row.id));
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
              {/* <img src={"/assets/Icons/allcustomers.svg"} alt="" /> */}
              <svg id="fi_2110601" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="#555c61"><path d="m21 25h4v15h-4z"></path><path d="m30 32h4v8h-4z"></path><path d="m39 26h4v14h-4z"></path></g><path d="m30.959 52.975c-.706-.034-1.417-.105-2.115-.21l.298-1.979c.631.096 1.276.159 1.915.19zm2.124-.002-.101-1.998c.642-.032 1.286-.097 1.913-.193l.304 1.977c-.695.105-1.407.178-2.116.214zm-6.322-.631c-.678-.174-1.361-.387-2.029-.633l.689-1.877c.606.223 1.224.415 1.837.572zm10.52-.013-.5-1.936c.615-.159 1.232-.354 1.834-.576l.695 1.875c-.665.247-1.348.461-2.029.637zm-14.506-1.459c-.63-.309-1.256-.655-1.859-1.03l1.056-1.699c.546.34 1.112.653 1.683.933zm18.488-.018-.882-1.795c.572-.281 1.138-.597 1.679-.936l1.062 1.695c-.6.375-1.225.724-1.859 1.036zm-22.094-2.227c-.56-.432-1.103-.897-1.615-1.383l1.376-1.451c.463.439.955.86 1.461 1.252zm25.695-.025-1.227-1.58c.506-.393.997-.814 1.46-1.255l1.378 1.449c-.51.486-1.053.952-1.611 1.386zm-28.777-2.896c-.462-.537-.902-1.102-1.306-1.679l1.64-1.146c.365.522.762 1.033 1.181 1.519zm31.854-.032-1.52-1.301c.419-.489.815-1.001 1.179-1.523l1.641 1.145c-.401.574-.838 1.14-1.3 1.679zm-34.288-3.448c-.345-.618-.662-1.26-.941-1.906l1.836-.793c.252.585.539 1.165.851 1.725zm36.715-.036-1.749-.971c.312-.562.597-1.144.848-1.728l1.838.789c-.277.646-.593 1.288-.937 1.91zm-38.398-3.863c-.212-.674-.393-1.366-.536-2.059l1.959-.404c.129.626.292 1.253.484 1.861zm40.073-.043-1.909-.596c.191-.612.353-1.239.481-1.863l1.959.4c-.141.691-.32 1.383-.531 2.059zm-40.933-4.116c-.072-.7-.109-1.414-.111-2.122l2-.004c.001.642.035 1.287.1 1.921zm41.784-.044-1.99-.201c.064-.632.096-1.278.096-1.921l1.39-.057.61.039c0 .727-.036 1.441-.106 2.14zm-39.802-4.003-1.99-.197c.069-.702.175-1.409.314-2.101l1.961.395c-.127.627-.222 1.266-.285 1.903zm37.804-.12c-.066-.637-.166-1.275-.296-1.899l1.958-.408c.144.689.254 1.396.328 2.101zm-37.043-3.647-1.91-.594c.208-.669.455-1.34.733-1.996l1.841.783c-.252.594-.476 1.202-.664 1.807zm36.258-.113c-.193-.607-.42-1.214-.675-1.801l1.835-.797c.282.649.533 1.32.747 1.992zm-34.75-3.421-1.75-.967c.342-.619.719-1.227 1.122-1.807l1.643 1.141c-.364.525-.705 1.075-1.015 1.633zm33.22-.102c-.31-.554-.654-1.102-1.024-1.629l1.637-1.148c.409.582.79 1.188 1.133 1.799zm-31.029-3.055-1.521-1.299c.459-.538.951-1.058 1.461-1.545l1.382 1.445c-.461.442-.906.913-1.322 1.399zm28.82-.089c-.417-.482-.865-.95-1.331-1.39l1.373-1.455c.515.486 1.009 1.003 1.471 1.536zm-26.042-2.568-1.229-1.578c.555-.432 1.14-.843 1.739-1.22l1.065 1.693c-.542.342-1.072.713-1.575 1.105zm23.248-.07c-.508-.391-1.041-.759-1.583-1.096l1.054-1.699c.599.371 1.187.778 1.748 1.209zm-19.994-1.973-.888-1.793c.631-.312 1.288-.597 1.952-.845l.7 1.873c-.6.225-1.194.482-1.764.765zm16.726-.053c-.573-.278-1.168-.532-1.77-.753l.688-1.877c.665.243 1.323.523 1.957.833zm-13.127-1.292-.507-1.936c.684-.179 1.384-.324 2.083-.432l.305 1.977c-.631.098-1.264.229-1.881.391zm9.521-.03c-.622-.157-1.256-.285-1.885-.378l.293-1.979c.696.103 1.397.244 2.084.419zm-5.726-.56-.104-1.998c.374-.02.739-.026 1.13-.028.332 0 .664.008.994.023l-.093 1.998c-.315-.014-.629-.015-.952-.021-.329 0-.653.009-.975.026z" fill="#eb4f53"></path><path d="m23.583 4.167-8.166-1.167.797 2.39c-7.373 4.004-12.654 11.194-14.197 19.425l1.966.369c1.411-7.527 6.187-14.12 12.872-17.87l.895 2.686z" fill="#5eb2d0"></path><path d="m7.534 47.536 2.466-.822-5.714-5.714-1.143 8 2.458-.819c4.033 7.171 11.118 12.29 19.216 13.803l.367-1.967c-7.391-1.38-13.875-5.998-17.65-12.481z" fill="#5eb2d0"></path><path d="m61.983 39.185-1.966-.369c-1.389 7.4-6.022 13.896-12.521 17.673l-.829-2.489-5.833 5.833 8.166 1.167-.86-2.58c7.186-4.036 12.322-11.13 13.843-19.235z" fill="#529bb5"></path><path d="m58.421 15.86c-4.025-7.182-11.12-12.318-19.236-13.842l-.369 1.965c7.411 1.393 13.907 6.026 17.675 12.521l-2.348.783 5.714 5.713 1.143-8z" fill="#5eb2d0"></path></svg>
              All Quotations
            </h1>
            <p id="firsttagp">{qutList?.data?.total} records</p>
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
                  <div className="table-cellx12 namefield"><TbListDetails />Date</div>
                  <div className="table-cellx12 namefield"><TbListDetails />Quotation</div>
                  
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
                    Customer Name</div>
                    
                    <div className="table-cellx12 namefield"><TbListDetails />Refrence No</div>

                    <div className="table-cellx12 otherfields">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                      <path d="M15 3V21M15 3H10M15 3H21M10 12H7.5C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3H10M10 12V3M10 12V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Amount</div>
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

                {qutList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : <>
                  {qutList?.data?.quotations?.map((quotation, index) => (
                    <div
                      className={`table-rowx12 ${selectedRows.includes(quotation.id) ? "selectedresult" : ""}`}
                      key={index}
                    >
                      <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                        <input
                          checked={selectedRows.includes(quotation.id)}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(quotation.id)}
                        />
                        <div className="checkmark"></div>
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 namefield">
                        {quotation.quotation_id || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                        {quotation.reference_no || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                        {quotation.customer_name || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                        {quotation.is_approved || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 otherfields">
                        {quotation.total || "N/A"}
                      </div>

                    </div>
                  ))}

                  <PaginationComponent
                    itemList={qutList?.data?.total}
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

export default Quotations;
