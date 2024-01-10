
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questionList: {},
    loading: false,
    editid: "",
    course: {}
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
        }
    },
});

export const { setQuestionList, setQuestionloading, setQuestionEdit, setQuestionCourse } = questionSlice.actions;
export default questionSlice;
