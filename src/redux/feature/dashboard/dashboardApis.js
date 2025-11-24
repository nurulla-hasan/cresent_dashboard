import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET DASHBOARD DATA
        getDashboardData: builder.query({
            query: () => ({
                url: "/admin/states",
                method: "GET",
            }),
            providesTags: ["DASHBOARD"],
        }),

    }),
});

export const {
    useGetDashboardDataQuery,
} = dashboardApis