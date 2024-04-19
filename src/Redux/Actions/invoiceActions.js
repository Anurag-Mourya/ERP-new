import axiosInstance from '../../Configs/axiosInstance';
import {
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_SUCCESS,
    INVOICE_DETAIL_ERROR,

} from "../Constants/invoiceConstants";

export const invoiceDetails = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: INVOICE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/invoice/details`,
            queryParams,
        );

        dispatch({
            type: INVOICE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: INVOICE_DETAIL_ERROR, payload: error.message });
    }
};