import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET SUBSCRIPTION HISTORY
        getSubscriptionData: builder.query({
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
                    url: "/admin/subscriptions",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["DONATION"],
        }),


    }),
});

export const {
    useGetSubscriptionDataQuery,
} = dashboardApis