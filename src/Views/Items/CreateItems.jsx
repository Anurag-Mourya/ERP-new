import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import CircleLoader from '../../Components/Loaders/CircleLoader';
import { Link, useNavigate } from 'react-router-dom';
import { CiExport, CiImageOn } from 'react-icons/ci';
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
import { MdCheck } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';



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

useEffect(() => {
  if (masterData?.length > 0 && !formData.typeName) {
    const initialType = masterData.find(type => type.type === "5");
    if (initialType) {
      setFormData(prevFormData => ({
        ...prevFormData,
        typeName: initialType.label,
        type: initialType.labelid // Assuming you also want to set the type ID
      }));
    }
  }
}, [masterData, formData.typeName]);

  return (
    <div className='formsectionsgrheigh'>
      <TopLoadbar />
      <div id="Anotherbox" className='formsectionx1'>
        <div id="leftareax12">
          <h1 id="firstheading" className='headingofcreateforems'>
            {/* <img src={"/Icons/supplier-alt.svg"} alt="" /> */}
            <img src={"https://cdn-icons-png.freepik.com/512/5006/5006793.png?uid=R87463380&ga=GA1.1.683301158.1710405244"} alt="" />
            New Items
          </h1>
        </div>

        


        <div id="buttonsdata">
          <Link  to={"/dashboard/manage-items"} className="linkx3">
          <RxCross2 />
          </Link>
        </div>
      </div>
      
      {/* <div className="bordersinglestroke"></div> */}
      <div id='middlesection' >

        <div id="formofcreateitems">
          <form onSubmit={handleSubmit}>
            <div className="itemsformwrap">
            <div id="forminside">
              
              <div className="form-groupx1">
  <label>Type:</label>
  
  <span>
  {masterData?.map(type => {
        if (type?.type === "5") {
          return (
            <button
              key={type?.labelid}
              className={`type-button ${formData.typeName === type?.label ? 'selectedbtn' : ''}`}
              onClick={() => setFormData({ ...formData, typeName: type?.label })}
            >
              {type?.label}
              {formData.typeName === type?.label && <MdCheck  />}
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
                {/* <label>Name<b style={{fontWeight:300}} className='color_red'>*</b></label> */}
                <label  className='color_red'>Name*</label>
                <span>
                  {/* <CiEdit /> */}

                  <svg class="svgiconform" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path fill="#6b6b6b" d="m19.5,4h-4.5v-1c0-1.654-1.346-3-3-3s-3,1.346-3,3v1h-4.5C2.019,4,0,6.019,0,8.5v11c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5v-11c0-2.481-2.019-4.5-4.5-4.5Zm-9.5-1c0-1.103.897-2,2-2s2,.897,2,2v3c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-3Zm13,16.5c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5v-11c0-1.93,1.57-3.5,3.5-3.5h4.5v1c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-1h4.5c1.93,0,3.5,1.57,3.5,3.5v11Zm-14-8.5h-3c-1.103,0-2,.897-2,2v5c0,1.103.897,2,2,2h3c1.103,0,2-.897,2-2v-5c0-1.103-.897-2-2-2Zm1,7c0,.552-.448,1-1,1h-3c-.552,0-1-.448-1-1v-5c0-.552.448-1,1-1h3c.552,0,1,.448,1,1v5Zm10-2.5c0,.276-.224.5-.5.5h-6c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h6c.276,0,.5.224.5.5Zm0-4c0,.276-.224.5-.5.5h-6c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h6c.276,0,.5.224.5.5Zm-2,8c0,.276-.224.5-.5.5h-4c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h4c.276,0,.5.224.5.5Z"/>
</svg>

                  <input type="text" placeholder='Enter item name' name="name" value={formData.name} onChange={handleChange} />
                </span>
              </div>


              <div className="form-group">
                <label>Category</label>
                <span>
                <svg class="svgiconform" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m8.5,0h-4C2.019,0,0,2.019,0,4.5v4c0,.827.673,1.5,1.5,1.5h7c.827,0,1.5-.673,1.5-1.5V1.5c0-.827-.673-1.5-1.5-1.5Zm.5,8.5c0,.276-.224.5-.5.5H1.5c-.276,0-.5-.224-.5-.5v-4c0-1.93,1.57-3.5,3.5-3.5h4c.276,0,.5.224.5.5v7Zm4.5,1.5h7c.827,0,1.5-.673,1.5-1.5v-4c0-2.481-2.019-4.5-4.5-4.5h-4c-.827,0-1.5.673-1.5,1.5v7c0,.827.673,1.5,1.5,1.5Zm-.5-8.5c0-.276.224-.5.5-.5h4c1.93,0,3.5,1.57,3.5,3.5v4c0,.276-.224.5-.5.5h-7c-.276,0-.5-.224-.5-.5V1.5Zm-4.5,10.5H1.5c-.827,0-1.5.673-1.5,1.5v4c0,2.481,2.019,4.5,4.5,4.5h4c.827,0,1.5-.673,1.5-1.5v-7c0-.827-.673-1.5-1.5-1.5Zm.5,8.5c0,.276-.224.5-.5.5h-4c-1.93,0-3.5-1.57-3.5-3.5v-4c0-.276.224-.5.5-.5h7c.276,0,.5.224.5.5v7Zm14.854,2.646l-3-3c.705-.862,1.146-1.948,1.146-3.146,0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5c1.198,0,2.284-.441,3.146-1.146l3,3c.098.098.226.146.354.146s.256-.049.354-.146c.195-.195.195-.512,0-.707Zm-6.854-2.146c-2.206,0-4-1.794-4-4s1.794-4,4-4,4,1.794,4,4-1.794,4-4,4Z"/>
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
                <label>Sub Category</label>
                <span>
                  {/* <CiEdit /> */}
                  <svg class="svgiconform" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m8.5,0h-4C2.019,0,0,2.019,0,4.5v4c0,.827.673,1.5,1.5,1.5h7c.827,0,1.5-.673,1.5-1.5V1.5c0-.827-.673-1.5-1.5-1.5Zm.5,8.5c0,.276-.224.5-.5.5H1.5c-.276,0-.5-.224-.5-.5v-4c0-1.93,1.57-3.5,3.5-3.5h4c.276,0,.5.224.5.5v7Zm4.5,1.5h7c.827,0,1.5-.673,1.5-1.5v-4c0-2.481-2.019-4.5-4.5-4.5h-4c-.827,0-1.5.673-1.5,1.5v7c0,.827.673,1.5,1.5,1.5Zm-.5-8.5c0-.276.224-.5.5-.5h4c1.93,0,3.5,1.57,3.5,3.5v4c0,.276-.224.5-.5.5h-7c-.276,0-.5-.224-.5-.5V1.5Zm-4.5,10.5H1.5c-.827,0-1.5.673-1.5,1.5v4c0,2.481,2.019,4.5,4.5,4.5h4c.827,0,1.5-.673,1.5-1.5v-7c0-.827-.673-1.5-1.5-1.5Zm.5,8.5c0,.276-.224.5-.5.5h-4c-1.93,0-3.5-1.57-3.5-3.5v-4c0-.276.224-.5.5-.5h7c.276,0,.5.224.5.5v7Zm14.854,2.646l-3-3c.705-.862,1.146-1.948,1.146-3.146,0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5c1.198,0,2.284-.441,3.146-1.146l3,3c.098.098.226.146.354.146s.256-.049.354-.146c.195-.195.195-.512,0-.707Zm-6.854-2.146c-2.206,0-4-1.794-4-4s1.794-4,4-4,4,1.794,4,4-1.794,4-4,4Z"/>
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
                <label>SKU</label>
                <span>
                  {/* <CiEdit /> */}

                  <svg class="svgiconform" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M21.68,9.108L13.204,.723C12.655,.173,11.869-.089,11.098,.013L4.209,.955c-.274,.038-.466,.29-.428,.563,.037,.273,.293,.461,.562,.428l6.889-.942c.46-.066,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.01,4.94l-.19,.199c-.209-.677-.58-1.314-1.114-1.848L11.204,4.723c-.549-.55-1.337-.812-2.106-.709l-6.889,.942c-.228,.031-.404,.213-.43,.44l-.765,6.916c-.083,.759,.179,1.503,.72,2.044l8.417,8.326c.85,.85,1.979,1.318,3.181,1.318h.014c1.208-.004,2.341-.479,3.189-1.339l3.167-3.208c.886-.898,1.317-2.081,1.292-3.257l.708-.743c1.732-1.754,1.724-4.6-.022-6.345Zm-2.688,9.643l-3.167,3.208c-.66,.669-1.542,1.039-2.481,1.042h-.011c-.935,0-1.812-.364-2.476-1.027L2.439,13.646c-.324-.324-.48-.77-.431-1.225l.722-6.528,6.502-.889c.462-.063,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.017,4.934ZM8,10c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z"/></svg>

                  <input type="text" name="sku" placeholder='Enter SKU' value={formData.sku} onChange={handleChange} />
                </span>
              </div>



              <div className="form-group">
                <label>Unit</label>
                <span>
                  {/* <CiEdit /> */}
                  <svg class="svgiconform"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m6,10c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm0,3c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm5.331-2.903c.101-.389.044-.792-.158-1.137-.203-.346-.528-.592-.916-.692-.388-.103-.791-.045-1.139.159l-.223.131c-.407-.34-.881-.606-1.396-.786v-.271c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5,1.5v.271c-.515.18-.988.446-1.396.786l-.223-.131c-.347-.204-.75-.262-1.139-.159-.388.101-.713.347-.915.691-.203.346-.26.749-.159,1.138.101.388.347.713.691.915l.234.138c-.064.3-.095.576-.095.851s.03.551.094.85l-.233.138c-.345.203-.591.528-.691.916-.101.389-.044.792.158,1.137.203.346.528.592.916.692.389.103.792.045,1.139-.159l.223-.131c.407.34.881.606,1.396.786v.271c0,.827.673,1.5,1.5,1.5s1.5-.673,1.5-1.5v-.271c.515-.18.988-.446,1.396-.786l.223.131c.348.204.751.262,1.139.159.388-.101.713-.347.915-.691.203-.346.26-.749.159-1.138-.101-.388-.347-.713-.692-.917l-.232-.137c.063-.299.094-.575.094-.85s-.03-.551-.095-.851l.233-.137c.346-.203.592-.528.692-.916Zm-1.981.948c.103.361.15.665.15.955s-.048.594-.15.955c-.062.219.031.452.228.568l.555.325c.116.068.198.177.231.307.033.129.015.264-.054.379-.067.115-.175.197-.305.23-.132.032-.265.015-.379-.053l-.54-.318c-.195-.116-.446-.084-.607.077-.431.432-.984.743-1.604.903-.221.058-.375.257-.375.484v.642c0,.275-.225.5-.5.5s-.5-.225-.5-.5v-.642c0-.228-.154-.427-.375-.484-.619-.16-1.173-.472-1.604-.903-.096-.097-.225-.146-.354-.146-.087,0-.175.022-.254.069l-.54.318c-.113.068-.247.087-.379.053-.13-.033-.237-.115-.306-.231-.067-.114-.086-.249-.053-.378.033-.13.115-.238.23-.306l.556-.326c.196-.116.29-.35.228-.568-.103-.361-.15-.665-.15-.955s.048-.594.15-.955c.062-.219-.03-.452-.227-.567l-.557-.328c-.115-.067-.197-.176-.23-.305s-.015-.264.054-.379c.067-.115.175-.197.305-.23.13-.035.263-.015.379.053l.54.318c.196.117.447.085.607-.077.431-.432.984-.743,1.604-.903.221-.058.375-.257.375-.484v-.642c0-.275.225-.5.5-.5s.5.225.5.5v.642c0,.228.154.427.375.484.619.16,1.173.472,1.604.903.16.161.411.193.607.077l.54-.318c.113-.066.249-.086.379-.053s.237.115.306.231c.067.114.086.249.053.378s-.115.237-.231.306l-.556.327c-.196.115-.289.349-.227.567Zm8.701,1.455c.24,1.416,1.466,2.5,2.949,2.5,1.654,0,3-1.346,3-3s-1.346-3-3-3c-1.483,0-2.71,1.084-2.949,2.5h-3.051v-5.5c0-1.379,1.121-2.5,2.5-2.5h.551c.24,1.416,1.466,2.5,2.949,2.5,1.654,0,3-1.346,3-3s-1.346-3-3-3c-1.483,0-2.71,1.084-2.949,2.5h-.551c-1.93,0-3.5,1.57-3.5,3.5v5.5h-1.5c-.276,0-.5.224-.5.5s.224.5.5.5h1.5v5.5c0,1.93,1.57,3.5,3.5,3.5h.551c.24,1.416,1.466,2.5,2.949,2.5,1.654,0,3-1.346,3-3s-1.346-3-3-3c-1.483,0-2.71,1.084-2.949,2.5h-.551c-1.379,0-2.5-1.121-2.5-2.5v-5.5h3.051Zm2.949-2.5c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Zm0-9c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Zm0,18c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Z"/>
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
                <label>HSN code</label>
                <span>
 
<svg  class="svgiconform" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M4.874,17.955c-.128,0-.256-.049-.354-.146-.195-.195-.195-.512,0-.707l4.041-4.041c.585-.585,.585-1.536,0-2.121L4.52,6.898c-.195-.195-.195-.512,0-.707s.512-.195,.707,0l4.041,4.041c.975,.975,.975,2.561,0,3.535l-4.041,4.041c-.098,.098-.226,.146-.354,.146Zm19.126,1.545V4.5c0-2.481-2.019-4.5-4.5-4.5H4.5C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5ZM19.5,1c1.93,0,3.5,1.57,3.5,3.5v15c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5h15Zm.5,16.5c0-.276-.224-.5-.5-.5h-7c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h7c.276,0,.5-.224,.5-.5Z"/></svg>

                  {/* <CiReceipt /> */}
                  <input type="number" name="tax_rate" placeholder='Enter HSN code' enterKeyHint='tax rate' value={formData.tax_rate} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>Opening stock:</label>
                <span>
                <svg  class="svgiconform"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m4.5,5c1.378,0,2.5-1.121,2.5-2.5S5.878,0,4.5,0s-2.5,1.121-2.5,2.5,1.122,2.5,2.5,2.5Zm0-4c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5Zm2.5,8.5v14c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-6.5h-2.5c-.171,0-.335-.027-.5-.051v6.551c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-6.851c-1.178-.564-2-1.758-2-3.149v-4c0-1.93,1.57-3.5,3.5-3.5h11c.276,0,.5.224.5.5s-.224.5-.5.5H3.5c-1.378,0-2.5,1.121-2.5,2.5v4c0,1.379,1.122,2.5,2.5,2.5h2.5v-6.5c0-.276.224-.5.5-.5s.5.224.5.5Zm14.5,6.5h-1.513c.317-.419.513-.935.513-1.5v-3c0-1.379-1.122-2.5-2.5-2.5h-3c-1.378,0-2.5,1.121-2.5,2.5v3c0,.565.195,1.081.513,1.5h-1.513c-1.378,0-2.5,1.121-2.5,2.5v3c0,1.379,1.122,2.5,2.5,2.5h3c.821,0,1.544-.403,2-1.015.456.613,1.179,1.015,2,1.015h3c1.378,0,2.5-1.121,2.5-2.5v-3c0-1.379-1.122-2.5-2.5-2.5Zm-8-4.5c0-.827.673-1.5,1.5-1.5h3c.827,0,1.5.673,1.5,1.5v3c0,.827-.673,1.5-1.5,1.5h-3c-.827,0-1.5-.673-1.5-1.5v-3Zm1,11.5h-3c-.827,0-1.5-.673-1.5-1.5v-3c0-.827.673-1.5,1.5-1.5h3c.827,0,1.5.673,1.5,1.5v3c0,.827-.673,1.5-1.5,1.5Zm8.5-1.5c0,.827-.673,1.5-1.5,1.5h-3c-.827,0-1.5-.673-1.5-1.5v-3c0-.827.673-1.5,1.5-1.5h3c.827,0,1.5.673,1.5,1.5v3Zm-7.5-10c0-.276.224-.5.5-.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-.276,0-.5-.224-.5-.5Zm5.5,7c0,.276-.224.5-.5.5h-1c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h1c.276,0,.5.224.5.5Zm-7,0c0,.276-.224.5-.5.5h-1c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h1c.276,0,.5.224.5.5Z"/>
</svg>


                  {/* <MdOutlineInventory /> */}
                  <input type="number" name="inventory_level" placeholder='Enter stock quantity' value={formData.inventory_level} onChange={handleChange} />
                </span>
              </div>
              <div className="form-group">
                <label>As of date</label>
                <span>
                <svg  class="svgiconform" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m7.5,12h-2c-.827,0-1.5.673-1.5,1.5v2c0,.827.673,1.5,1.5,1.5h2c.827,0,1.5-.673,1.5-1.5v-2c0-.827-.673-1.5-1.5-1.5Zm.5,3.5c0,.276-.225.5-.5.5h-2c-.275,0-.5-.224-.5-.5v-2c0-.276.225-.5.5-.5h2c.275,0,.5.224.5.5v2ZM19.5,2h-1.5V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5H7V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-1.5C2.019,2,0,4.019,0,6.5v13c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V6.5c0-2.481-2.019-4.5-4.5-4.5Zm-15,1h15c1.93,0,3.5,1.57,3.5,3.5v1.5H1v-1.5c0-1.93,1.57-3.5,3.5-3.5Zm15,20H4.5c-1.93,0-3.5-1.57-3.5-3.5v-10.5h22v10.5c0,1.93-1.57,3.5-3.5,3.5Z"/></svg>


                  {/* <CiEdit /> */}
                  <input type="text" name="tag_ids" placeholder='Enter Date' value={formData.tag_ids} onChange={handleChange} />
                </span>
              </div>
              <div id="imgurlanddesc">
              <div className="form-group">
                <label>Upload Image</label>
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
                    {/* <CiImageOn /> */}
                    <div id='spc5s6'>
                   {/* <p> Drag & drop logo file</p> */}
                    {/* <br /> */}
                    {/* <p>or</p> */}
                    {/* <br /> */}
                    {/* <span id="extrabtnsx">
                    {formData.image_url ? formData.image_url.name : 'Browse Files'}
                  </span> */}
                  <CiExport />
                  {formData.image_url ? formData.image_url.name : 'Browse Files'}
                    </div>
                  </label>
                </div>
              </div>


              {/* <button type="submit">Submit</button> */}
            </div>
              </div>
          

            </div>
       

            {/* <div className="breakerci"></div> */}


       




        <div className="secondsecx15">
          
        <div id="dataofsalesprices">

              
<div className="x1inssalx5">

  <p className="xkls5663">
  <IoCheckbox />
  Sales information
  </p>
    <span className='newspanx21s'>
      
  <div className="form-group">
    {/* <label>Sales Price<b className='color_red'>*</b></label> */}
    
    <label  className='color_red'>Sales Price*</label>
    <span>
      {/* <IoPricetagOutline /> */}
      <svg class="svgiconform"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m22.671,12.925L13.592,3.932c-.762-.755-1.856-1.119-2.913-.984l-6.365.659L.854.146C.658-.049.342-.049.146.146S-.049.658.146.854l3.458,3.458-.724,6.645c-.084,1.03.291,2.039,1.027,2.768l9.065,8.969c.85.843,1.975,1.307,3.171,1.307h.018c1.202-.005,2.331-.478,3.178-1.33l3.355-3.383c1.745-1.761,1.735-4.614-.024-6.362Zm-.687,5.657l-3.355,3.383c-.658.664-1.535,1.031-2.471,1.035h-.014c-.931,0-1.806-.36-2.467-1.017L4.611,13.014c-.526-.521-.794-1.24-.735-1.963l.636-5.832,1.772,1.772c-.176.297-.284.64-.284,1.009,0,1.103.897,2,2,2s2-.897,2-2-.897-2-2-2c-.37,0-.712.108-1.009.284l-1.766-1.766,5.564-.576s.009,0,.014,0c.761-.104,1.541.161,2.087.702l9.078,8.992c1.368,1.359,1.376,3.579.018,4.947ZM8,7c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm11.032,6.285c-.332-.332-.771-.514-1.24-.514h-.01c-.474.002-.916.19-1.247.528l-3.209,3.285c-.671.686-.663,1.794.017,2.472l1.44,1.435c.332.33.771.512,1.239.512h.01c.471-.003.911-.189,1.241-.524l3.22-3.271c.674-.685.669-1.794-.011-2.474l-1.45-1.448Zm.748,3.221l-3.22,3.271c-.142.145-.332.224-.534.226h-.004c-.201,0-.391-.078-.534-.221l-1.44-1.435c-.292-.291-.296-.769-.007-1.063l3.209-3.285c.143-.146.333-.227.537-.228.207.023.395.077.538.221l1.45,1.448c.293.293.295.771.005,1.065Z"/>
</svg>

      <input type="number" name="price" placeholder="Enter sales price" value={formData.price} onChange={handleChange} />
    </span>
  </div>
  <div className="form-group">
    {/* <label>Sales Account<b className='color_red'>*</b></label> */}
                <label  className='color_red'>Sales Account*</label>
    <span className='primarycolortext'>
      {/* <IoPricetagOutline /> */}
      <svg class="svgiconform"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m22.671,12.925L13.592,3.932c-.762-.755-1.856-1.119-2.913-.984l-6.365.659L.854.146C.658-.049.342-.049.146.146S-.049.658.146.854l3.458,3.458-.724,6.645c-.084,1.03.291,2.039,1.027,2.768l9.065,8.969c.85.843,1.975,1.307,3.171,1.307h.018c1.202-.005,2.331-.478,3.178-1.33l3.355-3.383c1.745-1.761,1.735-4.614-.024-6.362Zm-.687,5.657l-3.355,3.383c-.658.664-1.535,1.031-2.471,1.035h-.014c-.931,0-1.806-.36-2.467-1.017L4.611,13.014c-.526-.521-.794-1.24-.735-1.963l.636-5.832,1.772,1.772c-.176.297-.284.64-.284,1.009,0,1.103.897,2,2,2s2-.897,2-2-.897-2-2-2c-.37,0-.712.108-1.009.284l-1.766-1.766,5.564-.576s.009,0,.014,0c.761-.104,1.541.161,2.087.702l9.078,8.992c1.368,1.359,1.376,3.579.018,4.947ZM8,7c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm11.032,6.285c-.332-.332-.771-.514-1.24-.514h-.01c-.474.002-.916.19-1.247.528l-3.209,3.285c-.671.686-.663,1.794.017,2.472l1.44,1.435c.332.33.771.512,1.239.512h.01c.471-.003.911-.189,1.241-.524l3.22-3.271c.674-.685.669-1.794-.011-2.474l-1.45-1.448Zm.748,3.221l-3.22,3.271c-.142.145-.332.224-.534.226h-.004c-.201,0-.391-.078-.534-.221l-1.44-1.435c-.292-.291-.296-.769-.007-1.063l3.209-3.285c.143-.146.333-.227.537-.228.207.023.395.077.538.221l1.45,1.448c.293.293.295.771.005,1.065Z"/>
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
    <label>Description</label>
    <textarea name="description" placeholder='Enter description' value={formData.description} onChange={handleChange} rows="4" />
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
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
    <span className='primarycolortext'>
      {/* <IoPricetagOutline /> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#9B7DCE"} fill={"none"}>
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
    <label>Description</label>
    <textarea name="description" placeholder='Enter description' value={formData.description} onChange={handleChange} rows="4" />
  </div>

        </div>




</div>


{/* <div className="breakerci"></div> */}


        </div>

<div id="thirdsec123s">
<div id="extrafieldx56s">

<div className="form-group">
    <label>Tag ID's</label>
    <span>
      {/* <IoPricetagOutline /> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
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
                <label>Intra state tax rate</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M15 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 13V11C21 6.75736 21 4.63604 19.682 3.31802C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.31802C3 4.63604 3 6.75736 3 11V13C3 17.2426 3 19.364 4.31802 20.682C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.682C21 19.364 21 17.2426 21 13Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H7.52632M11.7368 14H12.2632M16.4737 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18H7.52632M11.7368 18H12.2632M16.4737 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<CustomDropdown05
label="Sales Account"
options={accList?.data?.accounts || []}
value={formData.sale_acc_id}
onChange={handleChange}
name="sale_acc_id"
defaultOption="Select tax"
/>            
                   </span>
              </div>
              <div className="form-group">
                <label>Inter state tax rate</label>
                <span>
                  {/* <IoPricetagOutline /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M15 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 13V11C21 6.75736 21 4.63604 19.682 3.31802C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.31802C3 4.63604 3 6.75736 3 11V13C3 17.2426 3 19.364 4.31802 20.682C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.682C21 19.364 21 17.2426 21 13Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H7.52632M11.7368 14H12.2632M16.4737 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18H7.52632M11.7368 18H12.2632M16.4737 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<CustomDropdown05
label="Sales Account"
options={accList?.data?.accounts || []}
value={formData.sale_acc_id}
onChange={handleChange}
name="sale_acc_id"
defaultOption="Select tax"
/>           
                </span>
              </div>
</span>

            </div>
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
              {loading ? <CircleLoader /> : <p>Submit<BsArrowRight /></p>}
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
    </div>
  );
};

export default CreateAndUpdateItem;
