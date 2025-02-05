"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";

function Search({ placehoder }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (e) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params}`);
  };

  //   console.log(searchParams);
  //   console.log(pathname);

  return (
    <div className="relative flex">
      <MdSearch className="absolute right-[1px] top-[25%] text-[#00913E]  cursor-pointer" />
      <input
        onChange={handleSearch}
        type="text"
        placeholder={placehoder}
        className="p-2 border rounded-lg border-[#00913E] bg-transparent   text-[#00913E] font-medium text-[14px] placeholder:text-[#5e9c79] focus:outline-none focus:ring-0 focus:border-[#80aa92]"
      />
    </div>
  );
}

export default Search;
