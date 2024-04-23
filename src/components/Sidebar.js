import Link from "next/link";
import React from "react";
const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-[87vh] ">
      {/* Sidebar content */}
      <div className="flex flex-col flex-grow bg-[#135D66] text-white">
        {/* Sidebar items */}
        <div className="flex-grow">
          <Link href="/cost-estimation"><li className="block px-6 py-3 hover:bg-[#77B0AA]">Cost Estimation</li></Link>
          <Link href="/size-items"><li className="block px-6 py-3 hover:bg-[#77B0AA]">Items Sizing</li></Link>
        </div>
        {/* Sidebar footer */}
        <div className="py-4 px-6 bg-[#77B0AA]">
          <p className="text-sm">© 2024 Uniform Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

