"use server";



import { deletePostApi } from "@/service/postServices";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import setCookiesOnReq from "utils/setCoociesOnreq";

export default async function deletePost(prevState, { postId }) {
  // try {
  //   await deletePostApi(postId);
  //   revalidatePath("/profile/posts");
  //   redirect("/profile/posts");
  // } catch (error) {}
  const cookieStore = cookies();

  try {
    const options = setCookiesOnReq(cookieStore);
    const { message } = await deletePostApi(postId, options);

    revalidatePath("/profile/posts");

    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;
    console.log({ error });

    return {
      error,
    };
  }
}
