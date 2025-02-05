"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { employeeLogout } from "@/app/lib/actions";

const menuItems = [
  {
    tittle: "Dashboard",
    path: "/employeedashboard",
    icon: "/dashboard_white.png",
    icong: "/dashboard_green.png",
  },
  {
    tittle: "Leaves",
    path: "/employeedashboard/leaves",
    icon: "/leave_white.png",
    icong: "/leave_green.png",
  },
  {
    tittle: "Change Password",
    path: "/employeedashboard/changeepass",
    icon: "/password_white.png",
    icong: "/password_green.png",
  },
  // {
  //   tittle: "Sign Out",
  //   path: "/",
  //   icon: "/logout_white.png",
  //   icong: "/logout_green.png",
  // },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className=" text-white  space-y-10 h-screen">
      <Image
        alt="Nav Icon"
        objectFit="contain"
        width={167.97}
        height={64}
        src="/logo.png"
      />
      {menuItems.map((item, idx) => (
        <div key={idx}>
          <Link
            href={item.path}
            className={`flex flex-row items p-2 py-4 rounded-lg  items-start gap-4  hover:bg-slate-300 ${
              item.path === pathname ? "bg-white text-[#00913E]" : ""
            }`}
          >
            {item.path === pathname ? (
              <Image
                alt="Nav Icon"
                objectFit="contain"
                width={25}
                height={25}
                src={item.icong}
              />
            ) : (
              <Image
                alt="Nav Icon"
                objectFit="contain"
                width={25}
                height={25}
                src={item.icon}
              />
            )}
            <span className="font-semibold  flex text-[18px]">
              {item.tittle}
            </span>
          </Link>
        </div>
      ))}
      <div
        onClick={() => employeeLogout()}
        className="flex gap-4 flex-row items p-2 py-4 rounded-lg  items-start  hover:bg-slate-300 cursor-pointer"
      >
        <button onClick={() => employeeLogout()}>
          <Image
            alt="Nav Icon"
            objectFit="contain"
            width={25}
            height={25}
            src="/logout_white.png"
          />
        </button>
        <button
          onClick={() => employeeLogout()}
          className="font-semibold  flex text-[18px]"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
