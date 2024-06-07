import axiosInstance from '../../Configs/axiosInstance';
import {
    SERCH_ITMES_REQUEST,
    SERCH_ITMES_SUCCESS,
    SERCH_ITMES_ERROR,
} from "../Constants/serchFiltersConstants";


export const invoiceLists = (data) => async dispatch => {
    dispatch({ type: SERCH_ITMES_REQUEST });
    try {
        const response = await axiosInstance.post(`/invoice/list`, data);
        dispatch({ type: SERCH_ITMES_SUCCESS, payload: response?.data });
    } catch (error) {
        dispatch({ type: SERCH_ITMES_ERROR, payload: error.message });
    }
};