import axiosInstance from '../../Configs/axiosInstance';
import {
    CREDIT_NOTE_DETAIL_REQUEST,
    CREDIT_NOTE_DETAIL_SUCCESS,
    CREDIT_NOTE_DETAIL_ERROR,
} from "../Constants/noteConstants";

export const creditNotesDetails = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: CREDIT_NOTE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/credit-note/details`,
            queryParams,
        );

        const { message, status } = data;

        dispatch({
            type: CREDIT_NOTE_DETAIL_SUCCESS,
            payload: {
                message,
                status
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: CREDIT_NOTE_DETAIL_ERROR, payload: error.message });
    }
};