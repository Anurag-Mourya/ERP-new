import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,

    CREATE_SUB_CATEGORY_REQUEST,
    CREATE_SUB_CATEGORY_SUCCESS,
    CREATE_SUB_CATEGORY_ERROR,
} from '../Constants/categoriesConstants'

import axiosInstance from "../../Configs/axiosInstance";

export const createCategories = (queryParams) => async (dispatch) => {

    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/create/update`,
            queryParams
        );

        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_ERROR, payload: error.message });
    }
};

export const createSubCategories = (queryParams) => async (dispatch) => {

    dispatch({ type: CREATE_SUB_CATEGORY_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/create/update`,
            queryParams
        );

        dispatch({ type: CREATE_SUB_CATEGORY_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: CREATE_SUB_CATEGORY_ERROR, payload: error.message });
    }
};
