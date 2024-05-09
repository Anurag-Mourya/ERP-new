import axiosInstance from '../../Configs/axiosInstance';
import {
    QUOTATION_DETAIL_REQUEST,
    QUOTATION_DETAIL_SUCCESS,
    QUOTATION_DETAIL_ERROR,
    QUOTATION_UPDATE_REQUEST,
    QUOTATION_UPDATE_SUCCESS,
    QUOTATION_UPDATE_ERROR
} from "../Constants/quotationConstants";

export const quotationDetails = (queryParams) => async (dispatch) => {
    try {
        dispatch({ type: QUOTATION_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            'https://account.devstronauts.in/api/sales/create/update',
            queryParams
        );

        dispatch({
            type: QUOTATION_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: QUOTATION_DETAIL_ERROR, payload: error.message });
    }
};

export const updateQuotation = (quotationData) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: QUOTATION_UPDATE_REQUEST });

        const { data } = await axiosInstance.post(
            `/sales/create/update`,
            quotationData
        );

        dispatch({
            type: QUOTATION_UPDATE_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: QUOTATION_UPDATE_ERROR, payload: error.message });
    }
};



