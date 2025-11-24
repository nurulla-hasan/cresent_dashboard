import { ErrorToast, SuccessToast } from "@/lib/utils";
import { SetAccessToken, SetUserRole } from "./authSlice";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login Endpoint (Mutation)
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data?.data?.accessToken;
          const user = data?.data;
          const userRole = data?.data?.role;

          if (!accessToken || !user) {
            ErrorToast("Invalid login response.");
            return;
          }

          if (
            user?.role !== "STUDENT" &&
            user?.role !== "COMPANY" &&
            user?.role !== "EMPLOYEE"
          ) {
            ErrorToast("You are not authorized to login.");
            return;
          }

          // Set access token first
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userRole", userRole);
          dispatch(SetAccessToken(accessToken));
          dispatch(SetUserRole(userRole));
          SuccessToast("Login successful.");
          window.location.href = "/";
        } catch (error) {
          // console.log(error);
          ErrorToast(error?.error?.data?.message || "Login failed.");
        }
      },
    }),

    // Register Endpoint (Mutation)
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const otpToken = data?.data || data;
          if (otpToken) {
            window.location.href = `/verify-otp?type=signup&email=${encodeURIComponent(
              email
            )}&otpToken=${encodeURIComponent(otpToken)}`;
          }
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "Registration failed.");
        }
      },
    }),

    // RESEND SIGNUP OTP
    resendSignupOTP: builder.mutation({
      query: (email) => ({
        url: "/users/resend-verification-email",
        method: "POST",
        body: email,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          SuccessToast(data?.message);
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "Failed to send new OTP.");
        }
      },
    }),

    // OTP VERIFY FOR SIGNUP
    verifyOTPForSignup: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          SuccessToast(data?.message);
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "OTP verification failed.");
        }
      },
    }),

    // FORGET PASSWORD
    forgetPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/users/forgot-password",
          method: "POST",
          body: email,
        };
      },
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const otpToken = data?.data?.otpToken;
          if (otpToken) {
            window.location.href = `/verify-otp?type=forget-password&email=${encodeURIComponent(
              email
            )}&otpToken=${encodeURIComponent(otpToken)}`;
          }
          SuccessToast("OTP sent successfully!");
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "Failed to send new OTP.");
        }
      },
    }),

    // OTP VERIFY FOR RESET PASSWORD
    verifyOTPForResetPassword: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp-forgot-password",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          SuccessToast(data?.message);
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "OTP verification failed.");
        }
      },
    }),

    // RESEND RESET OTP
    resendResetOTP: builder.mutation({
      query: (email) => ({
        url: "/users/resend-otp",
        method: "POST",
        body: email,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          SuccessToast(data?.message);
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "Failed to send new OTP.");
        }
      },
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/users/update-password`,
          method: "PUT",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          SuccessToast(data?.message);
          window.location.href = "/login";
        } catch (error) {
          ErrorToast(error?.error?.data?.message || "Failed to reset password.");
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOTPForSignupMutation,
  useVerifyOTPForResetPasswordMutation,
  useResendResetOTPMutation,
  useResendSignupOTPMutation,
  useResetPasswordMutation,
} = authApi;
