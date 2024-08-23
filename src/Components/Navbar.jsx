
import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setSearchQuery }) => {
  const location = useLocation();
  const generateBreadcrumbItems=()=>{
    const paths = location.pathname.split('/').filter(Boolean);
    
    return paths.map((path,index)=>{
      const url = `/${paths.slice(0,index+1).join('/')}`;
      return (
        <Breadcrumb.Item key={index} href={url} >
          <span className="font-bold text-blue-900">{path.charAt(0).toUpperCase() + path.slice(1)}</span>
        </Breadcrumb.Item>
      );
    })
  }
 
  
  return (
    <nav className="sticky h-14 z-[100] inset-x-0 top-0 border-b border-grey-200 bg-white/75  backdrop-blur-lg transition-all">
      <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="flex h-14 items-center justify-between border-b border-slate-200">
          <Link to="/" className="flex z-40 font-semibold">
            <span>
              {/* <span className="text-green-600">Ho</span>me */}
              <Breadcrumb
                aria-label="Solid background breadcrumb example"
                className="bg-gray-50  py-3 dark:bg-gray-800"
              >
                <Breadcrumb.Item href="#" icon={HiHome}>
                  Home
                </Breadcrumb.Item>
                {generateBreadcrumbItems()}
                
              </Breadcrumb>
            </span>
          </Link>

          <div className="h-full flex items-center space-x-5 w-[20rem] md:w-[30rem] justify-between">
            <TextInput
              id="search"
              size="lg"
              className="w-full"
              style={{ borderRadius: "10px" }}
              type="email"
              icon={Search}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              required
            />
            <Link to="/dashboard">Dashboard✨ </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
