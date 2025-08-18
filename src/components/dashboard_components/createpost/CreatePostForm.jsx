"use client";
import { Controller, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import useCategories from "@/hook/useCategory";
import useCreatePost from "@/hook/useCreatePost";
import { useEditPost } from "@/hook/useEditPost";
import { imageUrlToFile } from "utils/fileFormatter";
import RHFTextField from "@/ui/RHFTextField";
import RHFSelect from "@/ui/RHSelect";
import TextField from "@/ui/TextField";
import Spiner from "@/ui/Spiner";
import Button from "@/ui/Button";
import ShowImageModal from "@/ui/ShowImageModal";
const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);
  const {
    title,
    text,
    briefText,
    slug,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevPostCoverImageUrl,
  } = postToEdit;
  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      text,
      briefText,
      slug,
      readingTime,
      category: category._id,
      coverImage,
    };
  }
  const [openModal, setOpenModal] = useState(false);
  const { categories } = useCategories();
  const { createPost, isCreating } = useCreatePost();
  const { editPost, isEditing } = useEditPost();
  const [coverImageUrl, setCoverImageUrl] = useState(
    prevPostCoverImageUrl || null
  );
  const router = useRouter();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: editValues,
  });

  useEffect(() => {
    if (prevPostCoverImageUrl) {
      async function fetchMyAPI() {
        const file = await imageUrlToFile(prevPostCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyAPI();
    }
  }, []);
  useEffect(() => {
    if (coverImageUrl) {
      setOpenModal(true);
    }
  }, [coverImageUrl]);
const handleCloseModal = () => {
    setOpenModal(false);
    setCoverImageUrl(null);
    setValue("coverImage", null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
            // revalidatePath(`/profile/posts/${editId}/edit`, "page");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
          // revalidatePath("/profile/posts");
          reset();
        },
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        label="عنوان"
        name="title"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="متن کوتاه"
        name="briefText"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="متن"
        name="text"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="اسلاگ"
        name="slug"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="زمان مطالعه"
        name="readingTime"
        register={register}
        required
        errors={errors}
      />
      <RHFSelect
        label="دسته بندی"
        required
        name="category"
        register={register}
        options={categories}
      />
      <Controller
        control={control}
        name="coverImage"
        rules={{ required: "عکس کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...field } }) => {
          return (
            <TextField
              {...field}
              value={value?.fileName}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setCoverImageUrl(URL.createObjectURL(file));
              }}
              label="کاور پست"
              type="file"
              id="coverImage"
            />
          );
        }}
      />
{coverImageUrl && (
  <ShowImageModal
    open={openModal}
    onClose={handleCloseModal}
    save={() => setOpenModal(false)}
  >
    <Image
      className="object-cover object-center"
      fill
      alt="cover-image"
      src={coverImageUrl}
    />
  </ShowImageModal>
)}

      <div>
        {isCreating || isEditing ? (
          <Spiner />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
}
export default CreatePostForm;


