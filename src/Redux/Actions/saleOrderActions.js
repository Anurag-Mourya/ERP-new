import axiosInstance from '../../Configs/axiosInstance';
import {
    SALE_DETAIL_REQUEST,
    SALE_DETAIL_SUCCESS,
    SALE_DETAIL_ERROR,

} from "../Constants/saleOrderConstants";

export const saleOrderDetails = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: SALE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/sales-order/details`,
            queryParams,
        );

        dispatch({
            type: SALE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: SALE_DETAIL_ERROR, payload: error.message });
    }
};