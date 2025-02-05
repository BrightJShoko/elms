"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/lib/actions";

const menuItems = [
  {
    tittle: "Dashboard",
    path: "/admindashboard",
    icon: "/dashboard_white.png",
    icong: "/dashboard_green.png",
  },
  {
    tittle: "Employees",
    path: "/admindashboard/employees",
    icon: "/employees_white.png",
    icong: "/employees_green.png",
  },
  {
    tittle: "Leave Management",
    path: "/admindashboard/manageleave",
    icon: "/leave_white.png",
    icong: "/leave_green.png",
  },
  {
    tittle: "Change Password",
    path: "/admindashboard/changepass",
    icon: "/password_white.png",
    icong: "/password_green.png",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className=" text-white space-y-10 h-screen ">
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
        onClick={() => adminLogout()}
        className="flex gap-4 flex-row items p-2 py-4 rounded-lg  items-start  hover:bg-slate-300 cursor-pointer"
      >
        <button onClick={() => adminLogout()}>
          <Image
            alt="Nav Icon"
            objectFit="contain"
            width={25}
            height={25}
            src="/logout_white.png"
          />
        </button>
        <button
          onClick={() => adminLogout()}
          className="font-semibold  flex text-[18px]"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
