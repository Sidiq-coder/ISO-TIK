import { useEffect, useState } from "react";
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import {
  ProfileCard,
  ActivityLogTable,
  EditProfileModal,
  EditPasswordModal,
} from "./components";
import { useActivityLog } from "./hooks/useActivityLog";

// Mock data untuk testing
const mockUserData = {
  email: "budi.santoso@company.com",
  username: "budi.santoso",
  lastLogin: "2025-11-17T09:30:00",
  roles: ["Admin", "Reviewer"],
  nama: "Budi Santoso, S.T.",
  nip: "123167578123124454",
  jabatan: "Ketua",
  departemen: "Keamanan Sistem Informasi",
  telepon: "083195415923",
  status: "Aktif",
  createdAt: "2025-01-15T10:00:00",
  updatedAt: "2025-11-17T09:30:00",
  createdBy: "System",
  avatar: null,
};

const mockActivityLogData = [
  {
    id: 1,
    waktu: "2025-02-05T09:30:00",
    aksi: "UPDATE",
    tabel: "soa",
  },
  {
    id: 2,
    waktu: "2025-02-05T09:20:00",
    aksi: "CREATE",
    tabel: "soa",
  },
  {
    id: 3,
    waktu: "2025-02-04T14:18:00",
    aksi: "LOGIN",
    tabel: "users",
  },
  {
    id: 4,
    waktu: "2025-02-04T10:01:00",
    aksi: "DELETE",
    tabel: "users",
  },
  {
    id: 5,
    waktu: "2025-02-04T09:59:00",
    aksi: "ASSIGN_ROLE",
    tabel: "users",
  },
  {
    id: 6,
    waktu: "2025-02-03T16:45:00",
    aksi: "UPDATE",
    tabel: "audit",
  },
  {
    id: 7,
    waktu: "2025-02-03T14:30:00",
    aksi: "CREATE",
    tabel: "ncr",
  },
  {
    id: 8,
    waktu: "2025-02-03T11:20:00",
    aksi: "DELETE",
    tabel: "dokumen",
  },
  {
    id: 9,
    waktu: "2025-02-03T09:15:00",
    aksi: "LOGIN",
    tabel: "users",
  },
  {
    id: 10,
    waktu: "2025-02-02T16:00:00",
    aksi: "UPDATE",
    tabel: "soa",
  },
  {
    id: 11,
    waktu: "2025-02-02T13:30:00",
    aksi: "CREATE",
    tabel: "audit",
  },
  {
    id: 12,
    waktu: "2025-02-02T10:45:00",
    aksi: "ASSIGN_ROLE",
    tabel: "users",
  },
];

export default function Profil() {
  const { setHeader } = useAdminLayout();
  const [userData, setUserData] = useState(mockUserData);
  const [activityLogs, setActivityLogs] = useState(mockActivityLogData);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

  const {
    perPage,
    currentPage,
    pagedData,
    totalData,
    totalPages,
    handlePageChange,
    handlePaginateChange,
  } = useActivityLog(activityLogs);

  useEffect(() => {
    setHeader({
      title: "Profile Saya",
      subtitle: "Kelola informasi pribadi dan preferensi akun Anda",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profil",
      },
    });
  }, [setHeader]);

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleEditPassword = () => {
    setIsEditPasswordModalOpen(true);
  };

  const handleSaveProfile = (updatedData) => {
    // TODO: Implement API call to update profile
    console.log("Saving profile:", updatedData);
    setUserData((prev) => ({ ...prev, ...updatedData }));
    setIsEditProfileModalOpen(false);
    // Show success notification
    alert("Profil berhasil diperbarui!");
  };

  const handleSavePassword = (passwordData) => {
    // TODO: Implement API call to change password
    console.log("Changing password:", passwordData);
    setIsEditPasswordModalOpen(false);
    // Show success notification
    alert("Kata sandi berhasil diubah!");
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <ProfileCard
        user={userData}
        onEditProfile={handleEditProfile}
        onEditPassword={handleEditPassword}
      />

      {/* Activity Log Table */}
      <ActivityLogTable
        data={pagedData}
        perPage={perPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={totalData}
        onPageChange={handlePageChange}
        onPaginateChange={handlePaginateChange}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        user={userData}
        onSave={handleSaveProfile}
      />

      {/* Edit Password Modal */}
      <EditPasswordModal
        isOpen={isEditPasswordModalOpen}
        onClose={() => setIsEditPasswordModalOpen(false)}
        onSave={handleSavePassword}
      />
    </div>
  );
}
