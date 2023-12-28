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
    remarks: ""
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