import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FINDING_CATEGORIES = [
  "Kategori Temuan Audit - Minor",
  "Kategori Temuan Audit - Major",
  "Kategori Temuan Audit - Critical",
];

export function FindingAddModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    kategori: "",
    deskripsi: "",
  });
  const [hasInteracted, setHasInteracted] = useState({
    deskripsi: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    // Reset form
    setFormData({
      kategori: "",
      deskripsi: "",
    });
    setHasInteracted({
      deskripsi: false,
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      kategori: "",
      deskripsi: "",
    });
    setHasInteracted({
      deskripsi: false,
    });
    onClose();
  };

  const handleInputFocus = (field) => {
    if (!hasInteracted[field]) {
      setFormData({ ...formData, [field]: "" });
      setHasInteracted({ ...hasInteracted, [field]: true });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-navy">
            Tambah Temuan Ketidaksesuaian
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-dark">
            Isi detail untuk menambahkan temuan ketidaksesuaian baru.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Kategori Temuan */}
            <div className="space-y-2">
              <Label htmlFor="kategori" className="text-sm font-medium text-gray-dark">
                Kategori Temuan
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 px-4 border-gray-300 hover:border-navy"
                  >
                    <span className={formData.kategori ? "text-gray-900" : "text-gray-400"}>
                      {formData.kategori || "Pilih Kategori Temuan"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-(--radix-dropdown-menu-trigger-width)">
                  {FINDING_CATEGORIES.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setFormData({ ...formData, kategori: category })}
                      className="cursor-pointer"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Temuan Ketidaksesuaian */}
            <div className="space-y-2">
              <Label htmlFor="deskripsi" className="text-sm font-medium text-gray-dark">
                Temuan Ketidaksesuaian
              </Label>
              <Textarea
                id="deskripsi"
                placeholder="Masukkan Temuan Ketidaksesuaian"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                onFocus={() => handleInputFocus("deskripsi")}
                className="min-h-[120px] resize-none border-gray-300 focus:border-navy"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-12 px-6 border-gray-300"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="h-12 px-6 bg-navy text-white hover:bg-navy/90"
            >
              Tambah Temuan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
