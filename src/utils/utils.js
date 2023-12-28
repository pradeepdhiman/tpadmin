
import emptySplitApi from "./emptySplitApi";
import { authUser } from "layouts/authentication/functions/query";

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

export const readRequest = (endpoint, id) => ({
  url: `${endpoint}/${id}`,
  method: "GET",
  headers: createHeaders(),
});

export const updateRequest = (endpoint, id, data) => ({
  url: `${endpoint}/${id}`,
  method: "PUT",
  body: JSON.stringify(data),
  headers: createHeaders(),
});

export const deleteRequest = (endpoint, id) => ({
  url: `${endpoint}/${id}`,
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

