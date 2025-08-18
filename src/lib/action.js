"use server";

import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import { createCommentApi } from "@/service/commentApi";
import setCookiesOnReq from "utils/setCoociesOnreq";

export async function createComment(prevState, { formData, postId, parentId }) {
  const cookieStore = cookies();

  const rawFormData = {
    text: formData.get("text"),
    postId,
    parentId,
  };
  try {
    const options = setCookiesOnReq(cookieStore);
    const {
      data: { message },
    } = await createCommentApi(rawFormData, options);
    revalidatePath("/blogs");
    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;
    return {
      error,
    };
  }
}
