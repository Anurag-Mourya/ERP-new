import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { itemLists } from "../../Redux/Actions/listApisActions";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import { itemsIcon } from "../Helper/SVGIcons/Icons";
import { BsFiletypePdf } from "react-icons/bs";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";


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
  const dropdownRef = useRef(null);




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

  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  //for pdf and print pdf 
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDownloadPDF = () => {
    // Generate PDF from quotation details
    html2canvas(document.getElementById("middlesection")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('quotation.pdf');
    });
  };

  const handlePrint = () => {
    // Generate PDF from quotation details and print
    html2canvas(document.getElementById("middlesection")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
    });
  };
  //for pdf and print pdf 


  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">
            <h1 id="firstheading">All Items</h1>
            <p id="firsttagp">{totalItems} records</p>
            <div id="searchbox">
              <input
                id="commonmcsearchbar"
                type="text"
                placeholder="Enter Item name, SKU, or Description."
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
              New Item <GoPlus />
            </Link>
            {/* More dropdown */}
            <div className="maincontainmiainx1">
              <div className="mainx2" onClick={handleMoreDropdownToggle}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
              </div>
              {isMoreDropdownOpen && (
                <div className="dropdowncontentofx35" ref={moreDropdownRef}>
                  <div className="dmncstomx1 xs2xs23">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                      <path d="M18.25 9C20.3077 9.0736 22.0549 10.6169 21.9987 12.6844C21.9856 13.1654 21.7993 13.7599 21.4266 14.9489C20.5298 17.8104 19.0226 20.2944 15.6462 20.8904C15.0255 21 14.3271 21 12.9303 21H11.0697C9.6729 21 8.9745 21 8.35384 20.8904C4.97739 20.2944 3.47018 17.8104 2.57336 14.9489C2.20072 13.7599 2.01439 13.1654 2.00132 12.6844C1.94512 10.6169 3.6923 9.0736 5.75001 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 14L12 3M12 14C11.2998 14 9.99153 12.0057 9.5 11.5M12 14C12.7002 14 14.0085 12.0057 14.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Import</div>

                  <div className="dmncstomx1 xs2xs23" onClick={handleToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                      <path d="M6.9375 10C6.24657 10.0051 5.83081 10.0263 5.49965 10.114C3.99243 10.5131 2.96053 11.8639 3.00116 13.3847C3.01293 13.8252 3.18062 14.3696 3.516 15.4585C4.32314 18.079 5.67963 20.3539 8.71845 20.8997C9.27704 21 9.90561 21 11.1627 21L12.8373 21C14.0944 21 14.723 21 15.2816 20.8997C18.3204 20.3539 19.6769 18.079 20.484 15.4585C20.8194 14.3696 20.9871 13.8252 20.9988 13.3847C21.0395 11.8639 20.0076 10.5131 18.5004 10.114C18.1692 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 3L12 14M12 3C12.4684 3 12.8244 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4636 4.3143L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Export</div>
                  {isOpen && (
                    <div ref={dropdownRef} className="dropdown-contentxs565s4">
                      <button onClick={handleDownloadPDF} type="button">
                        <BsFiletypePdf />
                        Download PDF
                      </button>
                      <button onClick={handlePrint} type="button">
                        <IoPrintOutline />
                        Print
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="bordersinglestroke"></div> */}
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
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x275field">
                            {quotation?.opening_stock || "N/A"}
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
                      <div className="notdatafound">
                        <svg clip-rule="evenodd" fill-rule="evenodd" height="512" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_7486772"><g id="Exp-2.-F"><path d="m51.791 24.617h-37c-.796 0-1.559.316-2.122.879-.562.562-.878 1.325-.878 2.121v6h40z" fill="#a4bbdb"></path><path d="m11.791 28.303h40v1.863h-40z" fill="#8da3be"></path><path d="m51.791 23.696c0-.795-.316-1.558-.879-2.121-.563-.562-1.326-.879-2.121-.879-3.581 0-9.48 0-12.638 0-1.287 0-2.43.821-2.842 2.04-.578 1.713-1.311 3.881-1.311 3.881h19.791z" fill="#a4bbdb"></path><path d="m54.279 34.234c.18-1.154-.154-2.33-.914-3.218s-1.87-1.399-3.039-1.399c-8.821 0-27.831 0-36.652 0-1.169 0-2.279.511-3.039 1.399s-1.094 2.064-.914 3.218c1.018 6.512 2.85 18.238 3.75 24 .305 1.948 1.982 3.383 3.953 3.383h29.152c1.971 0 3.648-1.435 3.953-3.383.9-5.762 2.732-17.488 3.75-24z" fill="#cadcf0"></path><path d="m9.721 34.234.513 3.28c-.181-1.155.216-2.331.976-3.219s1.87-1.399 3.039-1.399h35.502c1.169 0 2.279.511 3.039 1.399s1.157 2.064.976 3.219l.513-3.28c.18-1.154-.154-2.33-.914-3.218s-1.87-1.399-3.039-1.399c-8.821 0-27.831 0-36.652 0-1.169 0-2.279.511-3.039 1.399s-1.094 2.064-.914 3.218z" fill="#e9f3fc"></path><g fill="#347bfa"><path d="m29.715 53.464c0-1.104-.895-2-2-2-2.219 0-5.78 0-8 0-1.104 0-2 .896-2 2v2c0 1.105.896 2 2 2h8c1.105 0 2-.895 2-2 0-.643 0-1.356 0-2z"></path><path d="m23.557 25.826c-.044-.282-.065-.56-.064-.834.002-.551-.444-1.001-.996-1.004-.552-.002-1.002.444-1.004.996-.002.378.027.763.089 1.153.085.545.598.918 1.143.832.545-.085.918-.598.832-1.143z"></path><path d="m24.607 21.993c.196-.23.416-.446.66-.648.425-.352.485-.982.133-1.408-.352-.425-.982-.485-1.408-.133-.335.277-.638.576-.908.892-.358.421-.307 1.052.113 1.41s1.052.307 1.41-.113z"></path><path d="m28.376 19.902c.404-.091.83-.159 1.277-.204.549-.055.95-.545.895-1.094s-.545-.951-1.094-.896c-.53.053-1.036.135-1.516.243-.539.121-.878.656-.757 1.194.121.539.656.878 1.195.757z"></path><path d="m33.495 19.694c.61.016 1.189.011 1.741-.012.551-.023.98-.49.957-1.041s-.489-.98-1.041-.957c-.509.021-1.044.025-1.606.011-.552-.014-1.011.423-1.025.974-.014.552.423 1.011.974 1.025z"></path><path d="m39.368 19.055c.645-.187 1.227-.41 1.749-.66.497-.239.707-.837.468-1.335-.239-.497-.837-.707-1.334-.468-.43.206-.909.388-1.441.543-.53.154-.835.709-.681 1.239s.709.835 1.239.681z"></path><path d="m44.122 15.939c.478-.682.79-1.409.962-2.144.126-.538-.209-1.076-.746-1.202-.537-.125-1.076.209-1.201.746-.117.498-.329.99-.653 1.452-.316.452-.207 1.076.245 1.393s1.077.207 1.393-.245z"></path><path d="m44.715 9.783c-.443-1.033-1.137-1.903-1.961-2.471-.455-.314-1.078-.199-1.391.255-.314.454-.199 1.078.255 1.391.535.369.972.944 1.259 1.614.218.508.807.743 1.314.525s.742-.806.524-1.314z"></path></g><path d="m31.891 6.831c1.082-6.127 10.459-5.731 5 0z" fill="#cadcf0"></path><path d="m31.891 8.383c1.082 6.126 10.459 5.731 5 0z" fill="#cadcf0"></path><path d="m31.801 8.617h6.696c.552 0 1-.448 1-1s-.448-1-1-1h-6.696c-.551 0-1 .448-1 1s.449 1 1 1z" fill="#347bfa"></path></g></svg>
                      </div>
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