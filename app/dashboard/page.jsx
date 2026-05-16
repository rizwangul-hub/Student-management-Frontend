"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await api.get("students/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Stats error:", error.response?.data || error.message);
      toast.error("Failed to load stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-140px)]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-1">
            Total Students
          </h2>
          <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
        </div>

        {/* PAID */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-1">
            Paid Students
          </h2>
          <p className="text-4xl font-bold text-green-500">{stats.paid}</p>
        </div>

        {/* PENDING */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-1">
            Pending Students
          </h2>
          <p className="text-4xl font-bold text-red-500">{stats.pending}</p>
        </div>
      </div>

      {/* WELCOME MESSAGE / BOTTOM SECTION */}
      <div className="flex-1 mt-8 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 p-10 rounded-2xl shadow-lg flex flex-col justify-center items-center text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4 drop-shadow-md">
          Welcome to your Dashboard! ✨
        </h2>
        <p className="text-lg text-blue-50 max-w-3xl leading-relaxed">
          Manage your student enrollments with ease. Use the sidebar to add new
          students, update profiles, and monitor fee statuses in real-time.
          Everything you need is just a click away!
        </p>
      </div>
    </div>
  );
}
