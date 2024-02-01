
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courseList: [],
    activeRow: {}
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourseList: (state, action) => {
            state.courseList = action.payload;
        },
        setActiveRow: (state, { payload }) => {
            state.activeRow = payload
        }
    },
});

export const { setCourseList, setActiveRow } = coursesSlice.actions;
export default coursesSlice;
