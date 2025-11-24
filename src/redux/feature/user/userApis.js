import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET USER STATE
        getUserState: builder.query({
            query: () => ({
                url: "/admin/user-states",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),

        // GET USER REPORT
        getUserReport: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/admin/users",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["USER"],
        }),

        // GET PENDING USER REPORT
        getUserPendingReport: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/admin/pending-users",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["USER"],
        }),

    }),
});

export const {
    useGetUserStateQuery,
    useGetUserReportQuery,
    useGetUserPendingReportQuery
} = dashboardApis