import { baseApi } from "../baseApi";

const dashboardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET DASHBOARD DATA
        getDonationHistory: builder.query({
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
                    url: "/admin/donations",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["DONATION"],
        }),
    }),
});

export const {
    useGetDonationHistoryQuery,
} = dashboardApis