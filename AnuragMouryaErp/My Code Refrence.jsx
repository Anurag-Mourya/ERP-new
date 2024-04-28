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

