// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layouts/admin";
import DashboardPage from "@/pages/Admin/Dashboard";
import DokumenPage from "@/pages/Admin/Dokumen";
import NotFoundPage from "@/pages/NotFound";
import DokumenSoA from "@/pages/Admin/SoA/DokumenSoA";
import SoA from "@/pages/Admin/SoA";
import KategoriSoA from "@/pages/Admin/SoA/KategoriSoA";
import PertanyaanSoA from "@/pages/Admin/SoA/PertanyaanSoA";
import NCR from "@/pages/Admin/NCR";
import DetailNCR from "@/pages/Admin/NCR/DetailNCR";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      {
        path: "soa",
        element: <SoA/>, // berisi tab + <Outlet />
        children: [
            { index: true, element: <DokumenSoA /> },
            { path: "dokumen", element: <DokumenSoA /> },
            { path: "kategori", element: <KategoriSoA /> },
            { path: "pertanyaan", element: <PertanyaanSoA /> },
        ],
      },
      { path: "dokumen", element: <DokumenPage /> },
      { path: "ncr", element: <NCR /> },
      { path: "ncr/:id/kasus", element: <DetailNCR /> },

    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;