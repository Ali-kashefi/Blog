import CreatePostForm from "@/components/dashboard_components/createpost/CreatePostForm";
import Breadcrumbs from "@/ui/Breadcrumbs";
import React from "react";

function page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
            { label: "پست ها", href: "/profile/posts" },
            {
              label: "ایجاد پست",
              href: `/profile/posts/create`,
              active: true,
            },
          ]}
      />
     
      <CreatePostForm/>
   
    </>
  );
}

export default page;
