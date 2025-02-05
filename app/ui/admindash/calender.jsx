"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchForCalender } from "@/app/lib/actions";

const Calendar = () => {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    search: "",
  });
  const [daysToShow, setDaysToShow] = useState([]);

  // Fetch leave data
  useEffect(() => {
    async function getLeaves() {
      const data = await fetchForCalender();
      if (!data.error) {
        setLeaves(data);
      } else {
        console.error(data.error);
      }
    }
    getLeaves();
  }, []);

  // Update daysToShow whenever filter dates change
  useEffect(() => {
    if (filter.startDate && filter.endDate) {
      setDaysToShow(generateDays(filter.startDate, filter.endDate));
    }
  }, [filter.startDate, filter.endDate]);

  // Generate days list based on range
  const generateDays = (start, end) => {
    let days = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      days.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  // Filter leaves based on search & date range
  const filteredLeaves = leaves.filter((leave) => {
    const employeeName =
      `${leave.employeeId?.firstname} ${leave.employeeId?.lastname}`.toLowerCase();
    const matchesSearch = employeeName.includes(filter.search.toLowerCase());

    return (
      new Date(leave.startDate) <= new Date(filter.endDate) &&
      new Date(leave.endDate) >= new Date(filter.startDate) &&
      matchesSearch
    );
  });

  // Calculate bar position dynamically
  const calculateBarPosition = (startDate, endDate) => {
    const firstDay = new Date(filter.startDate);
    const lastDay = new Date(filter.endDate);
    const leaveStart = new Date(startDate);
    const leaveEnd = new Date(endDate);

    const totalDays = daysToShow.length;
    const dayWidth = 100 / totalDays; // Each day takes a percentage width

    // Calculate left position (how many days from the start)
    let startOffset = Math.max(
      0,
      Math.round((leaveStart - firstDay) / (1000 * 60 * 60 * 24))
    );

    // Calculate width (number of leave days within the visible range)
    let leaveDays = Math.min(
      totalDays - startOffset,
      Math.round((leaveEnd - leaveStart) / (1000 * 60 * 60 * 24)) + 1
    );

    return {
      left: startOffset * dayWidth,
      width: Math.max(leaveDays * dayWidth, 5), // Ensure minimum width
    };
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="p-2">
        <span className="font-semibold text-[14px] text-[#00913E]">
          Leave Calendar
        </span>
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex space-x-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search Employee"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="p-2 border rounded-lg border-[#00913E] bg-transparent text-[#00913E] font-medium text-[14px] placeholder:text-[#5e9c79] focus:outline-none focus:ring-0 focus:border-[#80aa92]"
        />

        <div className="flex space-x-4 items-center flex-nowrap">
          <span className="font-semibold text-[14px] text-[#00913E]">From</span>
          <DatePicker
            selected={filter.startDate}
            onChange={(date) => setFilter({ ...filter, startDate: date })}
            className="p-2 border border-[#00913E] rounded-lg text-[#5e9c79] font-medium text-[14px] placeholder:text-[#5e9c79] focus:outline-none focus:ring-0 focus:border-[#80aa92]"
          />
          <span className="font-semibold text-[14px] text-[#00913E]">To</span>
          <DatePicker
            selected={filter.endDate}
            onChange={(date) => setFilter({ ...filter, endDate: date })}
            className="p-2 border border-[#00913E] rounded-lg text-[#5e9c79] font-medium text-[14px] placeholder:text-[#5e9c79] focus:outline-none focus:ring-0 focus:border-[#80aa92]"
          />
        </div>
      </div>

      {/* Calendar Table */}
      <div className="overflow-hidden overflow-x-auto rounded-[18px] border border-gray-200">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-4 w-[200px] h-8">
                Employee
              </th>
              {daysToShow.map((day, index) => (
                <th
                  key={index}
                  className="border font-bold text-[14px] text-[#00913E] border-gray-300 p-4 text-center bg-[#e7ecea] h-8"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => {
              const { left, width } = calculateBarPosition(
                leave.startDate,
                leave.endDate
              );
              return (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 relative font-semibold text-[14px] text-[#00913E]">
                    <div className="flex items-center gap-2">
                      <Image
                        alt="Profile Picture"
                        objectFit="contain"
                        width={40}
                        height={40}
                        src="/profile.png"
                      />
                      <div className="flex flex-col">
                        <span className="text-[14px]">
                          {leave.employeeId?.firstname}{" "}
                          {leave.employeeId?.lastname}
                        </span>
                        <span className="text-[10px]">
                          {leave.employeeId?.department}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td
                    colSpan={daysToShow.length}
                    className="relative border border-gray-300 p-2 bg-[#e7ecea]"
                    style={{ height: "50px" }}
                  >
                    {left >= 0 && width > 0 && (
                      <div
                        className="absolute bg-[#00913E] text-white text-center h-8 rounded flex items-center justify-center"
                        style={{
                          top: "50%",
                          transform: "translateY(-50%)",
                          left: `${left}%`,
                          width: `${width}%`,
                        }}
                      >
                        <span className="font-semibold text-[14px] text-white">
                          {leave.leaveType} :
                        </span>
                        <span className="font-medium text-[14px] text-white">
                          {leave.reason}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
