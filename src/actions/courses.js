import {getCourses} from "../services/courseServices";

export const getAllCourses = () => {
    return async dispatch => {
        const {data} = await getCourses();
        await dispatch({type: 'INIT', payload: data.courses});
    }
}