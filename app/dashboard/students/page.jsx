"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [refetch, setRefetch] = useState(0);

  const [filters, setFilters] = useState({
    keyword: "",
    course: "",
    feeStatus: "",
  });

  const fetchStudents = useCallback(
    async (currentPage = 1) => {
      try {
        setLoading(true);
        const res = await api.get("/students", {
          params: {
            page: currentPage,
            limit: 5,
            keyword: filters.keyword,
            course: filters.course,
            feeStatus: filters.feeStatus,
          },
        });

        setStudents(res.data.students);
        setPage(res.data.page);
        setPages(res.data.pages);
      } catch (error) {
        console.error(
          "Error fetching students:",
          error.response?.data || error.message,
        );
        toast.error(error.response?.data?.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    fetchStudents(1);
  }, [filters, refetch, fetchStudents]);

  // DELETE STUDENT
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await api.delete(`/students/${selectedId}`);

      toast.success("Student deleted");

      setIsModalOpen(false);
      setSelectedId(null);

      // Refetch students
      setRefetch((prev) => prev + 1);
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>

        <Link
          href="/dashboard/students/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name/email/course"
          className="border p-2 rounded w-full"
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />

        {/* COURSE FILTER */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
        >
          <option value="">All Courses</option>
          <option value="MERN Stack">MERN Stack</option>
          <option value="Python">Python</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>

        {/* FEE FILTER */}
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, feeStatus: e.target.value })
          }
        >
          <option value="">All Fees</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Course</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s._id} className="border-b">
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.course}</td>
                    <td className="p-3">
                      <span
                        className={
                          s.feeStatus === "Paid"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {s.feeStatus}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <Link
                        href={`/dashboard/students/edit/${s._id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(s._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-5">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => fetchStudents(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => fetchStudents(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
