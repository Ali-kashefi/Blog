"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const search = e.target.search;
    const serchValue = search.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", "1");
    if (serchValue) {
      newParams.set("search", serchValue);
    } else {
      newParams.delete("search");
    }
    router.push(`${pathname}?${newParams.toString()} `, { scroll: false });
  };

  return (
    <>
      <form onSubmit={formSubmitHandler} className="relative">
        <input
          key={searchParams?.get("search")}
          type="text"
          name="search"
          placeholder="جستجو ..."
          autoComplete="off"
          defaultValue={searchParams?.get("search") || ""}
          className="textField__input py-3 text-xs bg-secondary-0"
        />
        <button
          type="submit"
          className="absolute left-0 top-0 ml-3 flex h-full items-center"
        >
          <MagnifyingGlassIcon className="h-4 text-secondary-400" />
        </button>
      </form>
    </>
  );
}

export default Search;
