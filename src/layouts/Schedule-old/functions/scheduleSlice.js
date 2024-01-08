
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scheduleList: {},
    loading: false,
    editid: "",
    course: {}
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
        }
    },
});

export const { setScheduleList, setScheduleloading, setScheduleEdit, setScheduleCourse } = scheduleSlice.actions;
export default scheduleSlice;
