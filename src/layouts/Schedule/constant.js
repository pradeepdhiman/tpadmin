import * as yup from 'yup';

export const initialValue = {
    scheduledID: 0,
    scheduledName: "",
    startDate: "",
    endDate: "",
    scheduleCreatedDateTime: "",
    validityDateTime: "",
    location: "",
    instructor: "",
    createdById: 0,
    remarks: ""
}


export const fields = {
    scheduledName: { label: "Schedule name", placeholder: "Schedule name", hidden: false },
    startDate: { label: "Start date", placeholder: "Start date", hidden: false, type:"date" },
    endDate: { label: "End date", placeholder: "End date", hidden: false, type:"date" },
    scheduleCreatedDateTime: { label: "Create datetime", placeholder: "Create datetime", hidden: false, type:"date" },
    validityDateTime: { label: "Validity datetime", placeholder: "Validity datetime", hidden: false, type:"date" },
    location: { label: "Location", placeholder: "Location", hidden: false },
    instructor: { label: "Instructor", placeholder: "Validity datetime", hidden: false },
    remarks: { label: "Remarks", placeholder: "Remarks", hidden: false },
}
export const editmodefields = {
    scheduledName: { label: "Schedule name", placeholder: "Schedule name", hidden: false },
    startDate: { label: "Start date", placeholder: "Start date", hidden: false, type:"date" },
    endDate: { label: "End date", placeholder: "End date", hidden: false, type:"date" },
    scheduleCreatedDateTime: { label: "Create datetime", placeholder: "Create datetime", hidden: false, type:"date", disabled:true },
    validityDateTime: { label: "Validity datetime", placeholder: "Validity datetime", hidden: false, type:"date" },
    location: { label: "Location", placeholder: "Location", hidden: false },
    instructor: { label: "Instructor", placeholder: "Validity datetime", hidden: false },
    remarks: { label: "Remarks", placeholder: "Remarks", hidden: false },
}


export const schema = yup.object().shape({
    scheduledName: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    scheduleCreatedDateTime: yup.date().required(),
    validityDateTime: yup.date().required(),
    location: yup.string().required(),
    instructor: yup.string().required(),
    remarks: yup.string()
});


export const scheduletableheads = [
    { name: "scheduledID", label: "Scheduled ID", align: "left" },
    { name: "startDate", label: "Start Date", align: "left" },
    { name: "endDate", label: "End Date", align: "left" },
    { name: "scheduleCreatedDateTime", label: "Schedule Created DateTime", align: "left" },
    { name: "validityDateTime", label: "Validity DateTime", align: "left" },
    { name: "location", label: "Location", align: "left" },
    { name: "instructor", label: "Instructor", align: "left" },
    { name: "status", label: "Status", align: "left" },
    { name: "createdById", label: "Created By ID", align: "left" },
    { name: "updatedById", label: "Updated By ID", align: "left" },
    { name: "updatedDate", label: "Updated Date", align: "left" },
    { name: "isDeleted", label: "Is Deleted", align: "left" },
    { name: "remarks", label: "Remarks", align: "left" },
    // { name: "action", label: "action", align: "left" },
];

