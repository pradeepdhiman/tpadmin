


export const dbcoursestableheads = [
    { name: "courseName", label: "Course Name", align: "left" , type:"string"},
    { name: "statusName", label: "Status", align: "left" , type:"string"},
    { name: "duration", label: "Duration ", align: "left" , type:"string"},
    { name: "categoryName", label: "Category Name", align: "left" , type:"string"},
    { name: "trainingfee", label: "Training Fee", align: "left" , type:"number"},
    { name: "vat", label: "Vat", align: "left" , type:"number"},
    { name: "totalAmount", label: "Total Amount", align: "left", type:"number" },
    { name: "remarks", label: "Remarks", align: "left", type:"string"},
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