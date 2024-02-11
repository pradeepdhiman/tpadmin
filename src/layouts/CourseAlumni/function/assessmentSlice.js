
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applicantList: [],
    activeRow: {}
};

const alumniSlice = createSlice({
    name: 'alumni',
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

export const { setApplicantlist, setActiveRow } = alumniSlice.actions;
export default alumniSlice;
