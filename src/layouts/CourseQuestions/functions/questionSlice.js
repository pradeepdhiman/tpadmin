
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questionList: {},
    loading: false,
    editid: "",
    course: {},
    activeRow:{}
};

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestionList: (state, action) => {
            state.questionList = action.payload;
        },
        setQuestionloading: (state, { payload }) => {
            state.loading = payload
        },
        setQuestionEdit: (state, { payload }) => {
            state.editid = payload
        },
        setQuestionCourse: (state, { payload }) => {
            state.course = payload
        },
        setActiveRow: (state, { payload }) => {
            state.activeRow = payload
        }
    },
});

export const {setActiveRow, setQuestionList, setQuestionloading, setQuestionEdit, setQuestionCourse } = questionSlice.actions;
export default questionSlice;
