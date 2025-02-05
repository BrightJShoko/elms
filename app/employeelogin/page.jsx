"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { employeeSignin } from "../lib/actions";

const emplogin = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await employeeSignin(formData);

    if (response?.error) {
      setError(response.error); // Set the error message from the server action
    } else if (response?.success) {
      router.push(response.redirectTo); // Redirect if successful
    }
  }
  return (
    <div className="bg-[#00913E]  shadow p-4 w-[100%] h-screen items-center flex justify-center overflow-hidden relative flex-col">
      <div className=" absolute top-5 ">
        <Image
          alt="Nav Icon"
          objectFit="contain"
          width={200}
          height={200}
          src="/gz.png"
        />
      </div>
      <div className="bg-white rounded-lg shadow p-4 pt-[90px] flex flex-col mt-10">
        <span className=" items-center content-center justify-center text-center text-[#00913E] text-[30px] font-extrabold">
          EMPLOYEE LOGIN
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-5 "
          onSubmit={handleSubmit}
        >
          <input
            className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder="Use Employee Code"
            name="code"
            required
          />

          <input
            className="p-[20px] w-[100%] placeholder:text-[#00913E] rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button
            className="text-white bg-[#00913E] w-[100%] rounded-lg mb-[20px] p-[20px]"
            type="submit"
          >
            Employee Login
          </button>
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
      <Link
        href="/"
        className=" w-[44.5%] p-[20px] bg-white mt-5 rounded-lg text-[#00913E]  text-center"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default emplogin;
