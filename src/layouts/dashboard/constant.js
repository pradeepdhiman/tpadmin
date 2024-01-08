


export const dbcoursestableheads = [
    // { name: "courseID", label: "Course Id", align: "left", hidden: true },
    { name: "courseName", label: "Course Name", align: "left" },
    // { name: "description", label: "Description", align: "left", hidden: true },
    { name: "duration", label: "Duration", align: "left" },
    // { name: "categoryID", label: "Category Id", align: "left", hidden: true },
    { name: "categoryName", label: "Category Name", align: "left" },
    { name: "syllabus", label: "Syllabus", align: "left" },
    { name: "trainingfee", label: "Training Fee", align: "left" },
    { name: "vat", label: "Vat", align: "left" },
    { name: "totalAmount", label: "Total Amount", align: "left" },
    { name: "status", label: "Status", align: "left" },
    // { name: "createdById", label: "Created By Id", align: "left", hidden: true },
    // { name: "updatedById", label: "Updated By Id", align: "left", hidden: true },
    // { name: "updatedDate", label: "Updated Date", align: "left", hidden: true },
    { name: "isDeleted", label: "Is Deleted", align: "left" },
    { name: "remarks", label: "Remarks", align: "left" },
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