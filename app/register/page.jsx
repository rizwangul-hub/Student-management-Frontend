"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      toast.success("Account created successfully! Please login.");

      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Start managing students efficiently
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
