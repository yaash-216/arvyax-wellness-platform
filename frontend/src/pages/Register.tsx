import React, { useState, useContext } from "react";
import { registerUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser(form.email, form.password);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="card p-6 bg-base-200 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold">Register</h2>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-error">{error}</p>}
        <button className="btn btn-primary w-full" type="submit">
          Register
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="link link-primary" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
