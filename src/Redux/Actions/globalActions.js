import axiosInstance from "../../Configs/axiosInstance";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchMasterData = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        try {
            const response = await axiosInstance.post(`${apiUrl}/master/fetch/required`);
            dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
        }
    };
};