"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col p-5 border-r border-gray-100 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight">
          Student Panel
        </h1>
        <button 
          className="md:hidden p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-colors hover:bg-blue-50 font-medium">
          Dashboard
        </Link>

        <Link href="/dashboard/students" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-colors hover:bg-blue-50 font-medium">
          Students
        </Link>

        <Link href="/dashboard/students/add" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-colors hover:bg-blue-50 font-medium">
          Add Student
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="text-left text-red-500 mt-auto hover:bg-red-50 px-4 py-3 rounded-lg transition-colors font-semibold flex items-center gap-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        Logout
      </button>
    </div>
  );
}