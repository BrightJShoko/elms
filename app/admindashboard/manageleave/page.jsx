import Pagination from "@/app/ui/admindash/pagination";
import Link from "next/link";
import React from "react";
import Search from "@/app/ui/admindash/search";
import { fetchAllEmployeeLeaves } from "@/app/lib/data";

const manageleave = async ({ searchParams }) => {
  searchParams = await searchParams;
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, leaves } = await fetchAllEmployeeLeaves(q, page);
  // console.log("leave:", leaves);
  // console.log("leave.employeeId:", leaves.employeeId);
  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <div className="font-semibold text-[14px] text-[#00913E] mb-4">
        Manage Leave
      </div>
      <div className="flex justify-end mb-4 ">
        <Search placehoder="Search by leave type" />
      </div>
      <div className="overflow-hidden overflow-x-auto rounded-[18px] border border-gray-200 ">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[80px]">
                Code
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[150px]">
                Name
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[150px]">
                Leave Type
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[120px]">
                From
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[120px]">
                To
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[20px] ">
                days
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[300px]">
                Reason
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[100px]">
                Status
              </th>

              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[100px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {leave.employeeId?.code || "N/A"}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {leave.employeeId?.firstname || "N/A"}{" "}
                  {leave.employeeId?.lastname || ""}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {leave.leaveType}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {leave.startDate?.toString().slice(4, 16)}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {leave.endDate?.toString().slice(4, 16)}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {Math.ceil(
                    (new Date(leave.endDate) - new Date(leave.startDate)) /
                      (1000 * 60 * 60 * 24)
                  )}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {leave.reason}
                </td>
                <td
                  className={`border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ${
                    leave.status === "approved" ? "text-blue-900" : ""
                  } ${leave.status === "pending" ? "text-green-500" : ""} ${
                    leave.status === "declined" ? "text-red-500" : ""
                  }`}
                >
                  {leave.status}
                </td>

                <td
                  className={`border border-gray-300 p-2  font-medium text-[14px] text-[#00913E] pl-2  `}
                >
                  {leave.status === "pending" && (
                    <div className=" flex gap-4 items-center">
                      <Link
                        href={`/admindashboard/manageleave/${leave.id}`}
                        className="flex gap-4 bg-[#00913E]   rounded-lg  text-nowrap items-center px-1 py-1 text-white text-[14px]font-medium"
                      >
                        Manage Here
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default manageleave;
