"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Picker = ({ name, placeholderText }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      className="  p-[20px]  w-[500px] text-[#00913E]  rounded-lg mb-[30px] border border-[#00913E]  focus:outline-none focus:ring-0 focus:border-[#80aa92]  placeholder:text-[#00913E]"
      placeholderText={placeholderText}
      name={name}
    />
  );
};

export default Picker;
