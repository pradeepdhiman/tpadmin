import * as yup from 'yup';

export const assessmentTableHeads = [
  { name: "applicantName", label: "Applicant", align: 'left' },
  { name: "courseName", label: "Course", align: 'left' },
  { name: "assesmentDate", label: "Date", align: 'left' },
  { name: "totalQuestions", label: "Total Question", align: 'left' },
  { name: "correctAnswers", label: "Correct Answer", align: 'left' },
  { name: "result", label: "Result", align: 'left' },
];



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
    "orderBy": "AssesmentDate",
    "orderDirection": "asc"
  },
  "filter": {
    "candidateAssesmentID": 0,
    "applicantID": 0,
    "applicantName": "",
    "courseID": 0,
    "courseName": "",
    "coursesAssesmentID": 0,
    "assesmentDate": null,
    "totalQuestions": "",
    "correctAnswers": 0,
    "result": "Pass"
  }
}