import { cookies } from "next/headers";
import setCookiesOnReq from "utils/setCoociesOnreq";
import { getAlluserApi } from "./authService";
import { getAllPostsApi } from "./postServices";
import { getAllcommentApi } from "./commentApi";

export async function showCountData() {
    const cookieStore = cookies();
    const option = setCookiesOnReq(cookieStore);
    try {

        const data = await Promise.all([
            getAlluserApi(option),
            getAllPostsApi(),
            getAllcommentApi(option)


        ])
        const numberOfUsers = Number(data[0].users.length ?? "0");
        const numberOfPosts = Number(data[1].posts.length ?? "0");
        const numberOfComments = Number(data[2].commentsCount ?? "0");
        
        return {
            numberOfPosts,
            numberOfUsers,
            numberOfComments,
        };
    } catch (error) {
        console.error("خطا", error.response.data.message || error);
        throw new Error("خطا در بارگذاری اطلاعات");
    }

}