
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courseList: {},
    loading: false,
    editid: ""
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourseList: (state, action) => {
            state.courseList = action.payload;
        },
        setCourseloading: (state, { payload }) => {
            state.loading = payload
        },
        setCourseEdit: (state, { payload }) => {
            state.editid = payload
        }
    },
});

export const { setCourseList, setCourseloading, setCourseEdit } = coursesSlice.actions;
export default coursesSlice;
