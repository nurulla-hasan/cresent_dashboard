import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET REWARD STATE
        getRewardState: builder.query({
            query: () => ({
                url: "/rewards/admin/analytics",
                method: "GET",
            }),
            providesTags: ["REWARD"],
        }),

        // GET REWARD REPORT
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
        
        // GET SINGLE REWARD
        getSingleReward: builder.query({
            query: (id) => ({
                url: `/rewards/admin/${id}/details`,
                method: "GET",
            }),
            providesTags: ["REWARD"],
        }),

        // UPDATE REWARD STATUS
        updateRewardStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/rewards/${id}/status`,
                method: "PATCH",
                body: { isActive },
            }),
            invalidatesTags: ["REWARD"],
        }),
    }),
});

export const {
    useGetRewardStateQuery,
    useGetRewardReportQuery,
    useGetSingleRewardQuery,
    useUpdateRewardStatusMutation,
} = dashboardApis;