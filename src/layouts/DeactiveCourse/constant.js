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
  duration: { label: "Duration (mnts)", placeholder: "Duration (mnts)" },
  categoryID: { label: "Category Id", placeholder: "Category Id", hidden: false },
  syllabus: { label: "Syllabus", placeholder: "Syllabus" },
  trainingfee: { label: "Training Fee", placeholder: "Training Fee" },
  vat: { label: "Tax", placeholder: "Tax" },
  totalAmount: { label: "Total Amount", placeholder: "Total Amount" },
  // description: { label: "Description", placeholder: "Description" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
};

export const schema = yup.object().shape({
  courseName: yup.string().required('Course Name is required'),
  // description: yup.string().required('Description is required'),
  duration: yup.number().required('Duration is required'),
  syllabus: yup.string().required('Syllabus is required'),
  trainingfee: yup.number().required('Training fee is required'),
  vat: yup.number(),
  totalAmount: yup.number(),
  remarks: yup.string()
});



export const coursestableheads = [
  { name: "courseName", label: "Name", align: 'left', type: "string" },
  { name: "statusName", label: "Status", align: 'left', type: "string" },
  { name: "duration", label: "Duration (mnts)", align: 'left', type: "number" },
  { name: "categoryName", label: "Category", align: 'left', type: "string" },
  { name: "syllabus", label: "Content", align: 'left', type: "string" },
  { name: "trainingfee", label: "Fee ", align: 'left', type: "number" },
  { name: "vat", label: "Vat ", align: 'left', type: "number" },
  { name: "totalAmount", label: "Total Amount ", align: 'left', type: "number" }
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
    "totalAmount": "",
    "status": 27,
    "statusName": "",
    "courseImage": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
};