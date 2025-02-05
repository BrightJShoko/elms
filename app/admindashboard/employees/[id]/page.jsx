import { updateEmployee } from "@/app/lib/actions";
import { fetchEmployee } from "@/app/lib/data";
import Picker from "@/app/ui/admindash/picker";
import React from "react";
const Editemployee = async ({ params }) => {
  const { id } = await params;
  const employee = await fetchEmployee(id);

  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <div>
        <span className="font-semibold text-[14px] text-[#00913E] mb-4">
          Edit Employee
        </span>
        <form
          className=" text-[#00913E] flex flex-wrap  placeholder:text-[#00913E] justify-between mt-8 "
          action={updateEmployee}
        >
          <input type="hidden" name="id" value={employee.id} />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder={employee.code}
            name="code"
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder={employee.firstname}
            name="firstname"
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="text"
            placeholder={employee.lastname}
            name="lastname"
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
          <Picker placeholderText="02/08/1998" name="dob" />
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
            placeholder={employee.address}
            name="address"
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="email"
            placeholder={employee.email}
            name="email"
          />
          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="password"
            placeholder="password"
            name="password"
          />

          <input
            className="p-[20px] w-[45%] placeholder:text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]"
            type="mobile"
            placeholder={employee.mobile}
            name="mobile"
          />
          <button
            className="text-white bg-[#00913E] w-[100%] rounded-lg mb-[30px] p-[20px]"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editemployee;
