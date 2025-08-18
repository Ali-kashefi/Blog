
import http from "./httpService";

//fetcing data by slug
export async function getpostBySlug(Slug) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/slug/${Slug}`);
    const data = await response.json();
    const post = data?.data?.post;

    return post;
}
//fetching data post/list
export async function getAllPostsApi(queries, options = {}) {

    return http
        .get(`/post/list?${queries}`, options)
        .then(({ data }) => data.data);
}
export async function getpost(queries, options) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/list?${queries}`, options, {
        cache: "force-cache",
        next: { revalidate: 2 },
    }

    );
    const {
        data: { posts, totalpage },
    } = await response.json();
    return { posts, totalpage };
}
//fetching liked post
export async function likePostApi(id) {

    return http.post(`/post/like/${id}`).then(({ data }) => data.data);
}
//fetching bookmark post
export async function bookmarkPostApi(postId) {
    return http.post(`/post/bookmark/${postId}`).then(({ data }) => data.data);
}
export async function createPostApi(data) {
    return http.post(`/post/create`, data).then(({ data }) => data.data);
}
//fetching edite post by id
export async function editPostApi({ id, data }) {
    return http.patch(`/post/update/${id}`, data).then(({ data }) => data.data);
}
export async function getPostById(id) {
    return http.get(`/post/${id}`).then(({ data }) => data);
}
export async function deletePostApi(id, options) {
    return http
        .delete(`/post/remove/${id}`, options)
        .then(({ data }) => data.data);
}
const postServices = {
    getpostBySlug,
    getpost,
    likePostApi,
    bookmarkPostApi,
    createPostApi
    , editPostApi,
    getPostById,
    deletePostApi
};
export default postServices;