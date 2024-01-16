
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

export const tableheads = [
  { name: "applicantName", label: "Applicant Name", align: "left" },
  { name: "courseName", label: "Course Name", align: "left" },
  { name: "scheduleName", label: "Schedule Name", align: "left" },
  { name: "trainingfee", label: "Course Fee", align: "left" },
  { name: "enrollmentDate", label: "Enrollment Date", align: "left" },
  { name: "paymentStatusName", label: "Payment Status", align: "left" },
  { name: "courseStatusName", label: "Course Status", align: "left" },
];

