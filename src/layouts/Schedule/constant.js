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
  scheduledName: yup.string().required('Scheduled Name is required'),
  startDate: yup
    .date()
    .required('Start Date is required')
    .min(new Date(), 'Start Date cannot be less than today'),
  endDate: yup
    .date()
    .required('End Date is required')
    .min(yup.ref('startDate'), 'End Date cannot be less than Start Date'),
  scheduleCreatedDateTime: yup
    .date()
    .required('Schedule Created Date Time is required'),
  validityDateTime: yup
    .date()
    .required('Validity Date Time is required')
    .min(yup.ref('startDate'), 'Validity Date Time cannot be less than Start Date'),
  location: yup.string().required('Location is required'),
  instructor: yup.string().required('Instructor is required'),
  remarks: yup.string(),
});


export const scheduletableheads = [
  { name: "scheduledName", label: "Scheduled Name", align: "left", type: "string" },
  { name: "courseName", label: "Course Name", align: "left", type: "string" },
  { name: "statusName", label: "Status Name", align: "left", type: "string" },
  { name: "instructorName", label: "instructor Name", align: "left", type: "string" },
  { name: "locationName", label: "Location Name", align: "left", type: "string" },
  { name: "startDate", label: "Start Date", align: "left", type: "date" },
  { name: "endDate", label: "End Date", align: "left", type: "date" },
  { name: "scheduleCreatedDateTime", label: "Schedule Created DateTime", align: "left", type: "date" },
  { name: "validityDateTime", label: "Validity DateTime", align: "left", type: "date" },
];

export const initialFilters = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "scheduledName",
      "name": "scheduledName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": ""
      }
    }
  ],
  "search": {
    "value": "string",
    "regex": "string"
  },
  "order": {
    "orderBy": "scheduledName",
    "orderDirection": "asc"
  },
  "filter": {
    "scheduledID": 0,
    "scheduledName": "",
    "courseID": 0,
    "courseName": "",
    "startDate": "",
    "endDate": "",
    "scheduleCreatedDateTime": "",
    "validityDateTime": "",
    "location": 0,
    "locationName": "",
    "instructor": 0,
    "instructorName": "",
    "status": 0,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": "",
    "isDeleted": false,
    "remarks": ""
  }
}