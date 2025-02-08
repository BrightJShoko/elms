import Pagination from "@/app/ui/admindash/pagination";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Search from "@/app/ui/admindash/search";
import { fetchExpiredLeaves } from "@/app/lib/data";
import { deleteExpiredLeave } from "@/app/lib/actions";

const Expired = async ({ searchParams }) => {
  searchParams = await searchParams;
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, expired } = await fetchExpiredLeaves(q, page);

  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <div className=""></div>
      <div className="font-semibold text-[14px] text-[#00913E] mb-4">
        Expired Leaves Notifications
      </div>
      <div className="flex justify-end mb-4 ">
        <Search placehoder="Search by leave type" />
      </div>
      {count === 0 ? (
        <p className="text-gray-500">No Expired Leaves Notifications.</p>
      ) : (
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
              {expired.map((expire) => (
                <tr key={expire.id}>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {expire.employeeId?.code || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {expire.employeeId?.firstname} {expire.employeeId?.lastname}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {expire.leaveType}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {expire.startDate?.toString().slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {expire.endDate?.toString().slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {Math.ceil(
                      (new Date(expire.endDate) - new Date(expire.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {expire.reason}
                  </td>
                  <td
                    className={`border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ${
                      expire.status === "approved" ? "text-blue-900" : ""
                    } ${expire.status === "pending" ? "text-green-500" : ""} ${
                      expire.status === "declined" ? "text-red-500" : ""
                    }`}
                  >
                    {expire.status}
                  </td>

                  <td className="border border-gray-300 p-2  font-medium text-[14px] text-[#00913E] pl-10  ">
                    <div className=" flex gap-4 items-center">
                      <form action={deleteExpiredLeave}>
                        <input type="hidden" name="id" value={expire._id} />
                        <button>
                          <Image
                            alt="Nav Icon"
                            objectFit="contain"
                            width={18}
                            height={18}
                            src="/delete.png"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination count={count} />
    </div>
  );
};

export default Expired;
