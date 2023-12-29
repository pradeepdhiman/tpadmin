
import SoftTypography from "components/SoftTypography";
import emptySplitApi from "./emptySplitApi";
import { authUser } from "layouts/authentication/functions/query";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SoftBox from "components/SoftBox";
import { IconButton } from "@mui/material";

const createHeaders = () => {
  const user = authUser();
  return {
    Authorization: `Bearer ${user.token}`,
    "Content-Type": "application/json",
  };
};

export const createRequest = (endpoint, data) => ({
  url: `${endpoint}`,
  method: "POST",
  body: JSON.stringify(data),
  headers: createHeaders(),
});

export const getRequest = (endpoint, id) => ({
  url: id ? `${endpoint}?id=${id}` : endpoint,
  headers: createHeaders(),
});

export const readRequest = (endpoint, id) => ({
  url: id ? `${endpoint}/${id}` : `${endpoint}`,
  method: "GET",
  headers: createHeaders(),
});

export const updateRequest = (endpoint, data) => ({
  url: `${endpoint}`,
  method: "PUT",
  body: JSON.stringify(data),
  headers: createHeaders(),
});

export const deleteRequest = (endpoint, id) => ({
  url: `${endpoint}?id=${id}`,
  method: "DELETE",
  headers: createHeaders(),
});


export function saveObject(key = "", value = "") {
  if (window && window.localStorage) {
    window.localStorage.setItem(key, value);
  }
}

export function getObject(name) {
  if (window && window.localStorage) {
    return window.localStorage.getItem(name);
  }
  return false;
}

export function removeObject(key) {
  localStorage.removeItem(key);
}


export const crudApi = ({ entityName, baseUrl, endpoints }) => {
  const createEndpointUrl = (endpoint) => `${baseUrl}/${endpoint}`;

  return emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
      getList: build.query({
        query: () => createEndpointUrl(endpoints.list),
      }),
      filter: build.mutation({
        query: (data) => ({
          url: createEndpointUrl(endpoints.filter),
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
      create: build.mutation({
        query: (data) => ({
          url: createEndpointUrl(endpoints.create),
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
      update: build.mutation({
        query: ({ id, data }) => ({
          url: createEndpointUrl(`${endpoints.update}/${id}`),
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
      delete: build.mutation({
        query: (id) => ({
          url: createEndpointUrl(`${endpoints.delete}/${id}`),
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    }),
  });
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    for (const [rule, value] of Object.entries(fieldRules)) {
      switch (rule) {
        case 'required':
          if (value && !formData[fieldName]) {
            errors[fieldName] = 'This field is required';
          }
          break;
        case 'minLength':
          if (formData[fieldName] && formData[fieldName].length < value) {
            errors[fieldName] = `Must be at least ${value} characters`;
          }
          break;
        case 'maxLength':
          if (formData[fieldName] && formData[fieldName].length > value) {
            errors[fieldName] = `Must be at most ${value} characters`;
          }
          break;
        case 'number':
          if (value && isNaN(formData[fieldName])) {
            errors[fieldName] = 'Must be a number';
          }
          break;
        case 'email':
          if (value && !/\S+@\S+\.\S+/.test(formData[fieldName])) {
            errors[fieldName] = 'Please enter a valid email';
          }
          break;
        case 'date':
          if (value && isNaN(Date.parse(formData[fieldName]))) {
            errors[fieldName] = 'Must be a valid date';
          }
          break;
        case 'type':
          // Handle other types if needed
          break;
        default:
          break;
      }
    }
  });

  return errors;
};

// const rowdata = [
//   {
//     applicantID: 0,
//     firstName: "padepe",
//     lastName: "stridfng",
//     email: "striasdfng",
//     phone: "striaang",
//     address: "strdfing",
//     qualification: "stxcvring",
//     designation: "strixcng",
//     dob: "2023-12-29T04:57:24.687Z",
//     nationality: "strwering",
//     companyName: "strdsfing",
//     companyContactNumber: "stfgring",
//     companyAddress: "strighng",
//     status: 0,
//     createdById: 0,
//     updatedById: 0,
//     updatedDate: "2023-12-29T04:57:24.687Z",
//     isDeleted: true,
//     remarks: "strdfging"
//   },
//   {
//     applicantID: 1,
//     firstName: "strdfing",
//     lastName: "strdfing",
//     email: "strging",
//     phone: "strding",
//     address: "strting",
//     qualification: "strying",
//     designation: "strjing",
//     dob: "2023-12-29T04:57:24.687Z",
//     nationality: "strijkng",
//     companyName: "hgg",
//     companyContactNumber: "gggg",
//     companyAddress: "gg",
//     status: 0,
//     createdById: 0,
//     updatedById: 0,
//     updatedDate: "2023-12-29T04:57:24.687Z",
//     isDeleted: true,
//     remarks: "gg"
//   }
// ]

// export const tableheads = [
//   { name: "applicantID", label: "Applicant Id", align: 'left' },
//   { name: "firstName", label: "First Name", align: 'left' },
//   { name: "lastName", label: "Last Name", align: 'left' },
//   { name: "email", label: "Email", align: 'left' },
//   { name: "phone", label: "Phone", align: 'left' },
//   { name: "address", label: "Address", align: 'left' },
//   { name: "qualification", label: "Qualification", align: 'left' },
//   { name: "designation", label: "Designation", align: 'left' },
//   { name: "dob", label: "Date of Birth", align: 'left' },
//   { name: "nationality", label: "Nationality", align: 'left' },
//   { name: "companyName", label: "Company Name", align: 'left' },
//   { name: "companyContactNumber", label: "Company Contact Number", align: 'left' },
//   { name: "companyAddress", label: "Company Address", align: 'left' },
//   { name: "status", label: "Status", align: 'left' },
//   { name: "createdById", label: "Created By Id", align: 'left' },
//   { name: "updatedById", label: "Updated By Id", align: 'left' },
//   { name: "updatedDate", label: "Updated Date", align: 'left' },
//   { name: "isDeleted", label: "Is Deleted", align: 'left' },
//   { name: "remarks", label: "Remarks", align: 'left' },
// ];

export const generateRows = (list, tableheads, onEdit, onDelete) => {
  return list?.data?.map((rowItem, rowIndex) => {
    let rowCells = {};

    tableheads.forEach((column, colIndex) => {
      const columnName = column.name;
      const columnValue = rowItem[columnName];

      if (columnName === "action") {
        rowCells[columnName] = (
          <SoftBox width="8rem" textAlign="left">
            <IconButton
              size="small"
              color="inherit"
              aria-controls="edit"
              aria-haspopup="true"
              variant="contained"
              onClick={() => onEdit(rowItem.applicantID)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              aria-controls="delete"
              aria-haspopup="true"
              variant="contained"
              onClick={() => onDelete(rowItem.applicantID)}
            >
              <DeleteIcon />
            </IconButton>
          </SoftBox>
        );
      } else {
        rowCells[columnName] = (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            {columnValue}
          </SoftTypography>
        );
      }
    });

    return rowCells;
  });
};

