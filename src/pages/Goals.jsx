// pages/Goals.jsx
import React, { useState } from 'react';
import { CREATE_GOAL, GET_GOALS } from '../queries/goalQueries';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const Goals = () => {
    const [createGoal, { data, loading, error }] = useMutation(CREATE_GOAL);
    const [goals, setGoals] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [formData, setFormData] = useState({
        goal_type: '',
        target_weight: '',
        progress: '',
        deadline: '',
        status: 'active'
    });

    const goalTypes = ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'Marathon Prep', 'Strength Training'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingGoal) {
            setGoals(goals.map(goal => goal.id === editingGoal.id ? { ...formData, id: goal.id } : goal));
        } else {
            setGoals([...goals, { ...formData, id: Date.now(), progress: formData.progress || 0 }]);
        }
        setShowModal(false);
        setEditingGoal(null);
        setFormData({ goal_type: '', target_weight: '', progress: '', deadline: '', status: 'active' });
        createGoal({
            variables: {
                goal_type: formData.goal_type,
                target_weight: parseFloat(formData.target_weight),
                progress: parseFloat(formData.progress || 0),
                deadline: formData.deadline,
                user: '6a004830fd9fa2d6dace70eb'
            }
        });
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setFormData(goal);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            setGoals(goals.filter(goal => goal.id !== id));
        }
    };

    const getStatusBadge = (status) => {
        return `px-2 py-1 rounded-full text-xs font-medium border bg-blue-500/20 text-blue-400 border-blue-500/30 `;
    };

    const { data: goalsData } = useQuery(GET_GOALS);

      useEffect(() => {
        if (goalsData) {
            console.log(goalsData);
            setGoals(goalsData.goals);
        }
    }, [goalsData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Fitness Goals</h1>
                        <p className="text-gray-400 mt-1">Set, track, and achieve your fitness milestones</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingGoal(null);
                            setFormData({ goal_type: '', target_weight: '', progress: '', deadline: '', status: 'active' });
                            setShowModal(true);
                        }}
                        className="bg-gradient-to-r from-bronze-600 to-bronze-700 hover:from-bronze-500 hover:to-bronze-600 text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Goal
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-bronze-600/20 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Goals</p>
                                <p className="text-2xl font-bold text-white">{goals.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Active Goals</p>
                                <p className="text-2xl font-bold text-white">{goals.filter(g => g.status === 'active').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Completed</p>
                                <p className="text-2xl font-bold text-white">{goals.filter(g => g.status === 'completed').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Goals List */}
                <div className="grid gap-5">
                    {goals.map(goal => (
                        <div key={goal.id} className="bg-black/60 border border-bronze-800/30 rounded-2xl p-6 hover:border-bronze-700/50 transition">
                            <div className="flex flex-wrap justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-xl font-semibold text-white">{goal.goal_type}</h3>
                                        <span className={getStatusBadge(goal.status)}>{goal.status}</span>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                                        <div>
                                            <p className="text-gray-500 text-xs">Target Weight</p>
                                            <p className="text-white font-medium">{goal.target_weight} kg</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Deadline</p>
                                            <p className="text-white font-medium">{new Date(goal.deadline).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Progress</p>
                                            <p className="text-white font-medium">{goal.progress}%</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="h-2 bg-bronze-900/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-bronze-500 to-bronze-600 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(goal)} className="p-2 text-bronze-400 hover:text-bronze-300 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleDelete(goal.id)} className="p-2 text-red-400 hover:text-red-300 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {goals.length === 0 && (
                        <div className="text-center py-12 bg-black/40 border border-bronze-800/30 rounded-2xl">
                            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <p className="text-gray-500">No goals yet. Create your first goal!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-bronze-700/30">
                        <h2 className="text-2xl font-bold text-white mb-4">{editingGoal ? 'Edit Goal' : 'Create New Goal'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-bronze-300 text-sm font-medium mb-2">Goal Type</label>
                                <select
                                    name="goal_type"
                                    value={formData.goal_type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                                >
                                    <option value="">Select goal type</option>
                                    {goalTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-bronze-300 text-sm font-medium mb-2">Target Weight (kg)</label>
                                <input
                                    type="number"
                                    name="target_weight"
                                    value={formData.target_weight}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                                />
                            </div>
                            <div>
                                <label className="block text-bronze-300 text-sm font-medium mb-2">Progress (%)</label>
                                <input
                                    type="number"
                                    name="progress"
                                    value={formData.progress}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                                />
                            </div>
                            <div>
                                <label className="block text-bronze-300 text-sm font-medium mb-2">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                                />
                            </div>
                            <div>
                                <label className="block text-bronze-300 text-sm font-medium mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="abandoned">Abandoned</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition">Cancel</button>
                                <button type="submit" className="flex-1 bg-gradient-to-r from-bronze-600 to-bronze-700 text-white py-2 rounded-xl hover:from-bronze-500 transition">{editingGoal ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;