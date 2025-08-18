import { getpost } from "@/service/postServices";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import React from "react";
import Postrow from "./postrow";

async function PostTable({query = ""}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const {posts} = await getpost(query);
  if (!posts) {
    return <Empty resourceName={"پستی"} />;
  }
  return (
    <>
      <Table>
        <Table.Header>
          <th>#</th>
          <th>عنوان</th>
          <th>دسته بندی</th>
          <th>نویسنده</th>
          <th>تاریخ ایجاد</th>
          <th>نوع</th>
          <th>عملیات</th>
        </Table.Header>
        {posts.map((post, index) => (
          <Table.Body>
            <Postrow key={post._id } post={post} index={index} />
          </Table.Body>
        ))}
      </Table>
    </>
  );
}

export default PostTable;
