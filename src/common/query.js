import emptySplitApi from "utils/emptySplitApi";
import { updateRequest } from "utils/utils";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { readRequest } from "utils/utils";


const categoryApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        listCategory: build.query({
            query: () => readRequest("/CourseCategory/List"),
        }),
        createCategory: build.mutation({
            query: (data) => createRequest("/CourseCategory", data),
        }),
        getCategory: build.mutation({
            query: (id) => getRequest("/CourseCategory", id),
        }),
        updateCategory: build.mutation({
            query: (data) => updateRequest("/CourseCategory", data),
        }),
        deleteCategory: build.mutation({
            query: (id) => deleteRequest("/CourseCategory", id),
        }),
    }),
});

export const {
    useListCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApis;