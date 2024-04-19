import React, { useEffect, useState } from "react";
import Topbar from "../../Components/NavigationBars/Topbar";
import axios from "axios";
import "./settings.scss";
import { Toaster, toast } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDropright } from "react-icons/io";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Settings = () => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(`${apiUrl}/user/getloggedinuser`);

        const { user } = response.data;

        // Store user data and access token in local storage
        localStorage.setItem("UserData", JSON.stringify(user));
        if (response.data.success) {
          setLoggedInUserData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
        toast.error(
          "Failed to fetch logged-in user data. Please try again later."
        );
      }
    };

    fetchLoggedInUser();

    // Clean up function
    return () => {
      // Cleanup if needed
    };
  }, []);
  return (
    <><TopLoadbar/>
      <Topbar loggedInUserData={loggedInUserData} />
      <div id="settingcomponent">
        <div id="saearchboxsgak">
          <div id="searchbartopset">
            <h2>Settings</h2>
           <span>
           <input type="text" placeholder="search..." /> <IoSearchOutline />
           </span>
          </div>

          <Link id="backtojomeoslskcjkls" to={"/dashboard/home"}><IoIosArrowBack /> Back to Home</Link>
        </div>

        <div id="mainsectionsblocksofsettings">
            <div className="blockinsidedatalinksxls">
                <div id="blockzls56">
                <img src="https://cdn-icons-png.freepik.com/512/8099/8099221.png?ga=GA1.1.1034769832.1711897768&" alt="" />
                <h3>Organization</h3>
                </div>
                <ul>
                    <li><Link to={"/settings/organisations"}>Manage Organizations<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/settings/create-organisations"}>Create Organization <GoPlusCircle /></Link></li>
                    <li><Link to={"/invite-user-to-organization"}>Invite User<GoPlusCircle /></Link></li>
                    <li><Link to={"/organization-users"}>Users<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/settings/user-roles"}>Roles<IoIosArrowDropright /></Link></li>
                </ul>
            </div>
            <div className="blockinsidedatalinksxls">
                <div id="blockzls56">
                <img src="https://cdn-icons-png.freepik.com/512/8229/8229405.png?ga=GA1.1.1034769832.1711897768&" alt="" />
                <h3>Warehouse</h3>
                </div>
                <ul>
                    <li><Link to={"/settings/warehouse"}>Manage Warehouse<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/settings/create-warehouse"}>Create Warehouse<GoPlusCircle /></Link></li>
                </ul>
            </div>

            <div className="blockinsidedatalinksxls">
                <div id="blockzls56">
                <img src="https://cdn-icons-png.freepik.com/512/1090/1090439.png?ga=GA1.2.319081263.1712270031&" alt="" />
                <h3>Items</h3>
                </div>
                <ul>
                    <li><Link to={"/dashboard/manage-items"}>Items<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/dashboard/create-items"}>Create Items<GoPlusCircle /></Link></li>
                    <li><Link to={"/dashboard/stock-adjustment"}>Stock Adjustment<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/dashboard/items-categories"}>Categories<IoIosArrowDropright /></Link></li>
                </ul>
            </div>

            <div className="blockinsidedatalinksxls">
                <div id="blockzls56">
                <img src="https://cdn-icons-png.freepik.com/512/891/891462.png?ga=GA1.2.319081263.1712270031&" alt="" />
                <h3>Sales</h3>
                </div>
                <ul>
                    <li><Link to={"/dashboard/customers"}>Customers<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/dashboard/create-customer"}>Create Customer<GoPlusCircle /></Link></li>
                    <li><Link to={"/dashboard/quotation"}>Quotation<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/dashboard/create-quotation"}>Create Quotation<GoPlusCircle /></Link></li>
                    <li><Link to={"/dashboard/sales-orders"}>Sales Orders<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/dashboard/create-sales-order"}>Create Sale Order<GoPlusCircle /></Link></li>
                    <li><Link to={"/dashboard/invoices"}>Invoices<IoIosArrowDropright /></Link></li>
                    <li><Link to={"/dashboard/create-invoice"}>Create Invoices<GoPlusCircle /></Link></li>
                </ul>
            </div>










            {/* <div className="blockinsidedatalinksxls">sd</div> */}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Settings;
