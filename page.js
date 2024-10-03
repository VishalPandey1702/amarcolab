"use client";

import { useState } from 'react';
import AddMcq from "../../component/addmcq"; 
import AddCodingQuestion from "../../component/addCodingQuestion";

export default function Admin() {
    const [activeComponent, setActiveComponent] = useState(null); // State to track the active component

    const handleAddMcq = () => {
        setActiveComponent('mcq'); // Set active component to AddMcq
    };

    const handleAddCodingQuestion = () => {
        setActiveComponent('coding'); // Set active component to AddCodingQuestion
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Hello Admin</h1>
            <button
                onClick={handleAddMcq}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            >
                ADD MCQ
            </button>
            <button
                onClick={handleAddCodingQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ADD Coding Question
            </button>

            {/* Conditionally render the components based on the active state */}
            {activeComponent === 'mcq' && <AddMcq />}
            {activeComponent === 'coding' && <AddCodingQuestion />}
        </div>
    );
}
