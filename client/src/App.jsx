import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import MainLayout from "./layouts/main/MainLayout";
import AuthLayout from "./layouts/Auth/AuthLayout";
import "@mantine/core/styles.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import NoPage from "./pages/NoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_PATH = import.meta.env.VITE_BASE_PATH || "";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/main" replace />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/auth/*"
        element={
          isAuthenticated ? <Navigate to="/main" replace /> : <AuthLayout />
        }
      />

      <Route
        path="/main/*"
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/auth" replace />
        }
      />

      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router basename={BASE_PATH}>
      <MantineProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MantineProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
