import React, { useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { GoPlus } from 'react-icons/go';
import TableViewSkeleton from '../../Components/SkeletonLoder/TableViewSkeleton';
import PaginationComponent from '../Common/Pagination/PaginationComponent';
import { Toaster } from 'react-hot-toast';
import { categoryIcon } from '../Helper/SVGIcons/Icons';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const catList = useSelector(state => state?.categoryList);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataChanging, setDataChanging] = useState(false);

  // console.log("catList", catList)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  useEffect(() => {
    const sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    }

    dispatch(categoryList(sendData));
    setDataChanging(false);
  }, [dispatch, itemsPerPage, currentPage]);

  const handleRowClicked = (category) => {
    setSelectedCategory(category);
    // Handle click logic
  };



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    const areAllRowsSelected = catList?.data?.data?.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, catList?.data?.data]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : catList?.data?.data?.map((row) => row.id));
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
              <img src={"/Icons/bags-shopping.svg"} alt="" />
              Manage Category
            </h1>
            <p id="firsttagp">{catList?.data?.total} records</p>
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
            <Link className="linkx1" to={"/dashboard/create-categories"}>
              Create Category <GoPlus />
            </Link>
            <Link className="linkx1" to={"/dashboard/create-subcategories"}>
              Create Sub Category <GoPlus />
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

                  {
                    categoryIcon?.map((val) => (
                      <div className={`table-cellx12 ${val?.className}`}>{val?.svg}{val?.name}</div>
                    ))
                  }


                </div>

                {catList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : <>
                  {catList?.data?.data?.map((quotation, index) => (
                    <div
                      className={`table-rowx12 ${selectedRows.includes(quotation?.id) ? "selectedresult" : ""}`}
                      key={index}
                    >
                      <div
                        className={`table-rowx12 ${selectedCategory && selectedCategory.id === category.id ? "selectedresult" : ""}`}
                        key={index}
                        onClick={() => handleRowClicked(category)}
                      ></div>
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
                        {quotation?.title || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                        {quotation?.parent_id || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                        {quotation?.description || "N/A"}
                      </div>


                    </div>
                  ))}

                  <PaginationComponent
                    itemList={catList?.data?.total}
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

export default Categories;