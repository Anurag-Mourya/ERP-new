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



