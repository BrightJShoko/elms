import React from "react";
import Card from "../ui/admindash/card";
import Pagination from "../ui/admindash/pagination";
import { fetchEmployeeLeaves } from "@/app/lib/data";
import Search from "@/app/ui/admindash/search";
import { fetchEmployeeLeaveStats } from "../lib/actions";

const employeedash = async ({ searchParams }) => {
  searchParams = await searchParams;
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, leaves } = await fetchEmployeeLeaves(q, page);
  const { totalLeaves, approvedLeaves, pendingLeaves, declinedLeaves } =
    await fetchEmployeeLeaveStats();
  console.log("total leaves", totalLeaves);

  return (
    <div className=" flex flex-col">
      <div className="bg-white rounded-lg shadow p-4 flex justify-between mb-4">
        <Card
          title={totalLeaves}
          subTitle="Total Leaves"
          sub="Applied"
          background=" bg-[#E5E0E0]"
        />
        <Card
          title={approvedLeaves}
          subTitle="Total Approved"
          sub="Leaves"
          background=" bg-[#C1DFB7]"
        />
        <Card
          title={pendingLeaves}
          subTitle="Total Pending"
          sub="Leaves"
          background=" bg-[#ADEC96]"
        />
        <Card
          title={declinedLeaves}
          subTitle="Total Declined"
          sub="Leaves"
          background=" bg-[#CFC5CF]"
        />
      </div>
      <div className="bg-white rounded-lg shadow p-4 ">
        <div className="font-semibold text-[14px] text-[#00913E] mb-4">
          All Leave Requests
        </div>
        <div className="flex justify-end mb-4 ">
          <Search placehoder="Search by leave type" />
        </div>
        <div className="overflow-hidden overflow-x-auto rounded-[18px] border border-gray-200 ">
          <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[150px]">
                  My Name
                </th>
                <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[150px]">
                  My Code
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
                <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[150px]">
                  Feedback By
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td className=" border border-gray-300 p-2  gap-4 relative font-medium text-[14px] text-[#00913E] ">
                    {leave.employeeId.firstname} {}
                    {leave.employeeId.lastname}
                  </td>
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {leave.employeeId.code}
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
                  <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                    {leave.approvedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination count={count} />
      </div>
    </div>
  );
};

export default employeedash;
