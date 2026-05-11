// pages/Nutrition.jsx
import React, { useState } from 'react';

const Nutrition = () => {
  const [nutritionEntries, setNutritionEntries] = useState([
    {
      id: 1,
      meal_type: 'Breakfast',
      food_item: 'Oatmeal with berries',
      quantity: 250,
      calories: 320,
    },
    {
      id: 2,
      meal_type: 'Lunch',
      food_item: 'Grilled chicken salad',
      quantity: 350,
      calories: 450,
    },
    {
      id: 3,
      meal_type: 'Snack',
      food_item: 'Protein shake',
      quantity: 300,
      calories: 180,
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    meal_type: '',
    food_item: '',
    quantity: '',
    calories: ''
  });

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Post-Workout'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: editingEntry ? editingEntry.id : Date.now(),
      quantity: parseFloat(formData.quantity),
      calories: parseInt(formData.calories)
    };
    if (editingEntry) {
      setNutritionEntries(nutritionEntries.map(entry => entry.id === editingEntry.id ? newEntry : entry));
    } else {
      setNutritionEntries([newEntry, ...nutritionEntries]);
    }
    setShowModal(false);
    setEditingEntry(null);
    setFormData({ meal_type: '', food_item: '', quantity: '', calories: '' });
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData(entry);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setNutritionEntries(nutritionEntries.filter(entry => entry.id !== id));
    }
  };

  const totalCalories = nutritionEntries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Nutrition Tracker</h1>
            <p className="text-gray-400 mt-1">Log your meals and track your daily nutrition</p>
          </div>
          <button
            onClick={() => {
              setEditingEntry(null);
              setFormData({ meal_type: '', food_item: '', quantity: '', calories: '' });
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-bronze-600 to-bronze-700 hover:from-bronze-500 hover:to-bronze-600 text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Meal
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Meals</p>
                <p className="text-2xl font-bold text-white">{nutritionEntries.length}</p>
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
                <p className="text-gray-400 text-sm">Total Calories</p>
                <p className="text-2xl font-bold text-white">{totalCalories}</p>
              </div>
            </div>
          </div>
          <div className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Daily Goal</p>
                <p className="text-2xl font-bold text-white">{Math.round((totalCalories / 2000) * 100)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition List */}
        <div className="grid gap-4">
          {nutritionEntries.map(entry => (
            <div key={entry.id} className="bg-black/60 border border-bronze-800/30 rounded-2xl p-5 hover:border-bronze-700/50 transition">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-bronze-600/20 text-bronze-400 rounded-full text-sm font-medium">{entry.meal_type}</span>
                    <h3 className="text-lg font-semibold text-white">{entry.food_item}</h3>
                  </div>
                  <div className="flex gap-6 mt-3">
                    <div>
                      <p className="text-gray-500 text-xs">Quantity</p>
                      <p className="text-white">{entry.quantity}g</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Calories</p>
                      <p className="text-white">{entry.calories} kcal</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(entry)} className="p-2 text-bronze-400 hover:text-bronze-300 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="p-2 text-red-400 hover:text-red-300 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {nutritionEntries.length === 0 && (
            <div className="text-center py-12 bg-black/40 border border-bronze-800/30 rounded-2xl">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <p className="text-gray-500">No meals logged today. Add your first meal!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-bronze-700/30">
            <h2 className="text-2xl font-bold text-white mb-4">{editingEntry ? 'Edit Meal' : 'Add Meal'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-bronze-300 text-sm font-medium mb-2">Meal Type</label>
                <select
                  name="meal_type"
                  value={formData.meal_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                >
                  <option value="">Select meal type</option>
                  {mealTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-bronze-300 text-sm font-medium mb-2">Food Item</label>
                <input
                  type="text"
                  name="food_item"
                  value={formData.food_item}
                  onChange={handleChange}
                  required
                  placeholder="Grilled chicken, Oatmeal, etc."
                  className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                />
              </div>
              <div>
                <label className="block text-bronze-300 text-sm font-medium mb-2">Quantity (grams)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="250"
                  className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                />
              </div>
              <div>
                <label className="block text-bronze-300 text-sm font-medium mb-2">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  required
                  placeholder="320"
                  className="w-full px-4 py-2 bg-black/50 border border-bronze-700/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-bronze-600 to-bronze-700 text-white py-2 rounded-xl hover:from-bronze-500 transition">{editingEntry ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;