"use client";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "context/AuthContext";



// export const metadata = {
//   title: "ثبت نام",
// };
let schema = yup
  .object({
    name: yup
      .string()
      .required("نام و نام خانوادگی الزامیست")
      .min(5, "نام و نام خانوادگی معتبر نیست"),
    email: yup.string().required("ایمیل الزامیست").email("ایمیل معتبر نیست"),
    password: yup
      .string()
      .required("رمز عبور الزامیست")
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .matches(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد"),
  })
  .required();

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const {    signup } = useAuth();
  
  const onSubmit = async (value) => {
    await    signup(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-2xl font-bold mb-8 ">ثبت نام</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <RHFTextField
            name="name"
            label="نام و نام خانوادگی"
            register={register}
            className="w-full"
            errors={errors}
          />

          <RHFTextField
            name="email"
            label="ایمیل"
            register={register}
            dir="ltr"
            type="email"
            className="w-full"
            errors={errors}
          />
          <RHFTextField
            name="password"
            label="رمز عبور"
            register={register}
            dir="ltr"
            type="password"
            className="w-full"
            errors={errors}
          />
          <Button
            className="py-3 px-4 btn btn--primary rounded-xl w-full"
            children="ثبت نام"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
