import Card from "@/components/dashboard_components/Card";
import PostTable from "@/components/dashboard_components/Posttable";

import { showCountData } from "@/service/dashboarddata";
import Spiner from "@/ui/Spiner";
import React, { Suspense } from "react";
async function Page() {
  const { numberOfComments, numberOfPosts, numberOfUsers } =
    await showCountData();
  return (
    <>
   < Suspense fallback={<Spiner />}>
      <div className="grid gap-6 md:grid-cols-3 mb-8">

        <Card title={"کاربران"} value={numberOfUsers} type={"user"} />
        <Card title={"پست ها"} value={numberOfPosts} type={"post"} />
        <Card title={"نظرات"} value={numberOfComments} type={"comment"} />
      </div>
      </Suspense>
      <h3 className="text-xl text-secondary-600 mb-4">اخرین پست ها</h3>
      <Suspense fallback={<Spiner />}>
        <PostTable query="sort=latest&limit=5" />
      </Suspense>
    </>
  );
}

export default Page;
