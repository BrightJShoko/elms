"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 6;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className=" flex justify-between mt-2 font-semibold text-[14px] text-white">
      <button
        className=" py-[5px] px-[20px] cursor-pointer disabled:cursor-not-allowed bg-[#00913E] rounded-lg ease-in-out  disabled:bg-green-300"
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>

      <button
        className=" py-[5px] px-[20px] cursor-pointer disabled:cursor-not-allowed bg-[#00913E] rounded-lg ease-in-out  disabled:bg-green-300 "
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
