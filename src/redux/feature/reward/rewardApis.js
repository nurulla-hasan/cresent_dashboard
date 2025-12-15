import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET USER STATE
        getRewardState: builder.query({
            query: () => ({
                url: "/rewards/admin/analytics",
                method: "GET",
            }),
            providesTags: ["REWARD"],
        }),

        // GET USER REPORT
        getRewardReport: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value !== undefined && value !== null && value !== "") {
                            params.append(key, value);
                        }
                    }); 
                }
                return {
                    url: "/rewards/admin/all",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["REWARD"],
        }),

    }),
});

export const {
    useGetRewardStateQuery,
    useGetRewardReportQuery,
} = dashboardApis;