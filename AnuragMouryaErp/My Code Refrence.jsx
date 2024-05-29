// change the key name conditinally
const [formData, setFormData] = useState({
  name: categoryData?.name || "",
  fullurl: null,
  [categoryData?.id ? "id" : "parent_id"]: categoryData?.id || 0,
  description: null
});
// change the key name conditinally


// 2. Create a query params on onclick
const handleEditItems = () => {
  const queryParams = new URLSearchParams();
  queryParams.set("id", itemId);
  queryParams.set("edit", true);
  navigate(`/dashboard/create-items?${queryParams.toString()}`);
  // show url after click is dashboard/create-items?id=73&edit=true...
  //we have to be define only /dashboard/create-items in router...
};
// 2. Create a query params on onclick


// 3. get params in urls dashboard/create-items?id=73&edit=true
const params = new URLSearchParams(location.search);
const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
// 3. get params in urls dashboard/create-items?id=73&edit=true

//4. how to remount api data on changes in that api with states..
const [clickTrigger, setClickTrigger] = useState(false);

const deleteHandler = (id) => {
  try {
    dispatch(deleteCategories())
      .then(() => {
        if (deleteCategory?.data?.success === true) {
          setClickTrigger((prevTrigger) => !prevTrigger);
        }
      })
  } catch (e) {
  }
}

useEffect(() => {
  dispatch(subCategoriesList());
}, [clickTrigger])
//4. how to remount api data on changes in that api with states..




5.// checkbox for active and inactive if lots of api data is comming...
const [checkedMap, setCheckedMap] = useState({});
const categoryStatus = useSelector(state => state?.categoryStatus);
useEffect(() => {
  const initialCheckedMap = {};
  sub_category?.forEach(subcategory => {
    initialCheckedMap[subcategory.id] = (+subcategory.active);
  });
  setCheckedMap(initialCheckedMap);
}, [subCategoryList]);

const toggleCheckbox = (id) => {
  const newCheckedMap = { ...checkedMap };
  newCheckedMap[id] = newCheckedMap[id] === 1 ? 0 : 1;

  setCheckedMap(newCheckedMap);
  const updatedSubCategory = {
    id: id,
    active: newCheckedMap[id],
  };
  dispatch(categoriesChangeStatus(updatedSubCategory)); // Dispatch update action
};
//  jsx
{
  sub_category?.map((subcategory, index) => (
    <input
      type="checkbox"
      checked={checkedMap[subcategory.id] === 1}
      onChange={() => toggleCheckbox(subcategory.id)}
    />
  ))
}
//  jsx 
5.// checkbox for active and inactive if lots of api data is comming...



// 6.TypeError: Cannot read properties of undefined (reading '0')  while i refresh the page
const subCategoryList = useSelector(state => state?.subCategoryList?.data?.data[0]);
if (Array.isArray(subCategoryList) && subCategoryList.length > 0) {
  // your logic
}
// 6.TypeError: Cannot read properties of undefined (reading '0')  while i refresh the page


// 7. How to use react useState as a function 
const [basicDetails, setBasicDetails] = useState(() => {
  const savedBasicDetails = sessionStorage.getItem('basicDetails');
  return savedBasicDetails ? JSON.parse(savedBasicDetails) : {
    salutation: "",
    first_name: "",
  };
});
console.log("basicDetails", basicDetails)//return like usual states {  salutation: "",first_name: "",}

// 7. How to use react useState as a function


// 8. for create this type of state
const [basicDetails, setBasicDetails] = useState({
  upload_documents:
    [
      { 1: "img url" },
      { 2: "img url" },
    ]
})
//solve
const updatedUploadDocuments = [...basicDetails.upload_documents];

// or?
// const updatedUploadDocuments = Array.isArray(basicDetails.upload_documents)
//   ? [...basicDetails.upload_documents]
//   : [];
// or?

updatedUploadDocuments.push({ [updatedUploadDocuments.length + 1]: url });
setBasicDetails({
  ...basicDetails,
  upload_documents: updatedUploadDocuments
});
// 8. for create this type of state


//9. how I send event on Onclick function
const handleSortBySelection = (sortBy, event) => {
  if (sortBy === 'Date') {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    console.log("Selected Date:", selectedDate);
  }
};

<input type="date" name="date" id="" onClick={(event) => handleSortBySelection('Date', event)} />
//how I send event on Onclick function


// 10.for current date
const currentDate = new Date().toISOString().slice(0, 10);
// 2024-05-08 examples....
// 10.for current date



//how to perform funtion inside jsx input and how to set nested array of object a value
const [formData, setFormData] = useState({
  transaction_id: 0,
  entries: [
    {
      amount: null,
      balance_amount: null
    }
  ]
});


<input
  type="number"
  value={item.amount}
  onChange={(e) => {
    const newValue = parseFloat(e.target.value);
    if ((+newValue) <= invoiceDatas?.total_amount) {
      // nested value
      setFormData((prevFormData) => ({
        ...prevFormData,
        entries: prevFormData.entries.map((entry, i) =>
          i === index ? { ...entry, amount: newValue } : entry
        )
      }));
      // nested value
    } else {
      toast('The amount entered here is more then the amount paid by the customer', {
        icon: '👏', style: {
          borderRadius: '10px', background: '#333',
          color: '#fff', fontSize: '14px',
        },
      }
      );
    }
  }}

/>
//how to perform funtion inside jsx input and how to set nested array of object a value
