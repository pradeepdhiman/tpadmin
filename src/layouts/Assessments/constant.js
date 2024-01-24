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