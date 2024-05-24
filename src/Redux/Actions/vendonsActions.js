import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    VIEW_VENDOS_VIEW_REQUEST,
    VIEW_VENDOS_VIEW_SUCCESS,
    VIEW_VENDOS_VIEW_ERROR,

    CREATE_VENDOS_REQUEST,
    CREATE_VENDOS_SUCCESS,
    CREATE_VENDOR_ERROR,

    // VENDOS_STATUS_REQUEST,
    // VENDOS_STATUS_SUCCESS,
    // VENDOR_STATUS_ERROR,

    // VENDOS_DELETE_REQUEST,
    // VENDOS_DELETE_SUCCESS,
    // VENDOR_DELETE_ERROR,
} from '../Constants/vendorConstants'

export const vendorssView = (queryParams) => async (dispatch) => {

    dispatch({ type: VIEW_VENDOS_VIEW_REQUEST });
    try {
        const response = await axiosInstance.post(`/vendors/view`,
            queryParams
        );

        dispatch({ type: VIEW_VENDOS_VIEW_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: VIEW_VENDOS_VIEW_ERROR, payload: error.message });
    }
};

export const createVerndors = (queryParams, Navigate, editDub) => async (dispatch) => {

    dispatch({ type: CREATE_VENDOS_REQUEST });
    try {
        const response = await axiosInstance.post(`/vendors/create/update`,
            queryParams
        );

        dispatch({ type: CREATE_VENDOS_SUCCESS, payload: response.data });

        if (editDub === "edit" && (response?.data?.message === "Record Updated Successfully")) {
            toast.success(response?.data?.message);
            // Navigate('/dashboard/customers');
        } else if (editDub === "dublicate" && (response?.data?.message === "Record Created Successfully")) {
            toast.success("Customer Dublicated Successfully");
            // Navigate('/dashboard/customers');
        } else if (response?.data?.message === "Record Created Successfully") {
            toast.success(response?.data?.message);
            // Navigate('/dashboard/customers');
        }
        else {
            toast.error(response?.data?.message);
        }

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: CREATE_VENDOR_ERROR, payload: error.message });
        toast.error("Something went wrong thorw error");

    }
};

// export const vendorsStatus = (queryParams, Navigate, editDub) => async (dispatch) => {

//     dispatch({ type: VENDOS_STATUS_REQUEST });
//     dispatch({ type: VENDOS_STATUS_REQUEST });
//     try {
//         const response = await axiosInstance.post(`/vendors/status`,
//             queryParams
//         );

//         dispatch({ type: VENDOS_STATUS_SUCCESS, payload: response.data });
//         dispatch({ type: VENDOS_STATUS_SUCCESS, payload: response.data });

//         if (editDub === "edit" && (response?.data?.message === "Record Updated Successfully")) {
//             toast.success(response?.data?.message);
//             // Navigate('/dashboard/customers');
//         } else if (editDub === "dublicate" && (response?.data?.message === "Record Created Successfully")) {
//             toast.success("Customer Dublicated Successfully");
//             // Navigate('/dashboard/customers');
//         } else if (response?.data?.message === "Record Created Successfully") {
//             toast.success(response?.data?.message);
//             // Navigate('/dashboard/customers');
//         }
//         else {
//             toast.error(response?.data?.message);
//         }

//         console.log("data from actions", response.data);

//     } catch (error) {
//         dispatch({ type: VENDOR_STATUS_ERROR, payload: error.message });
//         dispatch({ type: VENDOR_STATUS_ERROR, payload: error.message });
//         toast.error("Something went wrong thorw error");

//     }
// };