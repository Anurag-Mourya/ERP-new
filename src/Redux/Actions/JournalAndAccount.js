import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    JOURNAL_DETAIL_REQUEST,
    JOURNAL_DETAIL_SUCCESS,
    JOURNAL_DETAIL_ERROR,

} from "../Constants/JournalAndAccountConst";

export const JournalDetails = (queryParams, Navigate) => async (dispatch) => {
    try {
        dispatch({ type: JOURNAL_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/journal/details',
            queryParams
        );

        dispatch({
            type: JOURNAL_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

    } catch (error) {
        dispatch({ type: JOURNAL_DETAIL_ERROR, payload: error.message });
    }
};
