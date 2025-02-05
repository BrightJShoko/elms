"use client";
import { applyLeave } from "@/app/lib/actions";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Applyleave = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    let message = "Something went wrong.";
    let messageType = "error";

    const response = await applyLeave(formData);
    if (response.success) {
      message = response.success; // Success message
      messageType = "success";
      router.push("/employeedashboard/leaves");
    } else if (response.error) {
      message = response.error; // Error message
      messageType = "error";
    }
    setMessage(message);
    setMessageType(messageType);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-[1130px] ">
      <div>
        <span className="font-semibold text-[14px] text-[#00913E] mb-4">
          Apply For Leave
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-8 "
          onSubmit={handleSubmit}
        >
          <select
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            value={formData.leaveType}
            onChange={(e) =>
              setFormData({ ...formData, leaveType: e.target.value })
            }
          >
            <option value="general">Choose Leave Type</option>
            <option value="Ordinary">Ordinary</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Duty">Duty</option>
            <option value="Special">Special</option>
            <option value="Compasionate">Compasionate</option>
            <option value="Matenity">Matenity</option>
            <option value="CILL">CILL</option>
            <option value="Study">Study</option>
            <option value="Time Off Incase of Overtime">
              Time Off Incase of Overtime
            </option>
          </select>
          <div className="flex w-[100%] gap-4 mb-4">
            <div className="w-1/2">
              <DatePicker
                selected={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
                className="p-[20px] w-[540px] text-[#00913E] rounded-lg border border-[#00913E] focus:outline-none focus:ring-0 focus:border-[#80aa92] placeholder:text-[#00913E]"
                placeholderText="From Date"
                name="startDate"
              />
            </div>
            <div className="w-1/2">
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
                className="p-[20px] w-[540px] text-[#00913E] rounded-lg border border-[#00913E] focus:outline-none focus:ring-0 focus:border-[#80aa92] placeholder:text-[#00913E]"
                placeholderText="To Date"
                name="endDate"
              />
            </div>
          </div>

          <textarea
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            rows={5}
            placeholder="Reason or Description"
          ></textarea>
          <button
            className="text-white bg-[#00913E] w-[100%] rounded-lg mb-[40px] p-[20px]"
            type="submit"
          >
            Apply
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

export default Applyleave;
