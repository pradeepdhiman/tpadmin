import * as yup from 'yup';

export const assessmentTableHeads = [
  { name: "applicantName", label: "Applicant", align: 'left', type:"string" },
  { name: "courseName", label: "Course Name", align: 'left', type:"string" },
  { name: "statusName", label: "Status", align: 'left', type:"string" },
];



export const initialFilters = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "",
      "name": "",
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
    "orderBy": "",
    "orderDirection": ""
  },
  "filter": {
    "reassessmentID": 0,
    "courseID": 0,
    "courseName": "",
    "applicantID": 0,
    "applicantName": "",
    "fee": "",
    "receipt": "",
    "receiptID": "",
    "receiptDate": "",
    "amountPaid": "",
    "paymentStatusID": 0,
    "paymentStatusName": "",
    "status": 0,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": "",
    "isDeleted": false,
    "remarks": ""
  }
}