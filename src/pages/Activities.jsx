import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITYS,
  UPDATE_ACTIVITY,
} from "../queries/activitiyQueries";

import { GET_GOALS } from "../queries/goalQueries";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const [goals, setGoals] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingActivity, setEditingActivity] = useState(null);

  const [formData, setFormData] = useState({
    goal: "",
    type: "",
    duration: "",
    distance: "",
    calories_burned: "",
  });

  const activityTypes = [
    "Running",
    "Walking",
    "Cycling",
    "Swimming",
    "Yoga",
    "Weight Training",
    "HIIT",
    "Dancing",
  ];

  const { data: goalsData } = useQuery(GET_GOALS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const {
    data: activityData,
    loading,
    error,
    refetch,
  } = useQuery(GET_ACTIVITYS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

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

  const [createActivity] = useMutation(CREATE_ACTIVITY);

  const [updateActivity] = useMutation(UPDATE_ACTIVITY);

  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

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
      if (editingActivity) {
        await updateActivity({
          variables: {
            id: editingActivity.id,
            goal: formData.goal,
            type: formData.type,
            duration: parseFloat(formData.duration),
            distance: parseFloat(formData.distance),
            calories_burned: parseFloat(formData.calories_burned),
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Activity updated successfully");
      } else {
        await createActivity({
          variables: {
            type: formData.type,
            duration: parseFloat(formData.duration),
            distance: parseFloat(formData.distance),
            calories_burned: parseFloat(formData.calories_burned),
            goal: formData.goal,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Activity created successfully");
      }

      refetch();

      setShowModal(false);

      setEditingActivity(null);

      setFormData({
        goal: "",
        type: "",
        duration: "",
        distance: "",
        calories_burned: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);

    setFormData({
      goal: activity.goal,
      type: activity.type,
      duration: activity.duration,
      distance: activity.distance,
      calories_burned: activity.calories_burned,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity({
          variables: {
            id: id,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Activity deleted successfully");

        refetch();
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  };

  const totalCaloriesBurned = activities.reduce(
    (sum, activity) => sum + activity.calories_burned,
    0
  );

  const totalDuration = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );

  const totalDistance = activities.reduce(
    (sum, activity) => sum + activity.distance,
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
              Activity Tracker
            </h1>

            <p className="text-gray-400 mt-1">
              Log your workouts and track your fitness progress
            </p>
          </div>

          <button
            onClick={() => {
              setEditingActivity(null);

              setFormData({
                goal: "",
                type: "",
                duration: "",
                distance: "",
                calories_burned: "",
              });

              setShowModal(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl"
          >
            Add Activity
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-black/60 border border-gray-700 rounded-2xl p-5">
            <p className="text-gray-400">Total Activities</p>

            <h2 className="text-3xl text-white font-bold">
              {activities.length}
            </h2>
          </div>

          <div className="bg-black/60 border border-gray-700 rounded-2xl p-5">
            <p className="text-gray-400">Total Duration</p>

            <h2 className="text-3xl text-white font-bold">
              {totalDuration} min
            </h2>
          </div>

          <div className="bg-black/60 border border-gray-700 rounded-2xl p-5">
            <p className="text-gray-400">Calories Burned</p>

            <h2 className="text-3xl text-white font-bold">
              {totalCaloriesBurned}
            </h2>
          </div>

        </div>

        <div className="grid gap-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-black/60 border border-gray-700 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">

                  <div className="flex gap-3 items-center">
                    <span className="px-3 py-1 bg-yellow-700/20 text-yellow-400 rounded-full text-sm">
                      {activity.type}
                    </span>
                  </div>

                  <div className="flex gap-6 mt-4 flex-wrap">

                    <div>
                      <p className="text-gray-500 text-xs">
                        Duration
                      </p>

                      <p className="text-white">
                        {activity.duration} min
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs">
                        Distance
                      </p>

                      <p className="text-white">
                        {activity.distance} km
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs">
                        Calories
                      </p>

                      <p className="text-white">
                        {activity.calories_burned} kcal
                      </p>
                    </div>

                  </div>
                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => handleEdit(activity)}
                    className="text-yellow-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No activities found
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">

            <h2 className="text-2xl text-white font-bold mb-5">
              {editingActivity ? "Edit Activity" : "Add Activity"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">


              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Goal
                </label>

                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="">Select Goal</option>

                  {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.goal_type}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Activity Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="">Select Activity</option>

                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Duration
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Distance
                </label>

                <input
                  type="number"
                  step="0.1"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Calories Burned
                </label>

                <input
                  type="number"
                  name="calories_burned"
                  value={formData.calories_burned}
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
                  {editingActivity ? "Update" : "Add"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;