import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    PURCHASES_CREATE_REQUEST,
    PURCHASES_CREATE_SUCCESS,
    PURCHASES_CREATE_ERROR,
} from '../Constants/purchasesConstants.js';


export const createPurchases = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: PURCHASES_CREATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/create/update`,
            queryParams
        );

        dispatch({ type: PURCHASES_CREATE_SUCCESS, payload: response.data });

        if (response?.data?.message === "Transaction Created Successfully") {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }

    } catch (error) {
        dispatch({ type: PURCHASES_CREATE_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};