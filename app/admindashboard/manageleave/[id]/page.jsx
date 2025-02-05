"use client";
import React, { useState } from "react";
import { updateLeaveStatus } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const ManageLeaveRequest = ({ leaveId }) => {
  const { id } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    let message = "Something went wrong.";
    let messageType = "error";

    if (!status) {
      alert("Please select a status.");
      return;
    }

    const result = await updateLeaveStatus(id, status);
    if (result.success) {
      message = result.success; // Success message
      messageType = "success";
      router.push("/admindashboard/manageleave");
    } else if (result.error) {
      message = result.error; // Error message
      messageType = "error";
    }
    setMessage(message);
    setMessageType(messageType);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <div>
        <span className="font-semibold text-[14px] text-[#00913E] mb-4">
          Manage Leave Request
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-8 "
          onSubmit={handleUpdateStatus}
        >
          <select
            className="p-[40px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[100px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="general">Select Decision</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>

          <button
            className="text-white bg-[#00913E] w-[100%] rounded-lg mb-[60px] p-[30px]"
            type="submit"
          >
            Done
          </button>
        </form>
      </div>
      {message && (
        <p
          className={
            messageType === "success" ? "text-green-500" : "text-red-500"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ManageLeaveRequest;
