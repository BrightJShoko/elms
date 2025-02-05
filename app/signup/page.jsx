import React from "react";
import Image from "next/image";
import Link from "next/link";
import { adminSignup } from "@/app/lib/actions";

const signup = () => {
  return (
    <div className="bg-[#00913E]  shadow p-4 w-[100%] h-screen items-center flex justify-center overflow-hidden relative">
      <div className="bg-white rounded-lg shadow p-4  flex flex-col mt-4 items-center">
        <Image
          alt="Nav Icon"
          objectFit="contain"
          width={100}
          height={100}
          src="/gz.png"
        />
        <span className=" items-center content-center justify-center text-center text-[#00913E] text-[30px] font-extrabold">
          ADMIN SIGNUP
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-5  "
          action={adminSignup}
        >
          <div className="flex flex-col w-[50%]">
            <div className="w-[200%] flex gap-4">
              <input
                className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
                type="text"
                placeholder="Username"
                name="username"
                required
              />
              <input
                className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
            </div>
            <div className="w-[200%] flex gap-4">
              <input
                className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
                type="text"
                placeholder="First Name"
                name="firstname"
                required
              />
              <input
                className="p-[20px] w-[100%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
                type="text"
                placeholder="Last Name"
                name="lastname"
                required
              />
            </div>
          </div>
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
            Signup
          </button>
        </form>
        <div className="gap-2 flex">
          <span className="text-green-500">Already Have an Account ?</span>
          <Link className="text-[#00913E] font-semibold" href="/adminlogin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signup;
