"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Navbar({ toggleSidebar }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("auth/profile");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full bg-white shadow-sm border-b px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
          Dashboard
        </h2>
      </div>

      <div className="text-gray-700 bg-blue-50 px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-100 shadow-inner">
        {user ? (
          <span>Welcome, <span className="text-blue-700">{user.name}</span></span>
        ) : (
          <span className="animate-pulse">Loading...</span>
        )}
      </div>
    </div>
  );
}