import React, { useState, useEffect } from 'react';
import { IoDuplicateOutline, IoSearchOutline } from "react-icons/io5";
import Loader02 from '../../Components/Loaders/Loader02';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { GoPlus } from 'react-icons/go';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import TableViewSkeleton from '../../Components/SkeletonLoder/TableViewSkeleton';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const catList = useSelector(state => state?.categoryList);
  const dispatch = useDispatch();

  console.log("catList", catList)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  useEffect(() => {
    const sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    }

    dispatch(categoryList(sendData));
  }, [dispatch]);

  const handleRowClicked = (category) => {
    setSelectedCategory(category);
    // Handle click logic
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
    setDataChanging(true);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
    setDataChanging(true);
  };


  const pagination = [];
  const totalPages = Math.ceil(catList?.data?.total / itemsPerPage);
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


  return (
    <>
      <TopLoadbar />
      <div id='middlesection'>
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              <img src={"/Icons/category.svg"} alt="" />
              Categories
            </h1>

            <p id="firsttagp">{catList?.data?.total} records</p>

            <div id="searchbox">
              <input
                id="commonmcsearchbar"
                type="text"
                placeholder="Search organization"
              // value={searchTerm}
              // onChange={handleSearch}
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
                    <div className="table-cellx12 serialnumber">S.No</div>
                    <div className="table-cellx12 namefield">Name</div>
                    <div className="table-cellx12 x23field">Title</div>
                    <div className="table-cellx12 x23field">Parent Category</div>
                    <div className="table-cellx12 otherfields">Description</div>
                  </div>

              {catList?.loading ? (
                  <TableViewSkeleton/>
              ) :  <>
                  {catList?.data?.data?.map((category, index) => (
                    <div
                      className={`table-rowx12 ${selectedCategory && selectedCategory.id === category.id ? "selectedresult" : ""}`}
                      key={index}
                      onClick={() => handleRowClicked(category)}
                    >
                      <div className="table-cellx12 serialnumber">{index + 1}</div>
                      <div className="table-cellx12 namefield">{category.name}</div>
                      <div className="table-cellx12 x23field">{category.title}</div>
                      <div className="table-cellx12 x23field">{category.parent_id}</div>
                      <div className="table-cellx12 otherfields">{category.description}</div>
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
            <div id='randomheightagain'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;