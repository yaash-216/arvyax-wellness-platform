import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const Login = () => {
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
      const res = await loginUser(form.email, form.password);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="card p-6 bg-base-200 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>
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
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="link link-primary" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
