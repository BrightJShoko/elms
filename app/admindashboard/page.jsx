"use client";
import React from "react";
import Card from "../ui/admindash/card";
import Calender from "../ui/admindash/calender";
import { useEffect, useState } from "react";
import { fetchAdminLeaveStats, fetchEmployeeLeaveStats } from "../lib/actions";

const admindash = () => {
  const [stats, setStats] = useState({
    totalLeaves: 0,
    approvedLeaves: 0,
    pendingLeaves: 0,
    declinedLeaves: 0,
  });
  useEffect(() => {
    const getStats = async () => {
      const data = await fetchAdminLeaveStats();
      setStats(data);
    };
    getStats();
  }, []);

  return (
    <div className=" flex flex-col">
      <div className="bg-white rounded-lg shadow p-4 flex justify-between mb-4">
        <Card
          title={stats.totalLeaves}
          subTitle="Total Leaves"
          sub="Applied"
          background=" bg-[#E5E0E0]"
        />
        <Card
          title={stats.approvedLeaves}
          subTitle="Total Approved"
          sub="Leaves"
          background=" bg-[#C1DFB7]"
        />
        <Card
          title={stats.pendingLeaves}
          subTitle="Total Pending"
          sub="Leaves"
          background=" bg-[#ADEC96]"
        />
        <Card
          title={stats.declinedLeaves}
          subTitle="Total Declined"
          sub="Leaves"
          background=" bg-[#CFC5CF]"
        />
      </div>
      <div>
        <Calender />
      </div>
    </div>
  );
};

export default admindash;
