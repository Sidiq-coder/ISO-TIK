// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layouts/admin";
import DashboardPage from "@/pages/Admin/Dashboard";
import DokumenPage from "@/pages/Admin/Dokumen";
// import NotFoundPage from "@/pages/NotFound";

// Router utama aplikasi
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },            // /admin
      { path: "dashboard", element: <DashboardPage /> },      // /admin/dashboard
      { path: "surveys", element: <DokumenPage /> },          // /admin/surveys
      // tambahkan route admin lainnya di sini
    ],
  },
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   },
]);

export default router;