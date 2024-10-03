
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function AddCodingQuestion() {
    const [question, setQuestion] = useState({
        title: '',
        difficulty: 'EASY',
        companies: [],
        hint: '',
        description: '',
        constraints: '',
        source: '',
        affiliation: '',
        examTag: '',
        yearTag: '',
        subjectTag: '',
        topicTag: '',
        videoSolution: '',
        docSolution: '',
        languages: [],
    });

    const [examples, setExamples] = useState([{ input: '', output: '' }]);
    const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '', timeLimit: 0, memoryLimit: 0, weight: 0, isPublic: false }]);
    const [message, setMessage] = useState("");

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        if (name === 'companies' || name === 'languages') {
            const arrayValues = value.split(',').map(item => item.trim());
            setQuestion(prev => ({ ...prev, [name]: arrayValues }));
        } else {
            setQuestion(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleExampleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExamples = [...examples];
        updatedExamples[index][name] = value;
        setExamples(updatedExamples);
    };

    const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTestCases = [...testCases];
        updatedTestCases[index][name] = name === "isPublic" ? e.target.checked : value;
        setTestCases(updatedTestCases);
    };

    const addExample = () => {
        setExamples([...examples, { input: '', output: '' }]);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { input: '', expectedOutput: '', timeLimit: 0, memoryLimit: 0, weight: 0, isPublic: false }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...question,
            examples,
            testCases,
        };
        try {
            const response = await axios.post('/api/coding-questions', payload);
            setMessage(response.data.message || "Coding question added successfully!");
        } catch (error) {
            console.error("Error adding coding question:", error);
            setMessage("Failed to add coding question.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl w-full bg-white p-10 shadow-xl rounded-lg border border-gray-300">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Coding Question</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">Title:</label>
                        <input
                            name="title"
                            value={question.title}
                            onChange={handleQuestionChange}
                            required
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter question title"
                        />
                    </div>

                    {/* Difficulty Select */}
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">Difficulty:</label>
                        <select
                            name="difficulty"
                            value={question.difficulty}
                            onChange={handleQuestionChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                        </select>
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={question.description}
                            onChange={handleQuestionChange}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter question description"
                            required
                        />
                    </div>

                    {/* Companies Input */}
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">Companies:</label>
                        <input
                            name="companies"
                            value={question.companies.join(', ')}
                            onChange={handleQuestionChange}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter associated companies (comma-separated)"
                        />
                    </div>

                    {/* Examples Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Examples</h2>
                        {examples.map((example, index) => (
                            <div key={index} className="space-y-2 mb-4">
                                <label className="block text-md font-medium text-gray-700">Example {index + 1}:</label>
                                <input
                                    name="input"
                                    value={example.input}
                                    onChange={(e) => handleExampleChange(index, e)}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Enter example input"
                                />
                                <input
                                    name="output"
                                    value={example.output}
                                    onChange={(e) => handleExampleChange(index, e)}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter example output"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addExample}
                            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Add Another Example
                        </button>
                    </div>

                    {/* Test Cases Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
                        {testCases.map((testCase, index) => (
                            <div key={index} className="space-y-2 mb-4">
                                <label className="block text-md font-medium text-gray-700">Test Case {index + 1}:</label>
                                <input
                                    name="input"
                                    value={testCase.input}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Enter test case input"
                                />
                                <input
                                    name="expectedOutput"
                                    value={testCase.expectedOutput}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Enter expected output"
                                />
                                <input
                                    name="timeLimit"
                                    value={testCase.timeLimit}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Time limit (in ms)"
                                />
                                <input
                                    name="memoryLimit"
                                    value={testCase.memoryLimit}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Memory limit (in MB)"
                                />
                                <input
                                    name="weight"
                                    value={testCase.weight}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Weight for test case"
                                />
                                <div className="flex items-center">
                                    <input
                                        name="isPublic"
                                        type="checkbox"
                                        checked={testCase.isPublic}
                                        onChange={(e) => handleTestCaseChange(index, e)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-md font-medium text-gray-700">Public Test Case</label>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTestCase}
                            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Add Another Test Case
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Coding Question
                    </button>
                </form>

                {message && (
                    <p className={`mt-6 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'} font-semibold`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}