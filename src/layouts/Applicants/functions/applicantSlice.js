
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applicantList: [],
    activeRow: {}
};

const applicantSlice = createSlice({
    name: 'applicant',
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

export const { setApplicantlist, setActiveRow } = applicantSlice.actions;
export default applicantSlice;
