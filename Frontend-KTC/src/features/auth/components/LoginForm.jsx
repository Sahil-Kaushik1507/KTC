import React, { useCallback, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import InputControl from "../../../Components/InputComponents/InputController";

import { loginUserApi } from "../api/authApi";
import { loginSchema } from "../schemas/authSchema";

import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const methods = useForm({
    resolver: zodResolver(loginSchema),

    // Better UX + Performance
    mode: "onBlur",
    reValidateMode: "onChange",

    // Prevent field unmount re-register
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const { login } = useAuth();

  const [apiError, setApiError] = useState("");

  // Show / Hide Password
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    async (formData) => {
      try {
        setApiError("");

        const response = await loginUserApi(formData);

        console.log(response);

        login({
          user: response.data.user,
          token: response.data.token,
        });

        navigate("/");
      } catch (error) {
        console.log(error?.response);

        setApiError(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    },
    [login, navigate]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-96 rounded-2xl border border-gray-300 bg-[#CBD5E1] p-2 text-lg font-bold text-[#1E293B] shadow-lg backdrop-blur-sm">
          
          <h1 className="mb-8 rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-center text-3xl font-bold text-white">
            KTC Login
          </h1>

          <div className="grid grid-cols-1 gap-4 p-4">
            <InputControl
              name="email"
              label="Email"
              type="email"
            />

            {/* Password Field + Buttons */}
            <div>
              <InputControl
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
              />

              <div className="mt-2 flex items-center justify-between px-1">
                {/* Show Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-sm font-medium text-[#0F766E] transition hover:text-[#115E59]"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>

                {/* Forgot Password Button */}
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-[#0F766E] transition hover:text-[#115E59]"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          {apiError && (
            <p className="mb-3 text-center text-sm text-red-600">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-14 w-2/3 rounded-lg bg-[#0F766E] py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0D9488] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}