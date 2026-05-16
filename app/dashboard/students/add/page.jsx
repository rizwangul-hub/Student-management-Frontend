"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddStudent() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    address: "",
    feeStatus: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.phone || !form.course) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/students", form);

      toast.success("Student added successfully");

      router.push("/dashboard/students");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        Add New Student
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* AGE */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* GENDER */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* COURSE */}
        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Course</option>
          <option value="MERN Stack">MERN Stack</option>
          <option value="Python">Python</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>

        {/* ADDRESS */}
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* FEE STATUS */}
        <select
          name="feeStatus"
          value={form.feeStatus}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}