import { baseApi } from "../baseApi";

const organizationApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET USER REPORT
        getOrganizationReport: builder.query({
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
                    url: "/admin/organizations",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["ORGANIZATION"],
        }),



    }),
});

export const {
    useGetOrganizationReportQuery,
} = organizationApis