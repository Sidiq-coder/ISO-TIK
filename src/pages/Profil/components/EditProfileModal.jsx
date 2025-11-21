import { useState } from "react";
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

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
