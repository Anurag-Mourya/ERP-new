import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { LuPlus } from 'react-icons/lu';
import CircleLoader from '../../Components/Loaders/CircleLoader';
import { Link, useNavigate } from 'react-router-dom';
import { CiImageOn, CiReceipt } from 'react-icons/ci';
import { CiEdit } from "react-icons/ci";
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { MdArrowForward, MdOutlineCategory, MdOutlineInventory } from 'react-icons/md';
import { IoCheckbox, IoPricetagOutline } from 'react-icons/io5';
import { BiObjectsVerticalBottom } from 'react-icons/bi';
import { fetchAccoutntList, fetchCategories, fetchVenders } from '../../FetchedApis/Apis';
import { useSelector, useDispatch } from 'react-redux';
import globalData from '../../Redux/Reducers/globalReducers';
import masterDataReducer from '../../Redux/Reducers/globalReducers';
import { fetchMasterData } from '../../Redux/Actions/globalActions';
import { addItems } from '../../Redux/Actions/itemsActions';
import { accountLists, categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { GoPlus } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';


const CreateAndUpdateItem = () => {
  const dispatch = useDispatch();
  const masterData = useSelector(state => state?.masterData?.masterData);
  const itemCreatedData = useSelector(state => state?.addItemsReducer?.addItemsResponse
  );
  const catList = useSelector(state => state?.categoryList)
  const accList = useSelector(state => state?.accountList)
  console.log("accList?.data?.data", accList?.data?.accounts)

  const userData = JSON.parse(localStorage.getItem('UserData'));
  const userId = userData ? userData.id : null;
  console.log("itemCreatedData", itemCreatedData)
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    typeName: '',
    category_id: '',
    parent_id: '',
    description: '',
    sku: '',
    price: '',
    unitName: '',
    unit: '',
    tax_rate: '',
    inventory_level: '',//not in api
    purchase_price: '',
    tag_ids: '',
    image_url: '',//not in api
    sale_acc_id: '',
    purchase_acc_id: '',
    custom_fields: [
      {
        field_name: '',
        value: '',
      }
    ],
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    dispatch(categoryList());
    dispatch(accountLists());
  }, [dispatch]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const typeid = masterData?.find(val => val?.label === formData?.typeName)
    const unitid = masterData?.find(val => val?.label === formData?.unitName)
    setFormData({
      ...formData,
      type: typeid?.labelid,
      unit: unitid?.labelid
    })

  }, [formData?.typeName, formData?.unitName])

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFormData({
        ...formData,
        [name]: selectedFile
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const customFieldsJson = JSON.stringify(formData.custom_fields);
    const formDataWithCustomFields = {
      ...formData,
      custom_fields: customFieldsJson,
    };

    const { unitName, typeName, ...exceptUnitName } = formDataWithCustomFields;
    console.log("exceptUnitName", exceptUnitName)
    setLoading(true);

    dispatch(addItems(exceptUnitName))

    if (itemCreatedData?.message === "Item Created Successfully") {
      toast.success("Item Created Successfully");
      setLoading(false);
    } else {
      toast.error('something went wrong');
      setLoading(false);
    }
  };




  useEffect(() => {
    dispatch(fetchMasterData());
  }, [dispatch]);
  return (
    <>
      <TopLoadbar />
      <div id="Anotherbox">
        <div id="leftareax12">
          <h1 id="firstheading">
            {/* <img src={"/Icons/supplier-alt.svg"} alt="" /> */}
            <img src={"https://cdn-icons-png.freepik.com/512/5006/5006793.png?uid=R87463380&ga=GA1.1.683301158.1710405244"} alt="" />
            Create Item
          </h1>
        </div>

        <div id="buttonsdata">
          <Link to={"/dashboard/manage-items"} className="linkx3">
          <RxCross2 />
          </Link>
        </div>
      </div>
      <div className="bordersinglestroke"></div>
      <div id='middlesection'>

        <div id="formofcreateitems">
          <form onSubmit={handleSubmit}>
            <div id="forminside">
              
              <div className="form-groupx1">
  <label>Type:</label>
  <span>
    {masterData?.map(type => {
      if (type?.type === "3") {
        return (
          <button
            key={type?.labelid}
            className={`type-button ${formData.typeName === type?.label ? 'selectedbtn' : ''}`}
            onClick={() => setFormData({ ...formData, typeName: type?.label })}
          >
            {type?.label}
          </button>
        );
      } else {
        return null;
      }
    })}
  </span>
</div>

    <div className="secondx2">
    <div className="form-group">
                <label className='color_red'>Name:</label>
                <span>
                  <CiEdit />
                  <input type="text" placeholder='name' name="name" value={formData.name} onChange={handleChange} />
                </span>
              </div>


              <div className="form-group">
                <label>Category:</label>
                <span>
                  <MdOutlineCategory />
                  <select name="category_id" value={formData.category_id} onChange={handleChange} >
                    <option value="">Select Category</option>

                    {catList?.data?.data?.map(category => {
                      if (category?.parent_id === "0") {
                        return <option key={category?.id} value={category?.id}>{category?.name ? category?.name : `category Id: ${category?.id}`}</option>;
                      } else {
                        return null;
                      }
                    })}

                  </select>
                </span>
              </div>

              <div className="form-group">
                <label>Sub Category:</label>
                <span>
                  <CiEdit />
                  <select name="parent_id" value={formData.parent_id} onChange={handleChange} >
                    <option value="">Select Sub Category</option>
                    {catList?.data?.data?.map(category => {
                      if (category.parent_id !== "0") {
                        return <option key={category.id} value={category.id}>{category.name}</option>;
                      } else {
                        return null;
                      }
                    })}
                  </select>
                </span>
              </div>


              <div className="form-group">
                <label>SKU:</label>
                <span>
                  <CiEdit />
                  <input type="text" name="sku" placeholder='enter sku' value={formData.sku} onChange={handleChange} />
                </span>
              </div>



              <div className="form-group">
                <label>Unit:</label>
                <span>
                  <CiEdit />
                  <select name="unitName" value={formData.unitName} onChange={handleChange} >
                    <option value="">Select Uints</option>
                    {masterData?.map(type => {
                      if (type.type === "2") {
                        return <option key={type.labelid} value={type.label}>{type.label}</option>;
                      } else {
                        return null;
                      }
                    })}
                  </select>
                </span>
              </div>


              <div className="form-group">
                <label>Tax Rate:</label>
                <span>
                  <CiReceipt />
                  <input type="number" name="tax_rate" placeholder='tax rate' enterKeyHint='tax rate' value={formData.tax_rate} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Inventory Level:</label>
                <span>
                  <MdOutlineInventory />
                  <input type="number" name="inventory_level" placeholder='enter inventory level' value={formData.inventory_level} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Tag IDs:</label>
                <span>
                  <CiEdit />
                  <input type="text" name="tag_ids" placeholder='enter tag ids' value={formData.tag_ids} onChange={handleChange} />
                </span>
              </div>

              <div id="imgurlanddesc">
              <div className="form-group">
                <label>Upload Image:</label>
                <div className="file-upload">
                  <input
                    type="file"
                    name="image_url"
                    id="file"
                    className="inputfile"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file" className="file-label">
                    <CiImageOn />
                    {formData.image_url ? formData.image_url.name : 'Choose a file...'}
                  </label>
                </div>
              </div>


              {/* <button type="submit">Submit</button> */}
            </div>
    </div>

<div className="breakerci"></div>
            </div>
       



       





            <div id="dataofsalesprices">

              
            <div className="x1inssalx5">

              <p className="xkls5663">
              <IoCheckbox />
              Sales information
              </p>
                <span className='newspanx21s'>
                  
              <div className="form-group">
                <label className='color_red'>Sales Price:</label>
                <span>
                  <IoPricetagOutline />
                  <input type="number" name="price" placeholder="Enter sales price" value={formData.price} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label className='color_red'>Sales Account:</label>
                <span>
                  <IoPricetagOutline />
                  <select name="sale_acc_id" value={formData.sale_acc_id} onChange={handleChange} >
                    <option value="">Select Sales Account</option>
                    {accList?.data?.accounts?.map(account => (
                      <option key={account.id} value={account.id}>{account.account_name}</option>
                    ))}
                  </select>
                </span>
              </div>
                </span>



              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" placeholder='enter description' value={formData.description} onChange={handleChange} rows="4" />
              </div>
              </div>


              <div className="breakerci"></div>

                    <div className="x2inssalx5">
                    <p className="xkls5663">
              <IoCheckbox />
              Purchase information
              </p>
                    <span  className='newspanx21s'>
<div className="form-group">
                <label>Purchase Price:</label>
                <span>
                  <IoPricetagOutline />
                  <input type="number" name="purchase_price" placeholder="Enter purchase price" value={formData.purchase_price} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Purchase Account:</label>
                <span>
                  <IoPricetagOutline />
                  <select name="purchase_acc_id" value={formData?.purchase_acc_id} onChange={handleChange} >
                    <option value="">Select Purchase Account</option>
                    {accList?.data?.accounts?.map(account => (
                      <option key={account.id} value={account.id}>{account.account_name}</option>
                    ))}
                  </select>
                </span>
              </div>
</span>

              
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" placeholder='enter description' value={formData.description} onChange={handleChange} rows="4" />
              </div>

                    </div>




            </div>


            <div className="breakerci"></div>
            
            <div id="taxratessection">
            <p className="xkls5663">
              <IoCheckbox />
              Purchase information
              </p>
                    <span  className='newspanx21s'>
<div className="form-group">
                <label>Purchase Price:</label>
                <span>
                  <IoPricetagOutline />
                  <input type="number" name="purchase_price" placeholder="Enter purchase price" value={formData.purchase_price} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Purchase Account:</label>
                <span>
                  <IoPricetagOutline />
                  <select name="purchase_acc_id" value={formData?.purchase_acc_id} onChange={handleChange} >
                    <option value="">Select Purchase Account</option>
                    {accList?.data?.accounts?.map(account => (
                      <option key={account.id} value={account.id}>{account.account_name}</option>
                    ))}
                  </select>
                </span>
              </div>
</span>

            </div>
       




            {/* <div className="form-group">

{formData?.custom_fields?.map((fields, index) => (
  <div key={index}>
    <h3>Custom field {index + 1}</h3>
    <label>
      Field Name:
      <input type="text" value={fields.field_name} onChange={(e) => setFormData(prevState => ({ ...prevState, custom_fields: [...prevState.custom_fields.slice(0, index), { ...fields, field_name: e.target.value }, ...prevState.custom_fields.slice(index + 1)] }))} />
    </label>
    <label>
      Value:
      <input type="text" value={fields.value} onChange={(e) => setFormData(prevState => ({ ...prevState, custom_fields: [...prevState.custom_fields.slice(0, index), { ...fields, value: e.target.value }, ...prevState.custom_fields.slice(index + 1)] }))} />
    </label>
  </div>
))}




<button type="button" onClick={() => setFormData(prevState => ({
  ...prevState,
  custom_fields: [...prevState.custom_fields, {
    field_name: '',
    value: '',
  }]
}))}>Add Custom Field</button>
</div> */}


















        <div className="actionbar">
        <button id='herobtnskls' className={loading ? 'btn-loading' : ''} type="submit" disabled={loading}>
              {loading ? <CircleLoader /> : <p>Submit</p>}
            </button>
            <button>Cancel</button>
        </div>
          </form>

          <div id="rightsideimage">
            {formData.image_url && (
              <div className="file-preview">
                <h2>Uploaded File Preview:</h2>
                <img src={formData.image_url} alt="Uploaded File" />
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateAndUpdateItem;
