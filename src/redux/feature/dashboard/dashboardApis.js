import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET DASHBOARD DATA
        getDashboardData: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args?.timeFilter) {
                    params.append("timeFilter", String(args.timeFilter)); // today/week/month
                }

                return {
                    url: "/admin/states",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["DASHBOARD"],
        }),

    }),
});

export const {
    useGetDashboardDataQuery,
} = dashboardApis