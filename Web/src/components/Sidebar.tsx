'use client'

import Link from "next/link";
import { useState } from "react";
import { CiHome, CiChat1, CiPhone } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const sidebarContent = [{
    name: "Home", to: "/home", icon: <CiHome />
}, {
    name: "Chat", to: "/chat", icon: <CiChat1 />
}, {
    name: "Call", to: "/call", icon: <CiPhone />
}]

export default function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState<boolean>(true); 

  return (
    <div className={`h-full flex ${!isCollapsed ? 'w-[5%]' : 'w-[15%]'} transition-all duration-300`}>
        <div className={`hidden md:hidden ${isCollapsed ? 'lg:block' : ""} w-5/6 flex flex-col border-r-1 border-gray-200`}>
            <div className="h-1/7 flex justify-start items-center">
                <h1 className="font-bold text-2xl ml-4 whitespace-nowrap">AI Therapist</h1>
            </div>
            <div className="h-5/7 flex flex-col">
                {sidebarContent.map((item) => {
                    return (
                        <div key={item.name} className="w-[92%] mx-2 h-[2.5rem] text-lg font-regular flex items-center gap-2 rounded-lg hover:bg-gray-300">
                            <Link href={item.to} className="flex items-center gap-x-2 ml-2">
                                {item.icon} {item.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="h-1/7"></div>
        </div>
        <div className="w-1/6 h-full transition-all duration-300">
            <button onClick={() => setIsCollapsed(prev => !prev)} className="cursor-pointer flex flex-col items-center justify-center text-xl m-4"><FaBars /></button>
        </div>
    </div>
  )
}
