import { useState, useEffect } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export function PertanyaanDialog({
  mode = "add",
  pertanyaan,
  onSave,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState({
    pertanyaan: pertanyaan?.pertanyaan || "",
  });

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  useEffect(() => {
    if (pertanyaan) {
      setFormData({
        pertanyaan: pertanyaan.pertanyaan || "",
      });
    }
  }, [pertanyaan]);

  const isAddMode = mode === "add";
  const title = isAddMode ? "Tambah Pertanyaan" : "Edit Pertanyaan";
  const subtitle = isAddMode
    ? "Lengkapi form di bawah ini untuk menambah pertanyaan baru"
    : "Ubah informasi pertanyaan sesuai kebutuhan";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
    if (isAddMode) {
      setFormData({ pertanyaan: "" });
    }
  };

  const DefaultTrigger = isAddMode ? (
    <Button className="bg-navy hover:bg-navy-hover text-white rounded-lg h-[52px] gap-2">
      <Plus className="w-5 h-5" />
      Tambah Pertanyaan
    </Button>
  ) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || DefaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="heading-3 text-navy">{title}</DialogTitle>
          <p className="text-gray-dark small mt-1">{subtitle}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="pertanyaan" className="text-sm text-navy">
              Pertanyaan
            </Label>
            <Textarea
              id="pertanyaan"
              value={formData.pertanyaan}
              onChange={(e) => setFormData({ pertanyaan: e.target.value })}
              placeholder="Masukkan Pertanyaan"
              className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy min-h-[100px]"
              required
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-lg">
                Batal
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded-lg bg-navy hover:bg-navy-hover"
            >
              {isAddMode ? "Simpan Pertanyaan" : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeletePertanyaanDialog({
  pertanyaan,
  onConfirm,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  const handleDelete = (e) => {
    e.preventDefault();
    if (confirmText === pertanyaan?.pertanyaan) {
      onConfirm();
      setOpen(false);
      setConfirmText("");
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      setConfirmText("");
    }
  };

  if (!pertanyaan) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="heading-3 text-red-600">
              Hapus Pertanyaan
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-sm font-semibold text-red-800 mb-2">
              Peringatan!
            </p>
            <p className="text-sm text-red-700">
              Tindakan ini tidak dapat dibatalkan. Pertanyaan akan dihapus
              secara permanen.
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Untuk menghapus pertanyaan, ketik pertanyaan berikut:
            </p>
            <p className="font-semibold text-navy mb-3">
              {pertanyaan.pertanyaan}
            </p>
          </div>

          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirm-text" className="text-sm text-gray-700">
                Ketik nama kategori pertanyaan di sini
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Masukkan pertanyaan"
                className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-lg">
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={confirmText !== pertanyaan.pertanyaan}
                className="rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Hapus Kategori Pertanyaan
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
