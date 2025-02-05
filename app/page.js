import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white shadow  w-[100%] h-screen  overflow-hidden relative">
      <div className=" mt-6 flex items-center justify-center content-center flex-col">
        <h2 className=" font-thin text-5xl mb-2 mt-2 text-[#00913E]">
          WELCOME TO
        </h2>
        <h1 className=" font-extrabold text-5xl text-[#00913E] mt-6 mb-4 text-center">
          EMPLOYEE LEAVE MANAGEMENT SYSTEM
        </h1>
      </div>
      <div className=" items-center mt-6 ">
        <Image
          alt="Landing page image"
          objectFit="contain"
          width={1600}
          height={5}
          className=" "
          src="/landing.png"
        />
      </div>
      <div className=" gap-10 flex items-center justify-center mt-8">
        <Link
          href="/employeelogin"
          className=" items-center text-center content-center outline outline-[3px] outline-green-700  hover:bg-[#00913E]  px-12 py-3 rounded-3xl   text-[#00913E]  hover:text-white w-[223px] "
        >
          Employee
        </Link>
        <Link
          href="/adminlogin"
          className=" items-center text-center content-center px-12 py-3 rounded-3xl text-white hover:text-[#00913E] bg-[#00913E] hover:bg-white  outline outline-[3px] outline-green-700   w-[223px]"
        >
          Admin
        </Link>
      </div>
      <h3 className=" flex items-center content-center justify-center  text-[#00913E] mt-6 text-[25px] font-extrabold">
        Please Choose
      </h3>
    </div>
  );
}
