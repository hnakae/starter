import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="text-white min-h-[45px] items-center w-full flex justify-center bg-[#191A1A] border-b border-slate-500">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Chat</Link>
        </li>
        <li>
          <Link href="/auto-formatter">Auto Formatter</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
