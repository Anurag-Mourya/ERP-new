import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { quotationLists } from "../../../Redux/Actions/listApisActions";
import { useDispatch, useSelector } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import './quoations.scss'


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
      <div id="middlesection" >
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              {/* <img src={"/assets/Icons/allcustomers.svg"} alt="" /> */}
              <svg id="fi_2110601" enableBackground="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="#555c61"><path d="m21 25h4v15h-4z"></path><path d="m30 32h4v8h-4z"></path><path d="m39 26h4v14h-4z"></path></g><path d="m30.959 52.975c-.706-.034-1.417-.105-2.115-.21l.298-1.979c.631.096 1.276.159 1.915.19zm2.124-.002-.101-1.998c.642-.032 1.286-.097 1.913-.193l.304 1.977c-.695.105-1.407.178-2.116.214zm-6.322-.631c-.678-.174-1.361-.387-2.029-.633l.689-1.877c.606.223 1.224.415 1.837.572zm10.52-.013-.5-1.936c.615-.159 1.232-.354 1.834-.576l.695 1.875c-.665.247-1.348.461-2.029.637zm-14.506-1.459c-.63-.309-1.256-.655-1.859-1.03l1.056-1.699c.546.34 1.112.653 1.683.933zm18.488-.018-.882-1.795c.572-.281 1.138-.597 1.679-.936l1.062 1.695c-.6.375-1.225.724-1.859 1.036zm-22.094-2.227c-.56-.432-1.103-.897-1.615-1.383l1.376-1.451c.463.439.955.86 1.461 1.252zm25.695-.025-1.227-1.58c.506-.393.997-.814 1.46-1.255l1.378 1.449c-.51.486-1.053.952-1.611 1.386zm-28.777-2.896c-.462-.537-.902-1.102-1.306-1.679l1.64-1.146c.365.522.762 1.033 1.181 1.519zm31.854-.032-1.52-1.301c.419-.489.815-1.001 1.179-1.523l1.641 1.145c-.401.574-.838 1.14-1.3 1.679zm-34.288-3.448c-.345-.618-.662-1.26-.941-1.906l1.836-.793c.252.585.539 1.165.851 1.725zm36.715-.036-1.749-.971c.312-.562.597-1.144.848-1.728l1.838.789c-.277.646-.593 1.288-.937 1.91zm-38.398-3.863c-.212-.674-.393-1.366-.536-2.059l1.959-.404c.129.626.292 1.253.484 1.861zm40.073-.043-1.909-.596c.191-.612.353-1.239.481-1.863l1.959.4c-.141.691-.32 1.383-.531 2.059zm-40.933-4.116c-.072-.7-.109-1.414-.111-2.122l2-.004c.001.642.035 1.287.1 1.921zm41.784-.044-1.99-.201c.064-.632.096-1.278.096-1.921l1.39-.057.61.039c0 .727-.036 1.441-.106 2.14zm-39.802-4.003-1.99-.197c.069-.702.175-1.409.314-2.101l1.961.395c-.127.627-.222 1.266-.285 1.903zm37.804-.12c-.066-.637-.166-1.275-.296-1.899l1.958-.408c.144.689.254 1.396.328 2.101zm-37.043-3.647-1.91-.594c.208-.669.455-1.34.733-1.996l1.841.783c-.252.594-.476 1.202-.664 1.807zm36.258-.113c-.193-.607-.42-1.214-.675-1.801l1.835-.797c.282.649.533 1.32.747 1.992zm-34.75-3.421-1.75-.967c.342-.619.719-1.227 1.122-1.807l1.643 1.141c-.364.525-.705 1.075-1.015 1.633zm33.22-.102c-.31-.554-.654-1.102-1.024-1.629l1.637-1.148c.409.582.79 1.188 1.133 1.799zm-31.029-3.055-1.521-1.299c.459-.538.951-1.058 1.461-1.545l1.382 1.445c-.461.442-.906.913-1.322 1.399zm28.82-.089c-.417-.482-.865-.95-1.331-1.39l1.373-1.455c.515.486 1.009 1.003 1.471 1.536zm-26.042-2.568-1.229-1.578c.555-.432 1.14-.843 1.739-1.22l1.065 1.693c-.542.342-1.072.713-1.575 1.105zm23.248-.07c-.508-.391-1.041-.759-1.583-1.096l1.054-1.699c.599.371 1.187.778 1.748 1.209zm-19.994-1.973-.888-1.793c.631-.312 1.288-.597 1.952-.845l.7 1.873c-.6.225-1.194.482-1.764.765zm16.726-.053c-.573-.278-1.168-.532-1.77-.753l.688-1.877c.665.243 1.323.523 1.957.833zm-13.127-1.292-.507-1.936c.684-.179 1.384-.324 2.083-.432l.305 1.977c-.631.098-1.264.229-1.881.391zm9.521-.03c-.622-.157-1.256-.285-1.885-.378l.293-1.979c.696.103 1.397.244 2.084.419zm-5.726-.56-.104-1.998c.374-.02.739-.026 1.13-.028.332 0 .664.008.994.023l-.093 1.998c-.315-.014-.629-.015-.952-.021-.329 0-.653.009-.975.026z" fill="#eb4f53"></path><path d="m23.583 4.167-8.166-1.167.797 2.39c-7.373 4.004-12.654 11.194-14.197 19.425l1.966.369c1.411-7.527 6.187-14.12 12.872-17.87l.895 2.686z" fill="#5eb2d0"></path><path d="m7.534 47.536 2.466-.822-5.714-5.714-1.143 8 2.458-.819c4.033 7.171 11.118 12.29 19.216 13.803l.367-1.967c-7.391-1.38-13.875-5.998-17.65-12.481z" fill="#5eb2d0"></path><path d="m61.983 39.185-1.966-.369c-1.389 7.4-6.022 13.896-12.521 17.673l-.829-2.489-5.833 5.833 8.166 1.167-.86-2.58c7.186-4.036 12.322-11.13 13.843-19.235z" fill="#529bb5"></path><path d="m58.421 15.86c-4.025-7.182-11.12-12.318-19.236-13.842l-.369 1.965c7.411 1.393 13.907 6.026 17.675 12.521l-2.348.783 5.714 5.713 1.143-8z" fill="#5eb2d0"></path></svg>
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
            <Link className="linkx1" to={"/dashboard/create-quotations"}>
            New Quotation <GoPlus />
            </Link>
          </div>
        </div>

        <div id="mainsectioncsls" className="commonmainqusalincetcsecion">
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
                  <div className="table-cellx12 quotiosalinvlisxs1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    Date</div>
                  <div className="table-cellx12 quotiosalinvlisxs2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M15 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 13V11C21 6.75736 21 4.63604 19.682 3.31802C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.31802C3 4.63604 3 6.75736 3 11V13C3 17.2426 3 19.364 4.31802 20.682C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.682C21 19.364 21 17.2426 21 13Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H7.52632M11.7368 14H12.2632M16.4737 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18H7.52632M11.7368 18H12.2632M16.4737 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    Quotation</div>
                  
                  <div className="table-cellx12 quotiosalinvlisxs3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5d369f"} fill={"none"}>
    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
