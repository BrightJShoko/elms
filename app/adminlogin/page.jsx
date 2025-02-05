"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { adminSignin } from "../lib/actions";

const adminlogin = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await adminSignin(formData);

    if (response?.error) {
      setError(response.error); // Set the error message from the server action
    } else if (response?.success) {
      router.push(response.redirectTo); // Redirect if successful
    }
  }
  return (
    <div className="bg-[#00913E]  shadow p-4 w-[100%] h-screen items-center flex justify-center overflow-hidden relative flex-col ">
      <div className="flex flex-col">
        <div className="bg-white rounded-lg shadow p-4  flex flex-col items-center content-center mt-4">
          <Image
            alt="Nav Icon"
            objectFit="contain"
            width={100}
            height={100}
            src="/gz.png"
          />

          <span className=" items-center content-center justify-center text-center text-[#00913E] text-[30px] font-extrabold">
            ADMIN LOGIN
          </span>
          <form
            className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-4 "
            onSubmit={handleSubmit}
          >
            <input
              className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
              type="text"
              placeholder="Username"
              name="username"
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
              Login
            </button>
          </form>

          {error && <p className="mt-2 text-red-500">{error}</p>}
          <div className="gap-2 flex">
            <span className="text-green-500 ">Don't Have an Account ?</span>
            <Link className="text-[#00913E] font-semibold " href="/signup">
              Signup
            </Link>
          </div>
        </div>
        <Link
          href="/"
          className=" w-[580px] p-[20px] bg-white mt-5 rounded-lg text-[#00913E]  text-center"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default adminlogin;
