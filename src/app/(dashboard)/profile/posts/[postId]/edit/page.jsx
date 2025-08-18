
import CreatePostForm from "@/components/dashboard_components/createpost/CreatePostForm";
import { getPostById } from "@/service/postServices";
import Breadcrumbs from "@/ui/Breadcrumbs";
import NotFound from "app/not-found";
import React from "react";

async function page({ params: { postId } }) {
  const {
    data: { post },
  } = await getPostById(postId);
  console.log("Post:", post);

  if (!post) {
    return <NotFound />;
  }
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست ها", href: "/profile/posts" },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${postId}/edit`,
            active: true,
          },
        ]}
      />
      <CreatePostForm postToEdit={post}/>
    </div>
  );
}

export default page;
