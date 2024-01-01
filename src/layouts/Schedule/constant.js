import * as yup from 'yup';

export const initialValue = {
    scheduledID: "",
    courseID: "",
    courseName: "",
    applicantID: "",
    applicantName: "",
    courseType: "",
    startDate: "",
    endDate: "",
    scheduleCreatedDateTime: "",
    validityDateTime: "",
    location: "",
    instructor: "",
    courseActivity: "",
    courseStatus: "",
    status: "",
    createdById: "",
    updatedById: "",
    updatedDate: "",
    isDeleted: "",
    remarks: "",
}

export const fields = {
    courseType: { label: "Course Type", placeholder: "Course Type", hidden: false },
    startDate: { label: "Start Date", placeholder: "Start Date", hidden: false, type: "date" },
    endDate: { label: "End Date", placeholder: "End Date", hidden: false, type: "date" },
    scheduleCreatedDateTime: { label: "Schedule Created Datetime", placeholder: "Schedule Created Datetime", hidden: false, type: "date" },
    validityDateTime: { label: "Validity Datetime", placeholder: "Validity Datetime", hidden: false, type: "date" },
    location: { label: "Location", placeholder: "Location", hidden: false },
    instructor: { label: "Instructor", placeholder: "Instructor", hidden: false },
    courseActivity: { label: "Course Activity", placeholder: "Course Activity", hidden: false },
    courseStatus: { label: "Course Status", placeholder: "Course Status", hidden: false },
    remarks: { label: "Remarks", placeholder: "Remarks", hidden: false }
}


export const schema = yup.object().shape({
    courseType: yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    scheduleCreatedDateTime: yup.date(),
    validityDateTime: yup.date(),
    location: yup.string(),
    instructor: yup.string(),
    courseActivity: yup.number(),
    courseStatus: yup.string(),
    remarks: yup.string(),
});


export const scheduletableheads = [
    { name: "scheduledID", label: "Scheduled ID", align: "left" },
    { name: "courseID", label: "Course ID", align: "left" },
    { name: "courseName", label: "Course Name", align: "left" },
    { name: "applicantID", label: "Applicant ID", align: "left" },
    { name: "applicantName", label: "Applicant Name", align: "left" },
    { name: "courseType", label: "Course Type", align: "left" },
    { name: "startDate", label: "Start Date", align: "left" },
    { name: "endDate", label: "End Date", align: "left" },
    { name: "scheduleCreatedDateTime", label: "Schedule Created DateTime", align: "left" },
    { name: "validityDateTime", label: "Validity DateTime", align: "left" },
    { name: "location", label: "Location", align: "left" },
    { name: "instructor", label: "Instructor", align: "left" },
    { name: "courseActivity", label: "Course Activity", align: "left" },
    { name: "courseStatus", label: "Course Status", align: "left" },
    { name: "status", label: "Status", align: "left" },
    { name: "createdById", label: "Created By ID", align: "left" },
    { name: "updatedById", label: "Updated By ID", align: "left" },
    { name: "updatedDate", label: "Updated Date", align: "left" },
    { name: "isDeleted", label: "Is Deleted", align: "left" },
    { name: "remarks", label: "Remarks", align: "left" },
];
