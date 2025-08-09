import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <MySessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id?"
          element={
            <ProtectedRoute>
              <SessionEditor />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
