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
    { name: "courseName", label: "courseName", align: "left" },
    { name: "questionTitle", label: "questionTitle", align: "left" },
    { name: "questionType", label: "questionType", align: "left" },
    { name: "statusName", label: "Status", align: "left" },
    { name: "correctAnswer", label: "correctAnswer", align: "left" },
    { name: "optionA", label: "optionA", align: "left" },
    { name: "optionB", label: "optionB", align: "left" },
    { name: "optionC", label: "optionC", align: "left" },
    { name: "optionD", label: "optionD", align: "left" },
    { name: "optionE", label: "optionE", align: "left" },
    { name: "marksOptionA", label: "marksOptionA", align: "left" },
    { name: "maaksOptionB", label: "maaksOptionB", align: "left" },
    { name: "marksOptionC", label: "marksOptionC", align: "left" },
    { name: "marksOptionD", label: "marksOptionD", align: "left" },
    { name: "marksOptionE", label: "marksOptionE", align: "left" },
    { name: "remarks", label: "remarks", align: "left" },
];


