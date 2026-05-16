"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Welcome back!");

      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-white/70 mb-6">
          Login to Student Management System
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none border border-white/20 focus:border-white"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none border border-white/20 focus:border-white"
          />

          {/* BUTTON */}
          <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md">
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-white/70 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-white font-semibold">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}