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
  courseID: { label: "Course Id", placeholder: "Course Id", hidden: false },
  courseName: { label: "Course Name", placeholder: "Course name" },
  duration: { label: "Duration", placeholder: "Duration" },
  categoryID: { label: "Category Id", placeholder: "Category Id", hidden: false },
  categoryName: { label: "Category Name", placeholder: "Category Name", hidden: false },
  syllabus: { label: "Syllabus", placeholder: "Syllabus" },
  trainingfee: { label: "Training Fee", placeholder: "Training Fee" },
  vat: { label: "Tax", placeholder: "Tax" },
  totalAmount: { label: "Total Amount", placeholder: "Total Amount" },
  status: { label: "Status", placeholder: "Status" },
  createdById: { label: "Created By Id", placeholder: "Created By Id", hidden: false },
  updatedById: { label: "Updated By Id", placeholder: "Updated By Id", hidden: false },
  updatedDate: { label: "Updated Date", placeholder: "Updated Date", hidden: false },
  description: { label: "Description", placeholder: "Description" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
};

export const schema = yup.object().shape({
  courseID: yup.number(),
  courseName: yup.string().required('Course Name is required'),
  description: yup.string().required('Description is required'),
  duration: yup.number().required('Duration is required'),
  categoryID: yup.number(),
  syllabus: yup.string().required('Syllabus is required'),
  trainingfee: yup.number().required('Training fee is required'),
  vat: yup.number(),
  totalAmount: yup.number(),
  createdById: yup.number(),
  remarks: yup.string()
});

export const coursestableheads = [
  { name: "courseID", label: " Course Id", align: 'left' },
  { name: "courseName", label: "Course Name", align: 'left' },
  { name: "duration", label: "duration", align: 'left' },
  { name: "categoryID", label: "Category Id", align: 'left' },
  { name: "categoryName", label: "Category Name", align: 'left' },
  { name: "syllabus", label: "Syllabus", align: 'left' },
  { name: "trainingfee", label: "Training Fee", align: 'left' },
  { name: "vat", label: "Vat", align: 'left' },
  { name: "totalAmount", label: "Total Amount", align: 'left' },
  { name: "status", label: "Status", align: 'left' },
  { name: "createdById", label: "Created ById", align: 'left' },
  { name: "updatedById", label: "Updated ById", align: 'left' },
  { name: "updatedDate", label: "Updated Date", align: 'left' },
  { name: "description", label: "Description", align: 'left' },
  { name: "remarks", label: "remarks", align: 'left' },
  { name: "action", label: "Action", align: 'left' }
];
