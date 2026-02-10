import React, { useState, useEffect } from 'react';
import studentService from '../services/studentService';

const StudentForm = ({ currentStudent, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        status: 'Pending',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentStudent) {
            setFormData({
                name: currentStudent.name,
                email: currentStudent.email,
                phone: currentStudent.phone,
                course: currentStudent.course,
                status: currentStudent.status,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                course: '',
                status: 'Pending',
            });
        }
    }, [currentStudent]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        if (!formData.name.trim()) {
            setError("Name is required.");
            return false;
        }
        if (formData.name.length < 3) {
            setError("Name must be at least 3 characters.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            setError("Phone number must be exactly 10 digits.");
            return false;
        }

        if (!formData.course) {
            setError("Please select a course.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validate()) return;

        try {
            if (currentStudent) {
                await studentService.updateStudent(currentStudent._id, formData);
            } else {
                await studentService.createStudent(formData);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{currentStudent ? 'Edit Student' : 'Add New Student'}</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                        name="course"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.course}
                        onChange={handleChange}
                    >
                        <option value="">Select Course</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {currentStudent ? 'Update Student' : 'Add Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
