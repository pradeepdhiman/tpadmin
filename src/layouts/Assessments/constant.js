import * as yup from 'yup';

export const assessmentTableHeads = [
  { name: "applicantName", label: "Name", align: 'left', type: "string" },
  { name: "courseName", label: "Course", align: 'left' , type: "string"},
  { name: "assesmentDate", label: "Assessment Date", align: 'left', type: "date" },
  { name: "totalQuestions", label: "Total Questions Asked", align: 'left' , type: "number"},
  { name: "correctAnswers", label: "Correct Answer", align: 'left' , type: "number"},
  { name: "", label: "% of Marks Scored", align: 'left' , type: "number"},
  { name: "result", label: "Result", align: 'left' , type: "string"},
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
    "orderBy": "ApplicantName",
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
    "result": ""
  }
}