"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { isAuthenticated } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* OVERLAY FOR MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}