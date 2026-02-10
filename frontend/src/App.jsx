import { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); // to trigger list refresh

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentStudent(null);
        setIsEditing(true);
    };

    const onSuccess = () => {
        setIsEditing(false);
        setCurrentStudent(null);
        setRefreshKey((prev) => prev + 1);
    };

    const onCancel = () => {
        setIsEditing(false);
        setCurrentStudent(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Student Enrollment System
                    </h1>
                    {!isEditing && (
                        <button
                            onClick={handleAdd}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add New Student
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <StudentForm
                        currentStudent={currentStudent}
                        onSuccess={onSuccess}
                        onCancel={onCancel}
                    />
                ) : (
                    <StudentList key={refreshKey} onEdit={handleEdit} />
                )}
            </div>
        </div>
    );
}

export default App;
