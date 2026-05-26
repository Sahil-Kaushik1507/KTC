import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH LAYOUT */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* MAIN ERP LAYOUT */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<h1>Dashboard</h1>} />

      <Route path="/docket/create" element={<h1>Create Docket</h1>} />
    <Route path="/docket/view" element={<h1>View Docket</h1>} />

    <Route path="/bill/create" element={<h1>Create Bill</h1>} />

      </Route>
    </Routes>
  );
}