"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { changeAdminpass } from "@/app/lib/actions";

const changepass = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await changeAdminpass(formData);

    if (response?.error) {
      setError(response.error);
      setSuccess("");
    } else if (response?.success) {
      setSuccess(response.success);
      router.push(response.redirectTo);
      setError("");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 items-center ">
      <div className="items-center content-center">
        <span className="font-semibold text-[14px] text-[#00913E] mb-4">
          Change Admin Password
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-8 "
          onSubmit={handleSubmit}
        >
          <input
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[50px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder="User Name"
            name="username"
            required
          />
          <input
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[50px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="password"
            placeholder="Current Password"
            name="current"
            required
          />
          <input
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[50px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="password"
            placeholder="New Password"
            name="newpassword"
            required
          />
          <input
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[50px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            required
          />

          <button
            className="text-white bg-[#00913E] w-[100%] rounded-lg mb-[40px] p-[20px]"
            type="submit"
          >
            Add
          </button>
        </form>
        <div>
          {error && (
            <p className="mt-2 text-red-500 content-center items-center">
              {error}
            </p>
          )}
          {success && (
            <p className="mt-2 text-green-500 content-center items-center">
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default changepass;
