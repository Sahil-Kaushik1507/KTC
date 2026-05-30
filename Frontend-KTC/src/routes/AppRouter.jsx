import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import { AuthRoutes } from "../features/auth/routes/AuthRoutes.jsx";

import { DocketRoutes } from "../features/docket/routes/DocketRoutes.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        {AuthRoutes}
      </Route>

      {/* PROTECTED ERP ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={<h1>Dashboard</h1>}
        />

        {DocketRoutes}

      </Route>
    </Routes>
  );
}