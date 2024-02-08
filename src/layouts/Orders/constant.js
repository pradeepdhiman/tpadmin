
export const initialFilters = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "ApplicantName",
      "name": "ApplicantName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": ""
      }
    }
  ],
  "search": {
    "value": "",
    "regex": ""
  },
  "order": {
    "orderBy": "string",
    "orderDirection": "asc"
  },
  "filter": {
    "applicantCourseID": 0,
    "applicantID": 0,
    "applicantName": "",
    "courseID": 0,
    "courseName": "",
    "scheduleID": 0,
    "scheduleName": "",
    "enrollmentDate": "",
    "completionDate": "",
    "trainingfee": "",
    "receipt": "",
    "receiptID": "",
    "receiptDate": "",
    "amountPaid": "",
    "paymentStatus": 0,
    "paymentStatusName": "",
    "courseStatus": 0,
    "courseStatusName": "",
    "status": 0,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": "",
    "isDeleted": false,
    "remarks": ""
  }
}

export const tableheads = [
  { name: "applicantName", label: "Applicant Name", align: "left", type: "string" },
  { name: "courseName", label: "Course Name", align: "left", type: "string" },
  { name: "scheduleName", label: "Schedule Name", align: "left", type: "string" },
  { name: "trainingfee", label: "Course Fee($)", align: "left", type: "number" },
  { name: "enrollmentDate", label: "Enrollment Date", align: "left", type: "date" },
  { name: "paymentStatusName", label: "Payment Status", align: "left", type: "string" },
  { name: "courseStatusName", label: "Course Status", align: "left", type: "string" },
];

