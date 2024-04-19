import React, { useState, useEffect } from 'react';
import { IoDuplicateOutline, IoSearchOutline } from "react-icons/io5";
import Loader02 from '../../Components/Loaders/Loader02';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { GoPlus } from 'react-icons/go';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const catList = useSelector(state => state?.categoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  const handleRowClicked = (category) => {
    setSelectedCategory(category);
    // Handle click logic
  };

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
              {catList?.loading ? (
                <div id="spearateheightforloader">
                  <Loader02 />
                </div>
              ) : (
                <div id="newtableofagtheme">
                  <div className="table-headerx12">
                    <div className="table-cellx12 serialnumber">S.No</div>
                    <div className="table-cellx12 namefield">Name</div>
                    <div className="table-cellx12 x23field">Title</div>
                    <div className="table-cellx12 x23field">Parent Category</div>
                    <div className="table-cellx12 otherfields">Description</div>
                  </div>
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
                </div>
              )}
            </div>
            <div id='randomheightagain'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