</svg>
                    Customer Name</div>
                    
                    <div className="table-cellx12 quotiosalinvlisxs4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5d369f"} fill={"none"}>
    <path d="M16.3083 4.38394C15.7173 4.38394 15.4217 4.38394 15.1525 4.28405C15.1151 4.27017 15.0783 4.25491 15.042 4.23828C14.781 4.11855 14.5721 3.90959 14.1541 3.49167C13.1922 2.52977 12.7113 2.04882 12.1195 2.00447C12.04 1.99851 11.96 1.99851 11.8805 2.00447C11.2887 2.04882 10.8077 2.52977 9.84585 3.49166C9.42793 3.90959 9.21897 4.11855 8.95797 4.23828C8.92172 4.25491 8.88486 4.27017 8.84747 4.28405C8.57825 4.38394 8.28273 4.38394 7.69171 4.38394H7.58269C6.07478 4.38394 5.32083 4.38394 4.85239 4.85239C4.38394 5.32083 4.38394 6.07478 4.38394 7.58269V7.69171C4.38394 8.28273 4.38394 8.57825 4.28405 8.84747C4.27017 8.88486 4.25491 8.92172 4.23828 8.95797C4.11855 9.21897 3.90959 9.42793 3.49166 9.84585C2.52977 10.8077 2.04882 11.2887 2.00447 11.8805C1.99851 11.96 1.99851 12.04 2.00447 12.1195C2.04882 12.7113 2.52977 13.1922 3.49166 14.1541C3.90959 14.5721 4.11855 14.781 4.23828 15.042C4.25491 15.0783 4.27017 15.1151 4.28405 15.1525C4.38394 15.4217 4.38394 15.7173 4.38394 16.3083V16.4173C4.38394 17.9252 4.38394 18.6792 4.85239 19.1476C5.32083 19.6161 6.07478 19.6161 7.58269 19.6161H7.69171C8.28273 19.6161 8.57825 19.6161 8.84747 19.7159C8.88486 19.7298 8.92172 19.7451 8.95797 19.7617C9.21897 19.8815 9.42793 20.0904 9.84585 20.5083C10.8077 21.4702 11.2887 21.9512 11.8805 21.9955C11.96 22.0015 12.04 22.0015 12.1195 21.9955C12.7113 21.9512 13.1922 21.4702 14.1541 20.5083C14.5721 20.0904 14.781 19.8815 15.042 19.7617C15.0783 19.7451 15.1151 19.7298 15.1525 19.7159C15.4217 19.6161 15.7173 19.6161 16.3083 19.6161H16.4173C17.9252 19.6161 18.6792 19.6161 19.1476 19.1476C19.6161 18.6792 19.6161 17.9252 19.6161 16.4173V16.3083C19.6161 15.7173 19.6161 15.4217 19.7159 15.1525C19.7298 15.1151 19.7451 15.0783 19.7617 15.042C19.8815 14.781 20.0904 14.5721 20.5083 14.1541C21.4702 13.1922 21.9512 12.7113 21.9955 12.1195C22.0015 12.04 22.0015 11.96 21.9955 11.8805C21.9512 11.2887 21.4702 10.8077 20.5083 9.84585C20.0904 9.42793 19.8815 9.21897 19.7617 8.95797C19.7451 8.92172 19.7298 8.88486 19.7159 8.84747C19.6161 8.57825 19.6161 8.28273 19.6161 7.69171V7.58269C19.6161 6.07478 19.6161 5.32083 19.1476 4.85239C18.6792 4.38394 17.9252 4.38394 16.4173 4.38394H16.3083Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 16.5C9.19863 15.2923 10.5044 14.4797 12 14.4797C13.4956 14.4797 14.8014 15.2923 15.5 16.5M14 10C14 11.1046 13.1046 12 12 12C10.8955 12 10 11.1046 10 10C10 8.89544 10.8955 8.00001 12 8.00001C13.1046 8.00001 14 8.89544 14 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                      Refrence No</div>

                    <div className="table-cellx12 quotiosalinvlisxs5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5d369f"} fill={"none"}>
    <path d="M18.4167 8.14815C18.4167 5.85719 15.5438 4 12 4C8.45617 4 5.58333 5.85719 5.58333 8.14815C5.58333 10.4391 7.33333 11.7037 12 11.7037C16.6667 11.7037 19 12.8889 19 15.8519C19 18.8148 15.866 20 12 20C8.13401 20 5 18.1428 5 15.8519" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    Amount</div>
                  <div className="table-cellx12 quotiosalinvlisxs6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5d369f"} fill={"none"}>
    <path d="M13 21.9506C12.6711 21.9833 12.3375 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.3375 21.9833 12.6711 21.9506 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 17C8.90247 15.5311 11.0212 14.9041 13 15.1941M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18.5" cy="18.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
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
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs1">
                      {quotation.created_at ? new Date(quotation.created_at).toLocaleDateString('en-US', {day: '2-digit',month: 'short',year: 'numeric'}).split(' ').join('-') : ""}</div>

                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs2">
                        {quotation.quotation_id || ""}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs3">
                        {quotation.customer_name || ""}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs4">
                        {quotation.reference_no || ""}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs5">
                        {quotation.total || ""}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565">
                        {/* {quotation.total || ""} */}
                        <p className="invoiced">Invoiced</p>
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
