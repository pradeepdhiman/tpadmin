
import * as yup from 'yup';

export const fields = {
  firstName: { label: "First Name", placeholder: "First name" },
  lastName: { label: "Last Name", placeholder: "Last name" },
  email: { label: "Email Id", placeholder: "Email id" },
  phone: { label: "Phone Number", placeholder: "Phone number", type: "number" },
  address: { label: "Address", placeholder: "Address" },
  qualification: { label: "Qualification", placeholder: "Qualification" },
  designation: { label: "Designation", placeholder: "Designation" },
  dob: { label: "Date of Birth", placeholder: "D.O.B", type: "date" },
  nationality: { label: "Nationality", placeholder: "Nationality" },
  companyName: { label: "Company Name", placeholder: "Company name" },
  companyContactNumber: { label: "Company Contact", placeholder: "Company contact number" },
  companyAddress: { label: "Company Address", placeholder: "Company address" },
  // password: { label: "Password", placeholder: "Password" },
  remarks: { label: "Remarks", placeholder: "Remarks" }
}



export const schema = yup.object().shape({
  // firstName: yup.string().required('First Name is required'),
  // lastName: yup.string(),
  // email: yup.string().email('Invalid email').required('Email is required'),
  // phone: yup.string()
  //   .required('Phone is required')
  //   .min(10, 'Min number of digits (10) you can check')
  //   .max(10, 'Max number of digits (10) you can check'),
  // companyContactNumber: yup.string()
  //   .required('Contact Number is required')
  //   .min(10, 'Min number of digits (10) you can check')
  //   .max(10, 'Max number of digits (10) you can check'),
  // address: yup.string().required('Address is required'),
  // qualification: yup.string().required('Qualification is required'),
  // designation: yup.string(),
  // dob: yup.date()
  //   .required('Date of Birth is required')
  //   .test('age', 'Must be at least 15 years old', function (value) {
  //     const currentDate = new Date();
  //     const birthDate = new Date(value);
  //     const age = currentDate.getFullYear() - birthDate.getFullYear();

  //     return age >= 15;
  //   }),
  // nationality: yup.string().required('Nationality is required'),
  // companyName: yup.string(),
  // companyAddress: yup.string()
});

export const initialFilters = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "FirstName",
      "name": "FirstName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": ""
      }
    }
  ],
  "search": {
    "value": "",
    "regex": ""
  },
  "order": {
    "orderBy": "FirstName",
    "orderDirection": "asc"
  },
  "filter": {
    "applicantID": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "address": "",
    "qualification": 0,
    "qualificationName": "",
    "designation": 0,
    "designationName": "",
    "dob": null,
    "nationality": 0,
    "nationalityName": "",
    "companyName": "",
    "companyContactNumber": "",
    "companyAddress": "",
    "status": 0,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
};

export const tableheads = [
  { name: "firstName", label: "First Name", align: 'left', type: "string" },
  { name: "lastName", label: "Last Name", align: 'left', type: "string" },
  { name: "statusName", label: "Status", align: 'left', type: "string" },
  { name: "email", label: "Email", align: 'left', type: "string" },
  { name: "phone", label: "Phone", align: 'left', type: "number" },
  { name: "address", label: "Address", align: 'left', type: "string" },
  { name: "qualificationName", label: "Qualification", align: 'left', type: "string" },
  { name: "designationName", label: "Designation", align: 'left', type: "string" },
  { name: "dob", label: "Date of Birth", align: 'left', type: "date" },
  { name: "nationalityName", label: "Nationality", align: 'left', type: "string" },
  { name: "companyName", label: "Company Name", align: 'left', type: "string" },
  { name: "companyContactNumber", label: "Company Contact Number", align: 'left', type: "string" },
  { name: "companyAddress", label: "Company Address", align: 'left', type: "string" },
  { name: "remarks", label: "Remarks", align: 'left', type: "string" },
];


export const verificationDocFilter = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "ApplicantName",
      "name": "ApplicantName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": ""
      }
    }
  ],
  "search": {
    "value": "",
    "regex": ""
  },
  "order": {
    "orderBy": "UpdatedDate",
    "orderDirection": "asc"
  },
  "filter": {
    "documentID": 0,
    "applicantCourseID": 0,
    "applicantID": 0,
    "applicantName": "",
    "courseID": 0,
    "courseName": "",
    "document": "",
    "documentTypeID": 0,
    "documentTypeName": "",
    "status": 0,
    "statusName": "",
    "createdById": 0,
    "createdDate": null,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
}