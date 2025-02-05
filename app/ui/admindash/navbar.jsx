"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAdminLeaveStats, getLoggedInUser } from "@/app/lib/actions";

const notificationsPath = "/admindashboard/notifications";
export const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getLoggedInUser();
      setUser(userData);
    }
    fetchUser();
  }, []);

  const [stats, setStats] = useState({
    pendingLeaves: 0,
  });
  useEffect(() => {
    const getStats = async () => {
      const data = await fetchAdminLeaveStats();
      setStats(data);
    };
    getStats();
  }, []);

  const pathname = usePathname();
  return (
    <div className=" bg-white h-[70px] shadow-md  content-center items-center flex sticky top-0">
      <div className="text-[#00913E] items-center content-center m-4 font-semibold text-[18px] flex-[4]">
        Admin Dashboard
      </div>
      <div className=" flex-[1] flex-row items-center content-center relative ">
        {stats.pendingLeaves > 0 && (
          <div className="absolute -top-1 left-5 bg-red-500 text-white rounded-full w-[20px] h-[20px] text-xs flex items-center justify-center">
            {stats.pendingLeaves}
          </div>
        )}

        <div>
          <Link href={notificationsPath}>
            {notificationsPath === pathname ? (
              <Image
                alt="Nav Icon"
                objectFit="contain"
                width={30}
                height={30}
                src="/bell_green.png"
              />
            ) : (
              <Image
                alt="Nav Icon"
                objectFit="contain"
                width={30}
                height={30}
                src="/bell_white.png"
              />
            )}
          </Link>
        </div>
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
            Admin
          </span>
        </div>
      </div>
    </div>
  );
};
