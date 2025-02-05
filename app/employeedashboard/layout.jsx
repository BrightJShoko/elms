import Navbar from "../ui/employeedash/navbar";
import { Sidebar } from "../ui/employeedash/sidebar";

const Layout = ({ children }) => {
  return (
    <div className=" flex">
      <div className=" flex-1 bg-[#00913E] p-[20px] sticky ">
        <div className=" sticky top-0">
          <Sidebar />
        </div>
      </div>
      <div className=" flex-[4] bg-[#e7ecea]">
        <Navbar />
        <div className="m-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
