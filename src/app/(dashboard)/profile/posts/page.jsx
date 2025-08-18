import { CraetPost } from "@/components/dashboard_components/Button";
import PostTable from "@/components/dashboard_components/Posttable";
import { getAllPostsApi } from "@/service/postServices";
import Pagination from "@/ui/Pagination";
import Search from "@/ui/Search";
import Spiner from "@/ui/Spiner";
import queryString from "query-string";
import { Suspense } from "react";

async function page({searchParams}) {
  
  const query =queryString.stringify(searchParams);
  const {totalPages} = await getAllPostsApi(query);
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
        <h1 className="font-bold text-xl">لیست پست ها</h1>
        <Search />
        <CraetPost />
      </div>
      <Suspense fallback={<Spiner />} key={query}>
        <PostTable query={query} />
      </Suspense>
      <Pagination totalPages={totalPages}/>
    </>
  );
}

export default page;
