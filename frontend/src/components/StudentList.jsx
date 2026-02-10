import React, { useEffect, useState } from 'react';
import studentService from '../services/studentService';

const StudentList = ({ onEdit }) => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    const fetchStudents = async () => {
        try {
            const params = {};
            if (search) params.name = search;
            if (filter) params.course = filter;
            const data = await studentService.getStudents(params);
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [search, filter]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await studentService.deleteStudent(id);
                fetchStudents(); // Refresh list
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            Active: 'bg-green-100 text-green-800',
            Pending: 'bg-yellow-100 text-yellow-800',
            Completed: 'bg-blue-100 text-blue-800',
            Dropped: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="border p-2 rounded w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-full md:w-1/3"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Courses</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Computer Science">Computer Science</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.course}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(student.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(student)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {students.length === 0 && (
                    <div className="text-center py-4 text-gray-500">No students found.</div>
                )}
            </div>
        </div>
    );
};

export default StudentList;
