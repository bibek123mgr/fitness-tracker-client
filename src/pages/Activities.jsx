// pages/Activities.jsx
import React, { useState } from 'react';
import { CREATE_ACTIVITY, DELETE_ACTIVITY, GET_ACTIVITYS } from '../queries/activitiyQueries';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GOALS } from '../queries/goalQueries';
import { useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);

const { data: goalsData } = useQuery(GET_GOALS, {
  context: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
});
const { data: activityData } = useQuery(GET_ACTIVITYS, {
  context: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
})
const [goals, setGoals] = useState([]);

useEffect(() => {
  if (goalsData) {
    setGoals(goalsData.goals);
  }
}, [goalsData]);

useEffect(() => {
  if (activityData) {
    setActivities(activityData.activities);
  }
}, [activityData]);

const [createActivity, { data, loading, error }] = useMutation(CREATE_ACTIVITY);
const [deleteActivity] = useMutation(DELETE_ACTIVITY);
const [showModal, setShowModal] = useState(false);
const [editingActivity, setEditingActivity] = useState(null);
const [formData, setFormData] = useState({
  goal: '',
  type: '',
  duration: '',
  distance: '',
  calories_burned: ''
});

const activityTypes = ['Running', 'Walking', 'Cycling', 'Swimming', 'Yoga', 'Weight Training', 'HIIT', 'Dancing'];

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newActivity = {
    ...formData,
    id: editingActivity ? editingActivity.id : Date.now(),
    duration: parseInt(formData.duration),
    distance: parseFloat(formData.distance),
    calories_burned: parseInt(formData.calories_burned),
    goal: formData.goal
  };
  if (editingActivity) {
    setActivities(activities.map(activity => activity.id === editingActivity.id ? newActivity : activity));
  } else {
    console.log(formData);
    createActivity({
      variables: {
        type: formData.type,
        duration: parseInt(formData.duration),
        distance: parseFloat(formData.distance),
        calories_burned: parseInt(formData.calories_burned),
        goal: formData.goal,
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    })
    setActivities([newActivity, ...activities]);
  }
  setShowModal(false);
  setEditingActivity(null);
  setFormData({ type: '', duration: '', distance: '', calories_burned: '' });
};

const handleEdit = (activity) => {
  setEditingActivity(activity);
  setFormData(activity);
  setShowModal(true);
};

const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this activity?')) {
    deleteActivity({
      variables: {
        id: id
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    })
    setActivities(activities.filter(activity => activity.id !== id));
  }
};

const totalCaloriesBurned = activities.reduce((sum, activity) => sum + activity.calories_burned, 0);
const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
const totalDistance = activities.reduce((sum, activity) => sum + activity.distance, 0);

return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Activity Tracker</h1>
          <p className="text-gray-400 mt-1">Log your workouts and track your fitness progress</p>
        </div>
        <button
          onClick={() => {
            setEditingActivity(null);
            setFormData({ type: '', duration: '', distance: '', calories_burned: '' });
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-bronze-600 to-bronze-700 hover:from-bronze-500 hover:to-bronze-600 text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Log Activity
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
        <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bronze-600/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Activities</p>
              <p className="text-2xl font-bold text-white">{activities.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Duration</p>
              <p className="text-2xl font-bold text-white">{totalDuration} min</p>
            </div>
          </div>
        </div>
        <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Distance</p>
              <p className="text-2xl font-bold text-white">{totalDistance.toFixed(1)} km</p>
            </div>
          </div>
        </div>
        <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Calories Burned</p>
              <p className="text-2xl font-bold text-white">{totalCaloriesBurned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="grid gap-4">
        {activities.map(activity => (
          <div key={activity.id} className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5 hover:border-bronze-700/50 transition">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-bronze-600/20 text-bronze-400 rounded-full text-sm font-medium">{activity.type}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-gray-500 text-xs">Duration</p>
                    <p className="text-white font-medium">{activity.duration} min</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Distance</p>
                    <p className="text-white font-medium">{activity.distance} km</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Calories Burned</p>
                    <p className="text-white font-medium">{activity.calories_burned} kcal</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(activity)} className="p-2 text-bronze-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(activity.id)} className="p-2 text-red-400 hover:text-red-300 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-12 bg-black/40 border border-bronze-800/30 rounded-2xl">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-gray-500">No activities logged yet. Start your fitness journey!</p>
          </div>
        )}
      </div>
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-bronze-700/30">
          <h2 className="text-2xl font-bold text-white mb-4">{editingActivity ? 'Edit Activity' : 'Log Activity'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Goal Type</label>
              <select
                value={formData.goal}
                onChange={handleChange}
                name="goal"
                id="goal"
                required
                className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
              >
                <option value="">Select Goal</option>
                {goals.map(goal => (
                  <option key={goal.id} value={goal.id}>{goal.goal_type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Activity Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
              >
                <option value="">Select activity type</option>
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="30"
                className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bronze-500"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Distance (km)</label>
              <input
                type="number"
                step="0.1"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                required
                placeholder="5.2"
                className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bronze-500"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Calories Burned</label>
              <input
                type="number"
                name="calories_burned"
                value={formData.calories_burned}
                onChange={handleChange}
                required
                placeholder="320"
                className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bronze-500"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition">Cancel</button>
              <button type="submit" className="flex-1 bg-gradient-to-r from-bronze-600 to-bronze-700 text-white py-2 rounded-xl hover:from-bronze-500 transition">{editingActivity ? 'Update' : 'Log'}</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default Activities;