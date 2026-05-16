"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditStudent() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    address: "",
    feeStatus: "",
  });

  // GET SINGLE STUDENT
  const fetchStudent = async () => {
    try {
      const res = await api.get(`students/${id}`);
      setForm(res.data);
    } catch (error) {
      toast.error("Failed to load student");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      await api.put(`students/${id}`, form);

      toast.success("Student updated successfully");

      router.push("/dashboard/students");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="p-6">Loading student data...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        Edit Student
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* AGE */}
        <input
          type="number"
          name="age"
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
          className="bg-yellow-500 text-white w-full py-3 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Student"}
        </button>
      </form>
    </div>
  );
}