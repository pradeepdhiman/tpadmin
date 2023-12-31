
import * as yup from 'yup';
export const initialValue = {
  applicantID: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  qualification: "",
  designation: "",
  dob: "",
  nationality: "",
  companyName: "",
  companyContactNumber: "",
  companyAddress: "",
  password: "",
  createdById: 0,
  updatedById:0,
  remarks: "",
  isDeleted:false,
  status:"",
  updatedDate:""
}
export const fields = {
  firstName: { label: "First Name", placeholder: "First name" },
  lastName: { label: "Last Name", placeholder: "Last name" },
  email: { label: "Email Id", placeholder: "Email id" },
  phone: { label: "Phone Number", placeholder: "Phone number" },
  address: { label: "Address", placeholder: "Address" },
  qualification: { label: "Qualification", placeholder: "Qualification" },
  designation: { label: "Designation", placeholder: "Designation" },
  dob: { label: "Date of Birth", placeholder: "D.O.B" },
  nationality: { label: "Nationality", placeholder: "Nationality" },
  companyName: { label: "Company Name", placeholder: "Company name" },
  companyContactNumber: { label: "Company Contact", placeholder: "Company contact number" },
  companyAddress: { label: "Company Address", placeholder: "Company address" },
  password: { label: "Password", placeholder: "Password" }
}
export const schema = yup.object().shape({
  applicantID: yup.number(),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .number()
    .min(1000000000, 'Phone must be at least 10 digits')
    .max(9999999999, 'Phone should not be more then 10 digits')
    .required('Phone is required'),
  address: yup.string().required('Address is required'),
  qualification: yup.string().required('Qualification is required'),
  designation: yup.string(),
  dob: yup.date().required('Date of Birth is required'),
  nationality: yup.string().required('Nationality is required'),
  companyName: yup.string(),
  companyContactNumber: yup.string(),
  companyAddress: yup.string(),
  password: yup.string().required('Password is required'),
  createdById: yup.number(),
  remarks: yup.string(),
});

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
  { name: "applicantID", label: "Applicant Id", align: 'left' },
  { name: "firstName", label: "First Name", align: 'left' },
  { name: "lastName", label: "Last Name", align: 'left' },
  { name: "email", label: "Email", align: 'left' },
  { name: "phone", label: "Phone", align: 'left' },
  { name: "address", label: "Address", align: 'left' },
  { name: "qualification", label: "Qualification", align: 'left' },
  { name: "designation", label: "Designation", align: 'left' },
  { name: "dob", label: "Date of Birth", align: 'left' },
  { name: "nationality", label: "Nationality", align: 'left' },
  { name: "companyName", label: "Company Name", align: 'left' },
  { name: "companyContactNumber", label: "Company Contact Number", align: 'left' },
  { name: "companyAddress", label: "Company Address", align: 'left' },
  { name: "status", label: "Status", align: 'left' },
  { name: "createdById", label: "Created By Id", align: 'left' },
  { name: "updatedById", label: "Updated By Id", align: 'left' },
  { name: "updatedDate", label: "Updated Date", align: 'left' },
  { name: "isDeleted", label: "Is Deleted", align: 'left' },
  { name: "remarks", label: "Remarks", align: 'left' },
  { name: "action", label: "Action", align: 'left' },
];

