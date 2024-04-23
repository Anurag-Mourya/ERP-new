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
  const itemListState = useSelector(state => state?.itemList);
  const itemList = itemListState?.data?.item || [];
  const totalItems = itemListState?.data?.total_items || 0;
  const itemListLoading = itemListState?.loading || false;
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();

  const [fiterItems, setFilterItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Items');
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);


  useEffect(() => {
    const areAllRowsSelected = itemList && itemList.length > 0 ? itemList.every((row) => selectedRows.includes(row.id)) : false;

    setSelectAll(areAllRowsSelected);
    filterdData();
  }, [selectedFilter, selectedSortBy, searchTerm, itemList, selectedRows]);

  useEffect(() => {
    let sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    };
    dispatch(itemLists(sendData));
    setDataChanging(false);
  }, [currentPage, itemsPerPage, dispatch]);

  useEffect(() => {
    setFilterItems(itemList);
  }, [itemList]);

  const filterdData = () => {
    let filteredItems = [...itemList];

    switch (selectedFilter) {
      case "Active":
        filteredItems = filteredItems.filter((val) => val?.active === 1);
        break;
      case "Services":
        filteredItems = filteredItems.filter((val) => val?.type === "Service");
        break;
      case "Products":
        filteredItems = filteredItems.filter((val) => val?.type === "Product");
        break;
      case "All Items":
      default:
        break;
    }

    if (searchTerm && searchTerm.length >= 3) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter((item) =>
      (item.name?.toLowerCase().includes(searchTermLowerCase) ||
        item.sku?.toLowerCase().includes(searchTermLowerCase) ||
        item.description?.toLowerCase().includes(searchTermLowerCase))
      );
    }

    if (selectedSortBy === "Name") {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortBy === "Price") {
      filteredItems.sort((a, b) => (+(a.price)) - (+(b.price)));
    } else if (selectedSortBy === "Purchase Price") {
      filteredItems.sort((a, b) => a.purchase_price - b.purchase_price);
    }

    setFilterItems(filteredItems);
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : itemList.map((row) => row.id));
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false);
  };

  const handleSortBySelection = (sortBy) => {
    setSelectedSortBy(sortBy);
    setIsSortByDropdownOpen(false);
  };

  const searchItems = () => {
    setSearchCall(!searchCall);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/item-details?id=${quotation.id}`);
  };

  const handleSortByDropdownToggle = () => {
    setIsSortByDropdownOpen(!isSortByDropdownOpen);
  };

  const handleFilterDropdownToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleMoreDropdownToggle = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setIsSortByDropdownOpen(false);
    }
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
      setIsFilterDropdownOpen(false);
    }
    if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
      setIsMoreDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <p id="firsttagp">{totalItems} records</p>
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
                  <div className={`dmncstomx1 ${selectedSortBy === 'Name' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Name')}>Name</div>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Price' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Price')}>Price</div>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Purchase Price' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Purchase Price')}>Purchase Price</div>
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
                  {/* Dropdown content */}
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

                {itemListLoading || dataChanging ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {fiterItems.length >= 1 ? (
                      fiterItems.map((quotation, index) => (
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
                            {quotation?.name || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                            {quotation?.sku || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                            {quotation?.type || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 otherfields">
                            {quotation?.description || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 pricex2s">
                            {quotation?.price ? `${quotation?.price}/-` : "N/A"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No ?s found</div>
                    )}
                    <PaginationComponent
                      itemList={totalItems}
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
      </div>
      <Toaster />
    </>
  );
};

export default Quotations;