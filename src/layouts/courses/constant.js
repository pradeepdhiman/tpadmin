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
  duration: { label: "Duration (Hrs)", placeholder: "Duration (Hrs)" },
  categoryID: { label: "Category Id", placeholder: "Category Id", hidden: false },
  syllabus: { label: "Syllabus", placeholder: "Syllabus" },
  trainingfee: { label: "Training Fee", placeholder: "Training Fee" },
  vat: { label: "Tax", placeholder: "Tax" },
  totalAmount: { label: "Total Amount", placeholder: "Total Amount" },
  description: { label: "Description", placeholder: "Description" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
};

export const schema = yup.object().shape({
  courseName: yup.string().required('Course Name is required'),
  description: yup.string().required('Description is required'),
  duration: yup.number().required('Duration is required'),
  syllabus: yup.string().required('Syllabus is required'),
  trainingfee: yup.number().required('Training fee is required'),
  vat: yup.number(),
  totalAmount: yup.number(),
  remarks: yup.string()
});


export const assessmentInfofields = {
  assessmentType: { label: "Assessment Type", placeholder: "Assessment Type" },
  passingScore: { label: "Passing Score", placeholder: "Passing Score" },
  duration: { label: "Duration", placeholder: "Duration" },
  numberofQuestions: { label: "Number of Questions", placeholder: "Number of Questions" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
};

export const assessmentInfoSchema = yup.object().shape({
  assessmentType: yup.string().required('Assessment Type is required'),
  passingScore: yup.string().required('Passing Score is required'),
  duration: yup.string().required('Duration is required'),
  numberofQuestions: yup.string().required('Number of questions is required'),
  remarks: yup.string()
});


export const coursestableheads = [
  { name: "courseName", label: "Course Name", align: 'left' },
  { name: "statusName", label: "Status Name", align: 'left' },
  { name: "duration", label: "duration", align: 'left' },
  { name: "categoryName", label: "Category Name", align: 'left' },
  { name: "syllabus", label: "Syllabus", align: 'left' },
  { name: "trainingfee", label: "Training Fee", align: 'left' },
  { name: "vat", label: "Vat", align: 'left' },
  { name: "totalAmount", label: "Total Amount", align: 'left' }
];


export const initialFilters = {
  draw: 10,
  start: 0,
  length: 10,
  columns: [
    {
      data: "firstName",
      name: "firstName",
      searchable: true,
      orderable: true,
      search: {
        value: "firstName",
        regex: "test",
      },
    },
  ],
  search: {
    value: "firstName",
    regex: "test",
  },
  order: {
    orderBy: "firstName",
    orderDirection: "desc",
  },
  filter: null,
};