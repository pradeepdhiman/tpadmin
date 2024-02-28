import * as yup from 'yup';

export const initialValue = {
  courseID: 0,
  courseName: "",
  description: "",
  duration: 0,
  categoryID: 0,
  syllabus: "",
  trainingfee: 0,
  vat: 0,
  totalAmount: 0,
  createdById: 0,
  remarks: ""
};


export const fields = {
  courseName: { label: "Course Name", placeholder: "Course name" },
  duration: { label: "Duration(mnts)", placeholder: "Duration(mnts)" },
  categoryID: { label: "Category Id", placeholder: "Category Id", hidden: false },
  syllabus: { label: "Contents", placeholder: "Contents" },
  trainingfee: { label: "Training Fee", placeholder: "Training Fee" },
  vat: { label: "Tax", placeholder: "Tax" },
  totalAmount: { label: "Total Amount", placeholder: "Total Amount" },
  // description: { label: "Description", placeholder: "Description" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
};

export const newschema = yup.object().shape({
  courseName: yup.string().required('Course Name is required'),
  // description: yup.string().required('Description is required'),
  duration: yup.number().required('Duration is required'),
  syllabus: yup.string().required('Syllabus is required'),
  trainingfee: yup.number().required('Training fee is required'),
  vat: yup.number()
    .positive('VAT should be a positive value')
    .max(99, 'It can not be more then 100%'),
  totalAmount: yup.number(),
  file: yup.mixed().required("Course image required.")
});
export const editschema = yup.object().shape({
  courseName: yup.string().required('Course Name is required'),
  // description: yup.string().required('Description is required'),
  duration: yup.number().required('Duration is required'),
  syllabus: yup.string().required('Syllabus is required'),
  trainingfee: yup.number().required('Training fee is required'),
  vat: yup.number()
    .positive('VAT should be a positive value')
    .max(99, 'It can not be more then 100%'),
  totalAmount: yup.number(),
});


export const assessmentInfofields = {
  assessmentType: { label: "Assessment Type", placeholder: "Assessment Type" },
  passingScore: { label: "Passing Score", placeholder: "Passing Score" },
  duration: { label: "Duration(mnts)", placeholder: "Duration(mnts)" },
  numberofQuestions: { label: "Number of Questions", placeholder: "Number of Questions" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
};

// export const assessmentInfoSchema = yup.object().shape({
//   assessmentType: yup.string().required('Assessment Type is required'),
//   passingScore: yup.string(),
//   duration: yup.string().required('Duration is required'),
//   weightage: yup.string(),
//   numberofQuestions: yup.string().required('Number of questions is required'),
//   remarks: yup.string()
// });

export const assessmentInfoSchema = yup.object().shape({
  assessmentType: yup.string().required('Assessment Type is required'),
  passingScore: yup
    .string()
    .test('either-passing-score-or-weightage', 'Either Passing Score or Weightage is required', function (value) {
      const weightage = this.parent.weightage;
      return !!value || !!weightage;
    }),
  duration: yup.string().required('Duration is required'),
  weightage: yup
    .string()
    .test('either-passing-score-or-weightage', 'Either Passing Score or Weightage is required', function (value) {
      const passingScore = this.parent.passingScore;
      return !!value || !!passingScore;
    }),
  numberofQuestions: yup.string().required('Number of questions is required'),
});


export const coursestableheads = [
  { name: "courseName", label: "Course Name", align: 'left', type: "string" },
  { name: "statusName", label: "Status Name", align: 'left', type: "string" },
  { name: "duration", label: "Duration(mnts)", align: 'left', type: "string" },
  { name: "categoryName", label: "Category Name", align: 'left', type: "string" },
  { name: "syllabus", label: "Contents", align: 'left', type: "string" },
  { name: "trainingfee", label: "Training Fee", align: 'left', type: "number" },
  { name: "vat", label: "Vat", align: 'left', type: "number" },
  { name: "totalAmount", label: "Total Amount", align: 'left', type: "number" }
];


export const initialFilters = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "CourseName",
      "name": "CourseName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "Sample",
        "regex": "false"
      }
    },
    {
      "data": "Duration",
      "name": "Duration",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "Sample",
        "regex": "false"
      }
    }
  ],
  "search": {
    "value": "Sample",
    "regex": "false"
  },
  "order": {
    "orderBy": "UpdatedDate",
    "orderDirection": "desc"
  },
  "filter": {
    "courseID": 0,
    "courseName": "",
    "description": "",
    "duration": "",
    "categoryID": 0,
    "categoryName": "",
    "syllabus": "",
    "trainingfee": "",
    "vat": "",
    "courseImage": "",
    "totalAmount": "",
    "status": 26,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
}

export const documentFilter = {
  "draw": 0,
  "start": 0,
  "length": 100,
  "columns": [
      {
          "data": "applicantName",
          "name": "applicantName",
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
      "orderBy": "CreatedDate",
      "orderDirection": "desc"
  },
  "filter": {
      "documentID": 0,
      "applicantCourseID": 0,
      "reassessmentID": 0,
      "applicantID": 0,
      "applicantName": "",
      "courseID": 0,
      "courseName": "",
      "document": "",
      "documentTypeID": 0,
      "documentTypeName": "",
      "status": 0,
      "statusName": "",
      "createdById": 0,
      "createdDate": null,
      "updatedById": 0,
      "updatedDate": null,
      "isDeleted": false,
      "remarks": ""
  }
}