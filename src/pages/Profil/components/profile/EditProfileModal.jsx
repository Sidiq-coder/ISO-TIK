import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X } from "lucide-react";

/**
 * Reusable Edit Profile Modal Component
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Close modal callback
 * @param {Object} user - User data to edit
 * @param {Function} onSave - Save changes callback
 */
export function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    nama: user?.nama || "",
    nip: user?.nip || "",
    jabatan: user?.jabatan || "",
    departemen: user?.departemen || "",
    telepon: user?.telepon || "",
    email: user?.email || "",
    username: user?.username || "",
  });
  
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, avatar: avatarFile, avatarPreview });
  };

  // Reset form when modal opens with new user data
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        nama: user.nama || "",
        nip: user.nip || "",
        jabatan: user.jabatan || "",
        departemen: user.departemen || "",
        telepon: user.telepon || "",
        email: user.email || "",
        username: user.username || "",
      });
      setAvatarPreview(user.avatar || null);
      setAvatarFile(null);
    }
  }, [isOpen, user]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy mb-2">
            Edit Data Diri
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-200">
              <div className="relative">
                <Avatar className="h-24 w-24 bg-navy text-white">
                  <AvatarImage src={avatarPreview} alt={formData.nama} />
                  <AvatarFallback className="text-2xl bg-navy text-white">
                    {getInitials(formData.nama)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <div className="text-center">
                <p className="text-sm text-gray-700 font-medium">Foto Profil</p>
                <p className="text-xs text-gray-500 mt-1">
                  Klik ikon kamera untuk mengubah foto. Max 5MB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-sm text-gray-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nip" className="text-sm text-gray-700">
                  Nomor Induk Pegawai <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nip"
                  value={formData.nip}
                  onChange={(e) => handleChange("nip", e.target.value)}
                  placeholder="Masukkan NIP"
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jabatan" className="text-sm text-gray-700">
                  Jabatan <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jabatan"
                  value={formData.jabatan}
                  onChange={(e) => handleChange("jabatan", e.target.value)}
                  placeholder="Masukkan jabatan"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departemen" className="text-sm text-gray-700">
                  Departemen <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="departemen"
                  value={formData.departemen}
                  onChange={(e) => handleChange("departemen", e.target.value)}
                  placeholder="Masukkan departemen"
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telepon" className="text-sm text-gray-700">
                Nomor Telepon <span className="text-red-500">*</span>
              </Label>
              <Input
                id="telepon"
                type="tel"
                value={formData.telepon}
                onChange={(e) => handleChange("telepon", e.target.value)}
                placeholder="Masukkan nomor telepon"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Masukkan email"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-gray-700">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="Masukkan username"
                required
                className="h-11"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 px-6 border-gray-300"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="h-11 px-6 bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
