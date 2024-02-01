
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applicantList: [],
    activeRow: {}
};

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        setApplicantlist: (state, action) => {
            state.applicantList = action.payload;
        },
        setActiveRow: (state, { payload }) => {
            state.activeRow = payload
        }
    },
});

export const { setApplicantlist, setActiveRow } = assessmentSlice.actions;
export default assessmentSlice;
