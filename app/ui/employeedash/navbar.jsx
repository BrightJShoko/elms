"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLoggedInUser } from "@/app/lib/actions";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getLoggedInUser();
      setUser(userData);
    }
    fetchUser();
  }, []);

  return (
    <div className=" bg-white h-[70px] shadow-md content-center items-center flex sticky top-0">
      <div className="text-[#00913E] items-center content-center m-4 font-semibold text-[18px] flex-[4]">
        Employee Dashboard
      </div>

      <div className="flex flex-row mr-4 items-center">
        <div>
          <Image
            alt="Nav Icon"
            objectFit="contain"
            width={40}
            height={40}
            src="/profile.png"
          />
        </div>
        <div className="flex flex-col">
          {user ? (
            <span className=" font-semibold text-[16px] text-[#00913E]">
              {user.name}
            </span>
          ) : (
            <p className=" font-semibold text-[16px] text-[#00913E]">
              Loading..
            </p>
          )}
          <span className=" font-semibold text-[9px] text-[#00913E]">
            Employee
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
