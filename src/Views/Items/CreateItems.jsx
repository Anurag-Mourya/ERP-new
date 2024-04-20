import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import CircleLoader from '../../Components/Loaders/CircleLoader';
import { Link, useNavigate } from 'react-router-dom';
import { CiImageOn } from 'react-icons/ci';
import { IoCheckbox } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMasterData } from '../../Redux/Actions/globalActions';
import { addItems } from '../../Redux/Actions/itemsActions';
import { accountLists, categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';

import CustomDropdown03 from '../../Components/CustomDropdown/CustomDropdown03';
import CustomDropdown04 from '../../Components/CustomDropdown/CustomDropdown04';
import CustomDropdown05 from '../../Components/CustomDropdown/CustomDropdown05';



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
          <Link  to={"/dashboard/manage-items"} className="linkx3">
          <RxCross2 />
          </Link>
        </div>
      </div>
      <div className="bordersinglestroke"></div>
      <div id='middlesection'>

        <div id="formofcreateitems">
          <form onSubmit={handleSubmit}>
            <div className="itemsformwrap">
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
                <label className='color_red'>Name*</label>
                <span>
                  {/* <CiEdit /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                  <input type="text" placeholder='name' name="name" value={formData.name} onChange={handleChange} />
                </span>
              </div>


              <div className="form-group">
                <label>Category:</label>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  {/* <MdOutlineCategory /> */}
                  {/* <img class="newclassforallsvg" src="/Icons/category.svg" alt="" /> */}

                  <CustomDropdown03
          label="Category"
          options={catList?.data?.data?.filter(cat => cat.parent_id === "0") || []}
          value={formData.category_id}
          onChange={handleChange}
          name="category_id"
          defaultOption="Select Category"
        />
                </span>
              </div>


              <div className="form-group">
                <label>Sub Category:</label>
                <span>
                  {/* <CiEdit /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  {/* <img class="newclassforallsvg" src="/Icons/category.svg" alt="" /> */}
                  <CustomDropdown03
  label="Sub Category"
  options={catList?.data?.data?.filter(category => category.parent_id !== "0") || []}
  value={formData.parent_id}
  onChange={handleChange}
  name="parent_id"
  defaultOption="Select Sub Category"
/>

                  
                </span>
              </div>


              <div className="form-group">
                <label>SKU:</label>
                <span>
                  {/* <CiEdit /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                  <input type="text" name="sku" placeholder='enter sku' value={formData.sku} onChange={handleChange} />
                </span>
              </div>



              <div className="form-group">
                <label>Unit:</label>
                <span>
                  {/* <CiEdit /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 4C22 5.10457 21.1046 6 20 6C18.8954 6 18 5.10457 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 6V18M18 20H6M18 4H6M4 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6497 8.48045L9.56106 9.01321C8.18702 9.68563 7.5 10.0218 7.5 10.5C7.5 10.9782 8.18702 11.3144 9.56106 11.9868L10.6497 12.5195C11.3042 12.8398 11.6315 13 12 13C12.3685 13 12.6958 12.8398 13.3503 12.5195L14.4389 11.9868C15.813 11.3144 16.5 10.9782 16.5 10.5C16.5 10.0218 15.813 9.68563 14.4389 9.01321L13.3503 8.48045C12.6958 8.16015 12.3685 8 12 8C11.6315 8 11.3042 8.16015 10.6497 8.48045Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 13.5C16.5 13.9782 15.813 14.3144 14.4389 14.9868L13.3503 15.5195C12.6958 15.8398 12.3685 16 12 16C11.6315 16 11.3042 15.8398 10.6497 15.5195L9.56106 14.9868C8.18702 14.3144 7.5 13.9782 7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>

                  <CustomDropdown04
  label="Unit Name"
  options={masterData?.filter(type => type.type === "2")}
  value={formData.unitName}
  onChange={handleChange}
  name="unitName"
  defaultOption="Select Units"
/>

                </span>
              </div>


              <div className="form-group">
                <label>Tax Rate:</label>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M12 22V6C12 4.11438 12 3.17157 11.4142 2.58579C10.8284 2 9.88562 2 8 2H6C4.11438 2 3.17157 2 2.58579 2.58579C2 3.17157 2 4.11438 2 6V18C2 19.8856 2 20.8284 2.58579 21.4142C3.17157 22 4.11438 22 6 22H12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 22H18C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V12C22 10.1144 22 9.17157 21.4142 8.58579C20.8284 8 19.8856 8 18 8H12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18.5 16H15.5M18.5 12L15.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.5 14H5.5M8.5 10H5.5M8.5 6H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                  {/* <CiReceipt /> */}
                  <input type="number" name="tax_rate" placeholder='tax rate' enterKeyHint='tax rate' value={formData.tax_rate} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Inventory Level:</label>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <rect x="11" y="2" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 6.50049C8.97247 6.50414 7.91075 6.55392 7.23223 7.23243C6.5 7.96467 6.5 9.14318 6.5 11.5002V12.5002C6.5 14.8572 6.5 16.0357 7.23223 16.768C7.96447 17.5002 9.14298 17.5002 11.5 17.5002H12.5C14.857 17.5002 16.0355 17.5002 16.7678 16.768C17.4463 16.0895 17.4961 15.0277 17.4997 13.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 11.0005C4.47247 11.0041 3.41075 11.0539 2.73223 11.7324C2 12.4647 2 13.6432 2 16.0002V17.0002C2 19.3572 2 20.5357 2.73223 21.268C3.46447 22.0002 4.64298 22.0002 7 22.0002H8C10.357 22.0002 11.5355 22.0002 12.2678 21.268C12.9463 20.5895 12.9961 19.5277 12.9997 17.5002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  {/* <MdOutlineInventory /> */}
                  <input type="number" name="inventory_level" placeholder='enter inventory level' value={formData.inventory_level} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Tag IDs:</label>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" />
</svg>
                  {/* <CiEdit /> */}
                  <input type="text" name="tag_ids" placeholder='enter tag ids' value={formData.tag_ids} onChange={handleChange} />
                </span>
              </div>

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
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M17.5 5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8C16.6716 8 16 7.32843 16 6.5C16 5.67157 16.6716 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.7884 12.3665C13.8097 11.9655 13.9222 11.232 13.3125 10.6744M13.3125 10.6744C13.1238 10.5019 12.866 10.3462 12.5149 10.2225C11.2583 9.77958 9.71484 11.2619 10.8067 12.6188C11.3936 13.3482 11.8461 13.5725 11.8035 14.4008C11.7735 14.9834 11.2012 15.5922 10.4469 15.824C9.7916 16.0255 9.06876 15.7588 8.61156 15.2479C8.05332 14.6241 8.1097 14.0361 8.10492 13.7798M13.3125 10.6744L14.0006 9.98633M8.66131 15.3256L8.00781 15.9791" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  <input type="number" name="price" placeholder="Enter sales price" value={formData.price} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label className='color_red'>Sales Account:</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M17.5 5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8C16.6716 8 16 7.32843 16 6.5C16 5.67157 16.6716 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.7884 12.3665C13.8097 11.9655 13.9222 11.232 13.3125 10.6744M13.3125 10.6744C13.1238 10.5019 12.866 10.3462 12.5149 10.2225C11.2583 9.77958 9.71484 11.2619 10.8067 12.6188C11.3936 13.3482 11.8461 13.5725 11.8035 14.4008C11.7735 14.9834 11.2012 15.5922 10.4469 15.824C9.7916 16.0255 9.06876 15.7588 8.61156 15.2479C8.05332 14.6241 8.1097 14.0361 8.10492 13.7798M13.3125 10.6744L14.0006 9.98633M8.66131 15.3256L8.00781 15.9791" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<CustomDropdown05
  label="Sales Account"
  options={accList?.data?.accounts || []}
  value={formData.sale_acc_id}
  onChange={handleChange}
  name="sale_acc_id"
  defaultOption="Select Sales Account"
/>

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
                <label>Purchase Price</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                  <input type="number" name="purchase_price" placeholder="Enter purchase price" value={formData.purchase_price} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Purchase Account</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
           

                  <CustomDropdown05
  label="Purchase Account"
  options={accList?.data?.accounts || []}
  value={formData.purchase_acc_id}
  onChange={handleChange}
  name="purchase_acc_id"
  defaultOption="Type or select vendor"
/>

                </span>
              </div>
              <div className="form-group">
                <label>Preferred vendor</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
    <path d="M20 22V17C20 15.1144 20 14.1716 19.4142 13.5858C18.8284 13 17.8856 13 16 13L12 22L8 13C6.11438 13 5.17157 13 4.58579 13.5858C4 14.1716 4 15.1144 4 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15L11.5 19L12 20.5L12.5 19L12 15ZM12 15L11 13H13L12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 6.5V5.5C15.5 3.567 13.933 2 12 2C10.067 2 8.5 3.567 8.5 5.5V6.5C8.5 8.433 10.067 10 12 10C13.933 10 15.5 8.433 15.5 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
           

                  <CustomDropdown05
  label="Purchase Account"
  options={accList?.data?.accounts || []}
  value={formData.purchase_acc_id}
  onChange={handleChange}
  name="purchase_acc_id"
  defaultOption="Select Purchase Account"
/>

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
            <div id="extrafieldx56s">
            
            <div className="form-group">
                <label>Tag ID's</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M17.5 5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8C16.6716 8 16 7.32843 16 6.5C16 5.67157 16.6716 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.7884 12.3665C13.8097 11.9655 13.9222 11.232 13.3125 10.6744M13.3125 10.6744C13.1238 10.5019 12.866 10.3462 12.5149 10.2225C11.2583 9.77958 9.71484 11.2619 10.8067 12.6188C11.3936 13.3482 11.8461 13.5725 11.8035 14.4008C11.7735 14.9834 11.2012 15.5922 10.4469 15.824C9.7916 16.0255 9.06876 15.7588 8.61156 15.2479C8.05332 14.6241 8.1097 14.0361 8.10492 13.7798M13.3125 10.6744L14.0006 9.98633M8.66131 15.3256L8.00781 15.9791" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  <input type="number" name="purchase_price" placeholder="Enter purchase price" value={formData.purchase_price} onChange={handleChange} />
                </span>
              </div>
            <div className="form-group">
                <label>Tax preference</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
    <path d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 10V18.5M8 10V18.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21.5 14.5L14.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="15.25" cy="15.25" r="0.75" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20.75" cy="20.75" r="0.75" stroke="currentColor" strokeWidth="1.5" />
</svg>
                  <input className='primarycolortext' type="number" name="purchase_price" placeholder="Enter purchase price" value={formData.purchase_price} onChange={handleChange} />
                </span>
              </div>
            </div>



            <div id="taxratessection">
            <p className="xkls5663">
              Default tax rates
              </p>
                    <span  className='newspanx21s'>
<div className="form-group">
                <label>Intra state tax rate:</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M15 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 13V11C21 6.75736 21 4.63604 19.682 3.31802C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.31802C3 4.63604 3 6.75736 3 11V13C3 17.2426 3 19.364 4.31802 20.682C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.682C21 19.364 21 17.2426 21 13Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H7.52632M11.7368 14H12.2632M16.4737 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18H7.52632M11.7368 18H12.2632M16.4737 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<select name="purchase_acc_id" value={formData?.purchase_acc_id} onChange={handleChange} >
                    <option value="">Select a tax</option>
                    {accList?.data?.accounts?.map(account => (
                      <option key={account.id} value={account.id}>{account.account_name}</option>
                    ))}
                  </select>               
                   </span>
              </div>
              <div className="form-group">
                <label>Inter state tax rate:</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#a6a6a6"} fill={"none"}>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M15 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 13V11C21 6.75736 21 4.63604 19.682 3.31802C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.31802C3 4.63604 3 6.75736 3 11V13C3 17.2426 3 19.364 4.31802 20.682C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.682C21 19.364 21 17.2426 21 13Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H7.52632M11.7368 14H12.2632M16.4737 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18H7.52632M11.7368 18H12.2632M16.4737 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  <select name="purchase_acc_id" value={formData?.purchase_acc_id} onChange={handleChange} >
                    <option value="">Select a tax</option>
                    {accList?.data?.accounts?.map(account => (
                      <option key={account.id} value={account.id}>{account.account_name}</option>
                    ))}
                  </select>
                </span>
              </div>
</span>

            </div>
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
