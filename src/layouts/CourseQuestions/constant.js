import * as yup from 'yup';

export const initialValue = {
    questionID: 0,
    courseID: 0,
    courseName: "string",
    questionTitle: "string",
    questionType: "string",
    correctAnswer: "string",
    optionA: "string",
    optionB: "string",
    optionC: "string",
    optionD: "string",
    optionE: "string",
    marksOptionA: "string",
    maaksOptionB: "string",
    marksOptionC: "string",
    marksOptionD: "string",
    marksOptionE: "string",
    status: 0,
    createdById: 0,
    updatedById: 0,
    updatedDate: "2024-01-02T05:06:55.655Z",
    isDeleted: true,
    remarks: "string"
}

export const fields = {
    questionTitle: { label: "Question Title", placeholder: "Question Title", hidden: false },
    questionType: { label: "Question Type", placeholder: "Question Type", hidden: false, },
    correctAnswer: { label: "Correct Answer", placeholder: "Correct Answer", hidden: false, },
    optionA: { label: "Option A", placeholder: "Option A", hidden: false, },
    marksOptionA: { type: "number", label: "Marks A", placeholder: "Marks A", hidden: false, },
    optionB: { label: "Option B", placeholder: "Option B", hidden: false, },
    marksOptionB: { type: "number", label: "Marks B", placeholder: "Marks B", hidden: false, },
    optionC: { label: "Option C", placeholder: "Option C", hidden: false },
    marksOptionC: { type: "number", label: "Marks C", placeholder: "Marks C", hidden: false, },
    optionD: { label: "Option D", placeholder: "Option D", hidden: false },
    marksOptionD: { type: "number", label: "Marks D", placeholder: "Marks D", hidden: false, },
    optionE: { label: "Option E", placeholder: "Option E", hidden: false },
    marksOptionE: { type: "number", label: "Marks E", placeholder: "Marks E", hidden: false, },
    remarks: { label: "Remarks", placeholder: "Remarks", hidden: false },
}

// questionID
// courseID
// createdById


export const schema = yup.object().shape({
    questionTitle: yup.string(),
    questionType: yup.string(),
    optionA: yup.string(),
    optionB: yup.string(),
    optionC: yup.string(),
    optionD: yup.string(),
    optionE: yup.string(),
    marksOptionA: yup.string(),
    maaksOptionB: yup.string(),
    marksOptionC: yup.string(),
    marksOptionD: yup.string(),
    marksOptionE: yup.string(),
    correctAnswer: yup.string(),
    remarks: yup.string()
});




export const questiontableheads = [
    { name: "questionTitle", label: "Question", align: "left", type: "string" },
    { name: "courseName", label: "Course Name", align: "left", type: "string" },
    { name: "questionTypeName", label: "question Type", align: "left", type: "string" },
    { name: "statusName", label: "Status", align: "left", type: "string" },
    { name: "correctAnswer", label: "Correct Answer", align: "left", type: "string" },
    { name: "optionA", label: "option A", align: "left", type: "string" },
    { name: "optionB", label: "option B", align: "left", type: "string" },
    { name: "optionC", label: "option C", align: "left", type: "string" },
    { name: "optionD", label: "option D", align: "left", type: "string" },
    { name: "optionE", label: "option E", align: "left", type: "string" },
    { name: "marksOptionA", label: "Option A Marks", align: "left", type: "number" },
    { name: "marksOptionB", label: "Option B Marks", align: "left", type: "number" },
    { name: "marksOptionC", label: "Option C Marks", align: "left", type: "number" },
    { name: "marksOptionD", label: "Option D Marks", align: "left", type: "number" },
    { name: "marksOptionE", label: "Option E Marks", align: "left", type: "number" },
    { name: "remarks", label: "Remarks", align: "left", type: "string" },
];


export const initialFilters = {
    "draw": 0,
    "start": 0,
    "length": 10,
    "columns": [
      {
        "data": "QuestionTitle",
        "name": "QuestionTitle",
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
      "orderBy": "QuestionTitle",
      "orderDirection": "asc"
    },
    "filter": {
      "questionID": 0,
      "courseID": 0,
      "courseName": "",
      "questionTitle": "",
      "questionTypeID": 0,
      "questionTypeName": "",
      "correctAnswer": "",
      "optionA": "",
      "optionB": "",
      "optionC": "",
      "optionD": "",
      "optionE": "",
      "marksOptionA": "",
      "marksOptionB": "",
      "marksOptionC": "",
      "marksOptionD": "",
      "marksOptionE": "",
      "status": 0,
      "statusName": "",
      "createdById": 0,
      "updatedById": 0,
      "updatedDate": null,
      "isDeleted": false,
      "remarks": ""
    }
  }