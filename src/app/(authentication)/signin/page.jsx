"use client";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "context/AuthContext";
import { SpinnerMini } from "@/ui/Spiner";
function Signin() {
  let schema = yup
    .object({
      email: yup.string().required("ایمیل الزامیست").email("ایمیل معتبر نیست"),
      password: yup
        .string()
        .required("رمز عبور الزامیست")
        .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
        .matches(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const { signin} = useAuth();
  const submiteForm = async (value) => {
    
    await signin(value);
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-2xl font-bold mb-8">ورود</h1>

        <form className="space-y-4" onSubmit={handleSubmit(submiteForm)}>
          <RHFTextField
            label={"ایمیل"}
            type="email"
            name="email"
            className="w-full"
            register={register}
            errors={errors}
            value="test1user@gmail.com"
          />
          <RHFTextField
            label="رمز عبور"
            type="password"
            name="password"
            className="w-full"
            register={register}
            errors={errors}
            value="987654321"
          />
          <div className="flex flex-col justify-center items-center ">
            {isLoading ? (
              <SpinnerMini />
            ) : (
              <Button
                className="py-3 px-4 btn btn--primary rounded-xl w-full mb-8"
                children="ورود"
              />
            )}

            <Link href="/signup">
              <p className="text-primary-500 hover:text-primary-800">
                ایجاد حساب کاربری
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
