import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import {
  ProfileCard,
  ActivityLogTable,
  EditProfileModal,
  EditPasswordModal,
} from "./components";
import { useActivityLog } from "./hooks/useActivityLog";
import { mockUserData, mockActivityLogData } from "./data";

export default function Profil() {
  const { setHeader } = useAdminLayout();
  const { userId } = useParams();
  const location = useLocation();
  
  // Get user data from location state or use mock data
  const initialUserData = location.state?.user ? {
    email: location.state.user.email || "",
    username: location.state.user.username || "",
    lastLogin: new Date().toISOString(),
    roles: location.state.user.roles?.map(r => r.name) || [],
    nama: location.state.user.lastName 
      ? `${location.state.user.fullName} ${location.state.user.lastName}` 
      : location.state.user.fullName,
    nip: location.state.user.nip || "-",
    jabatan: location.state.user.jabatan || "-",
    departemen: location.state.user.departemen || "-",
    telepon: location.state.user.telepon || "-",
    status: location.state.user.status || "Aktif",
    createdAt: location.state.user.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "System",
    avatar: null,
  } : mockUserData;
  
  const [userData, setUserData] = useState(initialUserData);
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
    // TODO: Implement API call to update profile with FormData for file upload
    console.log("Saving profile:", updatedData);
    
    // Prepare FormData if there's an avatar file
    if (updatedData.avatar) {
      const formData = new FormData();
      formData.append('avatar', updatedData.avatar);
      Object.keys(updatedData).forEach(key => {
        if (key !== 'avatar' && key !== 'avatarPreview') {
          formData.append(key, updatedData[key]);
        }
      });
      console.log("FormData prepared with avatar file");
      // TODO: API call with formData
      // await api.post('/api/user/profile', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
    }
    
    // Update local state with new data including avatar preview
    const { avatar, ...dataWithoutFile } = updatedData;
    setUserData((prev) => ({ 
      ...prev, 
      ...dataWithoutFile,
      avatar: updatedData.avatarPreview || prev.avatar
    }));
    
    setIsEditProfileModalOpen(false);
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
