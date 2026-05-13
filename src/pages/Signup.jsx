import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../queries/authQueries";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    gender: "",
    height: "",
    weight: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.age.trim())
      newErrors.age = "Age is required";

    if (!formData.gender)
      newErrors.gender = "Gender is required";

    if (!formData.height)
      newErrors.height = "Height is required";

    if (!formData.weight)
      newErrors.weight = "Weight is required";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          name: formData.name,
          email: formData.email,
          age: Number(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          password: formData.password,
        },
      });


      alert("User Registered Successfully");
      window.location.href = "/";

      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">

      <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-amber-700/30">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Join the Movement
          </h2>

          <p className="text-amber-400/80 mt-2 text-sm">
            Start your fitness journey today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
            />

            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="22"
              className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
            />

            {errors.age && (
              <p className="text-red-400 text-xs mt-1">
                {errors.age}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {errors.gender && (
              <p className="text-red-400 text-xs mt-1">
                {errors.gender}
              </p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Height (cm)
            </label>

            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="170"
              className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
            />

            {errors.height && (
              <p className="text-red-400 text-xs mt-1">
                {errors.height}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Weight (kg)
            </label>

            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="65"
              className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
            />

            {errors.weight && (
              <p className="text-red-400 text-xs mt-1">
                {errors.weight}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="******"
                className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-amber-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-amber-300 text-sm mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="******"
                className="w-full px-4 py-3 bg-black/50 border border-amber-700/40 rounded-xl text-white"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-3 text-amber-400"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 rounded-xl"
          >
            {loading ? "Registering..." : "Start Your Journey"}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error.message}
            </p>
          )}

        </form>
      </div>
    </div>
  );
};

export default Signup;