import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { itemLists } from "../../Redux/Actions/listApisActions";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import { itemsIcon } from "../Helper/SVGIcons/Icons";
import { itemDetails } from "../../Redux/Actions/itemsActions";


const Quotations = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const itemList = useSelector(state => state?.itemList);
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();



  // Logic for checkBox...
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
    const areAllRowsSelected = itemList?.data?.item.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, itemList?.data?.item]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : itemList?.data?.item.map((row) => row.id));
  };
  // Logic for checkBox...

  // serch and filter
  const [searchCall, setSearchCall] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Items');

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false); // Close the dropdown after selection
  };

  const searchItems = () => {
    setSearchCall(!searchCall);
  };
  // serch and filter

  console.log("filter", selectedFilter)

  //fetch all data
  useEffect(() => {
    let sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    };
    if (searchTerm) {
      sendData.search = searchTerm;
    }
    switch (selectedFilter) {
      case "Active":
        sendData.Active = 1;
        break;
      case "Services":
        sendData.type = "Service";
        break;
      case "Products":
        sendData.type = "Product";
        break;
      default:
        break;
    }


    dispatch(itemLists(sendData));
    setDataChanging(false);
  }, [currentPage, itemsPerPage, dispatch, searchCall, selectedFilter]);
  //fetch all data



  //serch items by type item name , sku , description all letters
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/item-details?id=${quotation.id}`);
  };

  // Dropdown functionality
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // New state for more dropdown

  const sortDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null); // Ref for more dropdown

  const handleClickOutside = (event) => {
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setIsSortByDropdownOpen(false);
    }
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
      setIsFilterDropdownOpen(false);
    }
    if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) { // Close more dropdown when clicking outside
      setIsMoreDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortByDropdownToggle = () => {
    setIsSortByDropdownOpen(!isSortByDropdownOpen);
  };

  const handleFilterDropdownToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleMoreDropdownToggle = () => { // Toggle more dropdown
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };
  // Dropdown functionality end

  // For loading skeleton on every next and prev
  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };

  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">All Items</h1>
            <p id="firsttagp">{itemList?.data?.total_items} records</p>
            <div id="searchbox">
              <input
                id="commonmcsearchbar"
                type="text"
                placeholder="Type full Item, SKU and Description names."
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoSearchOutline onClick={searchItems} />
            </div>
          </div>

          <div id="buttonsdata">
            <div className="maincontainmiainx1">
              <div className="mainx1" onClick={handleSortByDropdownToggle}>
                <img src="/Icons/sort-size-down.svg" alt="" />
                <p>Sort by</p>
              </div>
              {isSortByDropdownOpen && (
                <div className="dropdowncontentofx35" ref={sortDropdownRef}>
                  {/* Sort by dropdown content here */}

                  <div className='dmncstomx1 activedmc'>All Items</div>
                  <div className='dmncstomx1'>Active</div>
                  <div className='dmncstomx1'>Inactive</div>
                  <div className='dmncstomx1'>Services</div>
                  <div className='dmncstomx1'>Goods</div>
                </div>
              )}
            </div>


            <div className="maincontainmiainx1">
              <div className="mainx1" onClick={handleFilterDropdownToggle}>
                <img src="/Icons/filters.svg" alt="" />
                <p>Filter</p>
              </div>
              {isFilterDropdownOpen && (
                <div className="dropdowncontentofx35" ref={filterDropdownRef}>
                  <div className={`dmncstomx1 ${selectedFilter === 'All Items' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('All Items')}>All Items</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Active' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Active')}>Active</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Inactive' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Inactive')}>Inactive</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Services' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Services')}>Services</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Products' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Products')}>Products</div>
                </div>
              )}
            </div>
            <Link className="linkx1" to={"/dashboard/create-items"}>
              Create Item <GoPlus />
            </Link>
            {/* More dropdown */}
            <div className="maincontainmiainx1">
              <div className="mainx2" onClick={handleMoreDropdownToggle}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
              </div>
              {isMoreDropdownOpen && (
                <div className="dropdowncontentofx35" ref={moreDropdownRef}>
                  <div className='dmncstomx2'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                      <path d="M18.25 9C20.3077 9.0736 22.0549 10.6169 21.9987 12.6844C21.9856 13.1654 21.7993 13.7599 21.4266 14.9489C20.5298 17.8104 19.0226 20.2944 15.6462 20.8904C15.0255 21 14.3271 21 12.9303 21H11.0697C9.6729 21 8.9745 21 8.35384 20.8904C4.97739 20.2944 3.47018 17.8104 2.57336 14.9489C2.20072 13.7599 2.01439 13.1654 2.00132 12.6844C1.94512 10.6169 3.6923 9.0736 5.75001 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 14L12 3M12 14C11.2998 14 9.99153 12.0057 9.5 11.5M12 14C12.7002 14 14.0085 12.0057 14.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Import</div>
                  <div className='dmncstomx2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                      <path d="M6.9375 10C6.24657 10.0051 5.83081 10.0263 5.49965 10.114C3.99243 10.5131 2.96053 11.8639 3.00116 13.3847C3.01293 13.8252 3.18062 14.3696 3.516 15.4585C4.32314 18.079 5.67963 20.3539 8.71845 20.8997C9.27704 21 9.90561 21 11.1627 21L12.8373 21C14.0944 21 14.723 21 15.2816 20.8997C18.3204 20.3539 19.6769 18.079 20.484 15.4585C20.8194 14.3696 20.9871 13.8252 20.9988 13.3847C21.0395 11.8639 20.0076 10.5131 18.5004 10.114C18.1692 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 3L12 14M12 3C12.4684 3 12.8244 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4636 4.3143L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    Export</div>
                </div>
              )}
            </div>
          </div>


        </div>
        <div className="bordersinglestroke"></div>
        <div id="mainsectioncsls">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div className="table-cellx12 checkboxfx1 x2s5554" id="styl_for_check_box">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <div className="checkmark"></div>
                  </div>
                  {itemsIcon?.map((val, index) => (
                    <div key={index} className={`table-cellx12 ${val?.className}`}>
                      {val?.svg}
                      {val?.name}
                    </div>
                  ))}
                </div>

                {itemList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {itemList?.data?.item?.map((quotation, index) => (
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
                          {quotation.name || "N/A"}
                        </div>
                        <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                          {quotation.sku || "N/A"}
                        </div>
                        <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                          {quotation.type || "N/A"}
                        </div>
                        <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 otherfields">
                          {quotation.description || "N/A"}
                        </div>
                        <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 pricex2s">
                          {quotation.price ? `${quotation.price}/-` : "N/A"}
                        </div>
                      </div>
                    ))}

                    <PaginationComponent
                      itemList={itemList?.data?.total_items}
                      setDataChangingProp={handleDataChange}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                    />
                  </>
                )}
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
