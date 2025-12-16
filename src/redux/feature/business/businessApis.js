import { baseApi } from "../baseApi";

const organizationApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET BUSINESS REPORT
        getBusinessesReport: builder.query({
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
                    url: "/admin/businesses",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["USER"],
        }),

    }),
});

export const {
    useGetBusinessesReportQuery,
} = organizationApis