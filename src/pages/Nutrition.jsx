import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NUTRITION, DELETE_NUTRITION, GET_NUTRITIONS, UPDATE_NUTRITION } from "../queries/nutritionQueries";
import { GET_GOALS } from "../queries/goalQueries";
import { useEffect } from "react";


const Nutrition = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const [formData, setFormData] = useState({
    goal:"",
    meal_type: "",
    food_item: "",
    quantity: "",
    calories: "",
  });

  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Post-Workout",
  ];
  const { data: goalsData } = useQuery(GET_GOALS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  });

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (goalsData) {
      setGoals(goalsData.goals);
    }
  }, [goalsData]);

  const {
    data: nutritionData,
    loading,
    error,
    refetch,
  } = useQuery(GET_NUTRITIONS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const nutritionEntries = nutritionData?.nutritions || [];

  const [createNutrition] = useMutation(CREATE_NUTRITION);

  const [updateNutrition] = useMutation(UPDATE_NUTRITION);

  const [deleteNutrition] = useMutation(DELETE_NUTRITION);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEntry) {
        await updateNutrition({
          variables: {
            id: editingEntry.id,
            meal_type: formData.meal_type,
            food_item: formData.food_item,
            quantity: parseFloat(formData.quantity),
            calories: parseFloat(formData.calories),
            goal: editingEntry.goal,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Nutrition updated successfully");
      } else {
        await createNutrition({
          variables: {
            meal_type: formData.meal_type,
            food_item: formData.food_item,
            quantity: parseFloat(formData.quantity),
            calories: parseFloat(formData.calories),
            goal: formData.goal,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Nutrition added successfully");
      }

      refetch();

      setShowModal(false);

      setEditingEntry(null);

      setFormData({
        meal_type: "",
        food_item: "",
        quantity: "",
        calories: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);

    setFormData({
      meal_type: entry.meal_type,
      food_item: entry.food_item,
      quantity: entry.quantity,
      calories: entry.calories,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteNutrition({
          variables: {
            id: id,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Nutrition deleted successfully");

        refetch();
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  };

  const totalCalories = nutritionEntries.reduce(
    (sum, entry) => sum + entry.calories,
    0
  );

  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Nutrition Tracker
            </h1>

            <p className="text-gray-400 mt-1">
              Log your meals and track your daily nutrition
            </p>
          </div>

          <button
            onClick={() => {
              setEditingEntry(null);

              setFormData({
                meal_type: "",
                food_item: "",
                quantity: "",
                calories: "",
              });

              setShowModal(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl"
          >
            Add Meal
          </button>
        </div>

        <div className="mb-8">
          <div className="bg-black/60 border border-gray-700 rounded-2xl p-5">
            <p className="text-gray-400">Total Calories</p>

            <h2 className="text-3xl text-white font-bold">
              {totalCalories} kcal
            </h2>
          </div>
        </div>

        <div className="grid gap-4">
          {nutritionEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-black/60 border border-gray-700 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-3 items-center">
                    <span className="px-3 py-1 bg-yellow-700/20 text-yellow-400 rounded-full text-sm">
                      {entry.meal_type}
                    </span>

                    <h3 className="text-lg font-semibold text-white">
                      {entry.food_item}
                    </h3>
                  </div>

                  <div className="flex gap-6 mt-3">
                    <div>
                      <p className="text-gray-500 text-xs">
                        Quantity
                      </p>

                      <p className="text-white">
                        {entry.quantity} g
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs">
                        Calories
                      </p>

                      <p className="text-white">
                        {entry.calories} kcal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-yellow-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {nutritionEntries.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No nutrition data found
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <h2 className="text-2xl text-white font-bold mb-5">
              {editingEntry ? "Edit Meal" : "Add Meal"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Goal Type</label>
                <select
                  value={formData.goal}
                  onChange={handleChange}
                  name="goal"
                  id="goal"
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="">Select Goal</option>
                  {goals.map(goal => (
                    <option key={goal.id} value={goal.id}>{goal.goal_type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Meal Type
                </label>

                <select
                  name="meal_type"
                  value={formData.meal_type}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="">Select Meal Type</option>

                  {mealTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Food Item
                </label>

                <input
                  type="text"
                  name="food_item"
                  value={formData.food_item}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Calories
                </label>

                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-yellow-600 text-white py-2 rounded-xl"
                >
                  {editingEntry ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;