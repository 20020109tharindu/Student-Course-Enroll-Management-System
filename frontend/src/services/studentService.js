import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const getStudents = async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
};

const createStudent = async (studentData) => {
    const response = await axios.post(API_URL, studentData);
    return response.data;
};

const updateStudent = async (id, studentData) => {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
};

const deleteStudent = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

const studentService = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};

export default studentService;
