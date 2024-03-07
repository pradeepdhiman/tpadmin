import emptySplitApi from "utils/emptySplitApi";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";

export const settingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        updateSetting: build.mutation({
            query: (data) => updateRequest("/Setting", data),
        }),
        getSetting: build.mutation({
            query: (data) => getRequest("/Setting/List", data),
        }),
    }),
});

export const { useUpdateSettingMutation,
    useGetSettingMutation,
} = settingApi;
