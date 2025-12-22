
import { baseApi } from "../baseApi";

const profileApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["PROFILE"],
    }),

    updateSuperAdminMe: builder.mutation({
      query: (formData) => ({
        url: "/super-admin/update-me",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["PROFILE"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAuthProfileQuery,
  useUpdateSuperAdminMeMutation,
  useChangePasswordMutation,
} = profileApis;

