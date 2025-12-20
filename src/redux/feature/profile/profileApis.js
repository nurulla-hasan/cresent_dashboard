
import { baseApi } from "../baseApi";

const profileApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfilePhoto: builder.mutation({
      query: (formData) => ({
        url: "/auth/update-photo",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["PROFILE"],
    }),

    updateAuthData: builder.mutation({
      query: (data) => ({
        url: "/auth/update-auth-data",
        method: "PATCH",
        body: data,
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
  useUpdateProfilePhotoMutation,
  useUpdateAuthDataMutation,
  useChangePasswordMutation,
} = profileApis;

