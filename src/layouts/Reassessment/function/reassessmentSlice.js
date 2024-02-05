
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applicantList: [],
    activeRow: {}
};

const reassessmentSlice = createSlice({
    name: 'reassessment',
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

export const { setApplicantlist, setActiveRow } = reassessmentSlice.actions;
export default reassessmentSlice;
