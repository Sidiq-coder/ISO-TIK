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
import CaseListPage from "@/pages/Admin/NCR/CaseListPage";
import FindingsListPage from "@/pages/Admin/NCR/FindingsListPage";
import Audit from "@/pages/Admin/Audit";
import DokumenAudit from "@/pages/Admin/Audit/DokumenAudit";
import AspekAudit from "@/pages/Admin/Audit/AspekAudit";
import ChecklistAudit from "@/pages/Admin/Audit/ChekclistAudit";
import ChecklistExcel from "@/pages/Admin/Audit/ChecklistExcel";
import KategoriPertanyaan from "@/pages/Admin/Audit/KategoriPertanyaan";

import ReviewJawabanSoA from "@/pages/Admin/SoA/ReviewJawabanSoA";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      {
        path: "soa",
        element: <SoA />, // berisi tab + <Outlet />
        children: [
          { index: true, element: <DokumenSoA /> },
          { path: "dokumen", element: <DokumenSoA /> },
          { path: "kategori", element: <KategoriSoA /> },
          { path: "pertanyaan", element: <PertanyaanSoA /> },
            { path: "review", element: <ReviewJawabanSoA /> },
        ],
      },
      {
        path: "audit",
        element: <Audit />,
        children: [
          { index: true, element: <DokumenAudit /> },
          { path: "dokumen", element: <DokumenAudit /> },
          { path: "checklist", element: <ChecklistAudit /> },
          { path: "aspek", element: <AspekAudit /> },
          { path: "checklist-excel", element: <ChecklistExcel /> },
        ],
      },
      { path: "dokumen", element: <DokumenPage /> },
      { path: "ncr", element: <NCR /> },
      { path: "ncr/:id/kasus", element: <CaseListPage /> },
      { path: "ncr/:id/kasus/:caseId/temuan", element: <FindingsListPage /> },
      { path: "audit/aspek/kategori/:id", element: <KategoriPertanyaan /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

