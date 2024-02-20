
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
    "orderBy": "EnrollmentDate",
    "orderDirection": "desc"
  },
  "filter": {
    "applicantCourseID": 0,
    "applicantID": 0,
    "applicantName": "",
    "courseID": 0,
    "courseName": "",
    "scheduleID": 0,
    "scheduleName": "",
    "enrollmentDate": null,
    "completionDate": null,
    "trainingfee": "",
    "receipt": "",
    "receiptID": "",
    "receiptDate": null,
    "amountPaid": "",
    "paymentStatus": 0,
    "paymentStatusName": "Pending",
    "courseStatus": 0,
    "courseStatusName": "Applied",
    "status": 0,
    "courseImage": "",
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
}


export const tableheads = [
  { name: "applicantName", label: "Learner Name", align: "left", type: "string" },
  { name: "courseName", label: "Course ", align: "left", type: "string" },
  { name: "scheduleName", label: "Schedule", align: "left", type: "string" },
  { name: "trainingfee", label: "Fee", align: "left", type: "number" },
  { name: "enrollmentDate", label: "Enrollment Date", align: "left", type: "date" },
  { name: "paymentStatusName", label: "Payment Status", align: "left", type: "string" },
  { name: "courseStatusName", label: "Course Status", align: "left", type: "string" },
];

