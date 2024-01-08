
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scheduleList: {},
    loading: false,
    editid: "",
    course: {},
    activeRow: {}
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setScheduleList: (state, action) => {
            state.scheduleList = action.payload;
        },
        setScheduleloading: (state, { payload }) => {
            state.loading = payload
        },
        setScheduleEdit: (state, { payload }) => {
            state.editid = payload
        },
        setScheduleCourse: (state, { payload }) => {
            state.course = payload
        },
        setActiveRow: (state, { payload }) => {
            state.activeRow = payload
        }
    },
});

export const { setActiveRow, setScheduleList, setScheduleloading, setScheduleEdit, setScheduleCourse } = scheduleSlice.actions;
export default scheduleSlice;
