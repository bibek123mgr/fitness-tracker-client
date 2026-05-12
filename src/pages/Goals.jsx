import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
  CREATE_GOAL,
  DELETE_GOAL,
  GET_GOALS,
  UPDATE_GOAL,
} from "../queries/goalQueries";

const Goals = () => {
  const [showModal, setShowModal] = useState(false);

  const [editingGoal, setEditingGoal] = useState(null);

  const [goals, setGoals] = useState([]);

  const [formData, setFormData] = useState({
    goal_type: "",
    target_weight: "",
    progress: "",
    deadline: "",
    status: "active",
  });

  const goalTypes = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Flexibility",
    "Marathon Prep",
    "Strength Training",
  ];

  const { data: goalsData, loading, error, refetch } = useQuery(
    GET_GOALS,
    {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    }
  );

  const [createGoal] = useMutation(CREATE_GOAL);

  const [updateGoal] = useMutation(UPDATE_GOAL);

  const [deleteGoal] = useMutation(DELETE_GOAL);

  useEffect(() => {
    if (goalsData) {
      setGoals(goalsData.goals);
    }
  }, [goalsData]);

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
      if (editingGoal) {
        await updateGoal({
          variables: {
            id: editingGoal.id,
            goal_type: formData.goal_type,
            target_weight: parseFloat(formData.target_weight),
            progress: parseFloat(formData.progress || 0),
            deadline: formData.deadline,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Goal updated successfully");
      } else {
        await createGoal({
          variables: {
            goal_type: formData.goal_type,
            target_weight: parseFloat(formData.target_weight),
            progress: parseFloat(formData.progress || 0),
            deadline: formData.deadline,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Goal created successfully");
      }

      refetch();

      setShowModal(false);

      setEditingGoal(null);

      setFormData({
        goal_type: "",
        target_weight: "",
        progress: "",
        deadline: "",
        status: "active",
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);

    setFormData({
      goal_type: goal.goal_type,
      target_weight: goal.target_weight,
      progress: goal.progress,
      deadline: goal.deadline?.split("T")[0],
      status: goal.status,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await deleteGoal({
          variables: {
            id: id,
          },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        });

        alert("Goal deleted successfully");

        refetch();
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  };

  const getStatusBadge = () => {
    return `px-2 py-1 rounded-full text-xs font-medium border bg-blue-500/20 text-blue-400 border-blue-500/30`;
  };

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
              Fitness Goals
            </h1>

            <p className="text-gray-400 mt-1">
              Set, track, and achieve your fitness milestones
            </p>
          </div>

          <button
            onClick={() => {
              setEditingGoal(null);

              setFormData({
                goal_type: "",
                target_weight: "",
                progress: "",
                deadline: "",
                status: "active",
              });

              setShowModal(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl"
          >
            Add Goal
          </button>
        </div>

        <div className="mb-8">
          <div className="bg-black/60 border border-gray-700 rounded-2xl p-5">
            <p className="text-gray-400">Total Goals</p>

            <h2 className="text-3xl text-white font-bold">
              {goals.length}
            </h2>
          </div>
        </div>

        <div className="grid gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-black/60 border border-gray-700 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex gap-3 items-center flex-wrap">
                    <span className={getStatusBadge()}>
                      {goal.status}
                    </span>

                    <h3 className="text-lg font-semibold text-white">
                      {goal.goal_type}
                    </h3>
                  </div>

                  <div className="flex gap-6 mt-4 flex-wrap">
                    <div>
                      <p className="text-gray-500 text-xs">
                        Target Weight
                      </p>

                      <p className="text-white">
                        {goal.target_weight} kg
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs">
                        Progress
                      </p>

                      <p className="text-white">
                        {goal.progress} %
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs">
                        Deadline
                      </p>

                      <p className="text-white">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{
                          width: `${goal.progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="text-yellow-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {goals.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No goals found
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <h2 className="text-2xl text-white font-bold mb-5">
              {editingGoal ? "Edit Goal" : "Add Goal"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Goal Type
                </label>

                <select
                  name="goal_type"
                  value={formData.goal_type}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="">Select Goal Type</option>

                  {goalTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Target Weight
                </label>

                <input
                  type="number"
                  name="target_weight"
                  value={formData.target_weight}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Progress
                </label>

                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
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
                  {editingGoal ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;