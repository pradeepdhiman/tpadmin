
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
  { name: "applicantCourseID", label: "Applicant CourseId", align: "left" },
  { name: "applicantID", label: "Applicant Id", align: "left" },
  { name: "courseID", label: "Course Id", align: "left" },
  { name: "enrollmentDate", label: "Enrollment Date", align: "left" },
  { name: "completionDate", label: "Completion Date", align: "left" },
  { name: "receipt", label: "Receipt", align: "left" },
  { name: "receiptID", label: "Receipt Id", align: "left" },
  { name: "receiptDate", label: "Receipt Date", align: "left" },
  { name: "amountPaid", label: "Amount Paid", align: "left" },
  { name: "status", label: "Status", align: "left" },
  { name: "createdById", label: "Created ById", align: "left" },
  { name: "updatedById", label: "Updated ById", align: "left" },
  { name: "updatedDate", label: "Updated Date", align: "left" },
  { name: "isDeleted", label: "Is Deleted", align: "left" },
  { name: "remarks", label: "Remarks", align: "left" },
];


