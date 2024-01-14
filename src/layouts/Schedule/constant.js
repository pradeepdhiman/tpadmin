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
    startDate: { label: "Start date", placeholder: "Start date", hidden: false, type: "date" },
    endDate: { label: "End date", placeholder: "End date", hidden: false, type: "date" },
    scheduleCreatedDateTime: { label: "Create datetime", placeholder: "Create datetime", hidden: false, type: "date" },
    validityDateTime: { label: "Validity datetime", placeholder: "Validity datetime", hidden: false, type: "date" },
    location: { label: "Location", placeholder: "Location", hidden: false },
    instructor: { label: "Instructor", placeholder: "Validity datetime", hidden: false },
    remarks: { label: "Remarks", placeholder: "Remarks", hidden: false },
}
export const editmodefields = {
    scheduledName: { label: "Schedule name", placeholder: "Schedule name", hidden: false },
    startDate: { label: "Start date", placeholder: "Start date", hidden: false, type: "date" },
    endDate: { label: "End date", placeholder: "End date", hidden: false, type: "date" },
    scheduleCreatedDateTime: { label: "Create datetime", placeholder: "Create datetime", hidden: false, type: "date", disabled: true },
    validityDateTime: { label: "Validity datetime", placeholder: "Validity datetime", hidden: false, type: "date" },
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
    { name: "scheduledName", label: "Scheduled Name", align: "left" },
    { name: "courseName", label: "Course Name", align: "left" },
    { name: "statusName", label: "Status Name", align: "left" },
    { name: "instructorName", label: "instructor Name", align: "left" },
    { name: "locationName", label: "Location Name", align: "left" },
    { name: "startDate", label: "Start Date", align: "left" },
    { name: "endDate", label: "End Date", align: "left" },
    { name: "scheduleCreatedDateTime", label: "Schedule Created DateTime", align: "left" },
    { name: "validityDateTime", label: "Validity DateTime", align: "left" },

];
