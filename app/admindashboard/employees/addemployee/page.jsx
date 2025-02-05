"use client";
import { addEmployee } from "@/app/lib/actions";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const addemployee = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <div>
        <span className="font-semibold text-[14px] text-[#00913E] mb-4">
          Add Employee
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-8 "
          action={addEmployee}
        >
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder="Employee Code"
            name="code"
            required
          />
          <select
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            name="gender"
            id="gender"
          >
            <option value="general">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="  p-[20px]  w-[500px] text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]  placeholder:text-[#00913E]"
            placeholderText="Date Of Birth"
            name="dob"
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder="First Name"
            name="firstname"
            required
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder="Last Name"
            name="lastname"
            required
          />
          <select
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            name="department"
            id="department"
          >
            <option value="general">Choose Department</option>
            <option value="ict">ICT</option>
            <option value="audit">Audit</option>
            <option value="Procurement">Procurement</option>
            <option value="services">Central Services</option>
            <option value="stores">Stores</option>
            <option value="security">Security</option>
            <option value="Canteen">Canteen</option>
            <option value="agriculture">Agriculture</option>
            <option value="exams">Examinations</option>
            <option value="affairs">Student Affairs</option>
            <option value="bursary">Bursary</option>
            <option value="salaries">Salaries</option>
            <option value="creditors">Creditors</option>
            <option value="admissions">Admissions</option>
          </select>
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E] rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder="Address"
            name="address"
            required
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="password"
            placeholder="Password"
            name="password"
            required
          />

          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="mobile"
            placeholder="Mobile Number"
            name="mobile"
            required
          />
          <button
            className="text-white bg-[#00913E] w-[100%] rounded-lg mb-[30px] p-[20px]"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default addemployee;
