import emptySplitApi from "./emptySplitApi";


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
    const createEndpointUrl = (endpoint) => `${baseUrl}/${entityName}/${endpoint}`;

    return emptySplitApi.injectEndpoints({
        endpoints: (build) => ({
            getList: build.query({
                query: () => createEndpointUrl(endpoints.list),
            }),
            create: build.mutation({
                query: (data) => ({
                    url: createEndpointUrl(endpoints.create),
                    method: "POST",
                    body: JSON.stringify(data),
                }),
            }),
            update: build.mutation({
                query: ({ id, data }) => ({
                    url: createEndpointUrl(`${endpoints.update}/${id}`),
                    method: "PUT",
                    body: JSON.stringify(data),
                }),
            }),
            delete: build.mutation({
                query: (id) => ({
                    url: createEndpointUrl(`${endpoints.delete}/${id}`),
                    method: "DELETE",
                }),
            }),
        }),
    });
};

// Example usage for an "applicant" entity
// const applicantApis = crudApi({
//     entityName: "applicant",
//     baseUrl: "/Applicant", // Base URL for the entity's API
//     endpoints: {
//         list: "List", // List endpoint
//         create: "CreateApplicant", // Create endpoint
//         update: "UpdateApplicant", // Update endpoint
//         delete: "DeleteApplicant", // Delete endpoint
//     },
// });

// export const {
//     useGetListQuery,
//     useCreateMutation,
//     useUpdateMutation,
//     useDeleteMutation,
// } = applicantApis;
