import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories } from '../../Redux/Actions/categoriesActions';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.createCategory);
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDescription: '',
    categoryTitle: '',
    parentCategory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        name: formData.categoryName,
        description: formData.categoryDescription,
        title: formData.categoryTitle
      };
      dispatch(createCategories(sendData));
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('An error occurred while creating category');
    }
  };

  useEffect(() => {
    if (data?.data?.success === true) {
      toast.success(data?.data?.message);
    } else if (data?.data?.success === false) {
      toast.error(data?.data?.message);
    }
  }, [data]);



  return (
    <>
      <div id="maincontainerofforms">
        <hr />
        <div id="firstform">
          <h2 id='firstheading'>Create Category</h2>
          <br />
          <form onSubmit={handleSubmitCategory}>
            <div id="formofcreateupdateorg">
              <div id="fforcklls12">
                <div className="form-group">
                  <label>Category Name:</label>
                  <input type="text" placeholder='category name' name="categoryName" value={formData.categoryName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Title:</label>
                  <input type="text" placeholder='title' name="categoryTitle" value={formData.categoryTitle} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="categoryDescription" placeholder='description' value={formData.categoryDescription} onChange={handleChange} rows="4" />
              </div>
            </div>
            <button id='herobtnskls' type="submit">{data?.loading === true ? "Creating" : "Create Category"}</button>
          </form>
        </div>
        <hr />


        <Toaster />
      </div>
    </>
  )
}

export default CreateCategory
