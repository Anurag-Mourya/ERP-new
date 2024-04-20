import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import "./Views/Items/ManageItems.scss";
import "./scss/Globalstyles.scss";
import router from "./Configs/Router";
import { RouterProvider } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { Provider } from "react-redux";
import store from "./Redux/Store";




import 'react-tooltip/dist/react-tooltip.css';


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider >
);


