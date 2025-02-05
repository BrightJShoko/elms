import React from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/admindash/pagination";
import { fetchEmployees } from "@/app/lib/data";
import Search from "@/app/ui/admindash/search";
import { deleteEmployee } from "@/app/lib/actions";

const managemployee = async ({ searchParams }) => {
  searchParams = await searchParams;
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, employees } = await fetchEmployees(q, page);

  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <div className="font-semibold text-[14px] text-[#00913E] mb-4">
        Employee Information
      </div>
      <div className="flex justify-between mb-4 items-center">
        <Search placehoder="Search here" />
        <Link
          href="/admindashboard/employees/addemployee"
          className="bg-[#00913E] p-[10px] rounded-lg text-white font-semibold text-[14px] "
        >
          Add New Employee
        </Link>
      </div>
      <div className="overflow-hidden overflow-x-auto rounded-[18px] border border-gray-200 ">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Code
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Name
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Email
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Gender
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                DOB
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Department
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Address
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Mobile Number
              </th>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-2 w-[200px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.code}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.firstname} {emp.lastname}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.email}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.gender}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.dob instanceof Date
                    ? emp.dob.toISOString().split("T")[0]
                    : "Invalid Date"}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.department}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.address}
                </td>
                <td className="border border-gray-300 p-2  relative font-medium text-[14px] text-[#00913E] ">
                  {emp.mobile}
                </td>
                <td className="border border-gray-300 p-2  font-medium text-[14px] text-[#00913E]  pl-7">
                  <div className=" flex gap-4 items-center">
                    <Link href={`/admindashboard/employees/${emp.id}`}>
                      <Image
                        alt="Nav Icon"
                        objectFit="contain"
                        width={18}
                        height={18}
                        src="/edit.png"
                      />
                    </Link>
                    <form action={deleteEmployee}>
                      <input type="hidden" name="id" value={emp.id} />
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
      <Pagination count={count} />
    </div>
  );
};

export default managemployee;
