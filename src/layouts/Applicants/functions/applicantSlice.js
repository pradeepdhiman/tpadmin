
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applicantList: [],
    loading: false,
    editid:""
};

const applicantSlice = createSlice({
    name: 'applicant',
    initialState,
    reducers: {
        setApplicantlist: (state, action) => {
            state.applicantList = action.payload;
        },
        setApplicantloading: (state, { payload }) => {
            state.loading = payload
        },
        setApplicantedit: (state, { payload }) => {
            state.editid = payload
        }
    },
});

export const { setApplicantlist, setApplicantloading, setApplicantedit } = applicantSlice.actions;
export default applicantSlice;
