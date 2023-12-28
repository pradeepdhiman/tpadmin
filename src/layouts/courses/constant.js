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
}

export const fields = {
    courseID: { label: "Course Id", placeholder: "Course Id", hidden: false },
    courseName: { label: "Course Name", placeholder: "Course name" },
    duration: { label: "Duration", placeholder: "Duration" },
    categoryID: { label: "Category Id", placeholder: "Category Id", hidden: false },
    syllabus: { label: "Syllabus", placeholder: "Syllabus" },
    trainingfee: { label: "Training Fee", placeholder: "Training Fee" },
    vat: { label: "Tax", placeholder: "Tax" },
    totalAmount: { label: "Total Amount", placeholder: "Total Amount" },
    createdById: { label: "Created By Id", placeholder: "Created By Id", hidden: false },
    description: { label: "Description", placeholder: "Description" },
    remarks: { label: "Remarks", placeholder: "Remarks" }
}
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