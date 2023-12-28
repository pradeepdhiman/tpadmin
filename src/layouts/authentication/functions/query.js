import emptySplitApi from "utils/emptySplitApi";
import { getObject } from "utils/utils";
import { removeObject } from "utils/utils";

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: 'Authentication/authenticate',
                method: 'POST',
                body: credentials,
            }),
        })
    })
});

export const logout = () => {
    removeObject("user")
}

export const authUser = () => {
    return JSON.parse(getObject("user"))
}

export const { useLoginMutation } = authApi;
