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