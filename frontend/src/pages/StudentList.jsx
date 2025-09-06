// src/pages/StudentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Student List</h1>
      <ul className="mt-4">
        {students.map((student) => (
          <li key={student._id} className="flex justify-between p-2 border-b">
            <span>{student.name}</span>
            <button
              onClick={() => handleDelete(student._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
