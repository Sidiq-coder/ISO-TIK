import { useState, useEffect } from "react";
import { Plus, AlertTriangle, ChevronDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { aspekAuditData } from "@/mocks/tableData";

export function ItemAuditDialog({
  mode = "add",
  item,
  onSave,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isAspekDropdownOpen, setIsAspekDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    aspekId: item?.aspekId || null,
    aspekName: item?.aspekName || "Masukkan Aspek",
    itemAudit: item?.itemAudit || "",
  });

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  useEffect(() => {
    if (item) {
      setFormData({
        aspekId: item.aspekId,
        aspekName: item.aspekName,
        itemAudit: item.itemAudit || "",
      });
    }
  }, [item]);

  const isAddMode = mode === "add";
  const title = isAddMode ? "Tambah Item Audit" : "Edit Item Audit";
  const subtitle = isAddMode
    ? "Lengkapi form di bawah ini untuk menambah item audit baru"
    : "Ubah informasi item audit sesuai kebutuhan";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
    if (isAddMode) {
      setFormData({
        aspekId: null,
        aspekName: "Masukkan Aspek",
        itemAudit: "",
      });
    }
  };

  const handleAspekSelect = (aspekId) => {
    const selected = aspekAuditData.find((a) => a.id === parseInt(aspekId));
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        aspekId: selected.id,
        aspekName: selected.name,
      }));
    }
  };

  const DefaultTrigger = isAddMode ? (
    <Button className="bg-navy hover:bg-navy-hover text-white rounded-lg h-[52px] gap-2">
      <Plus className="w-5 h-5" />
      Tambah Item Audit
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
            <Label htmlFor="aspek" className="text-sm text-navy">
              Aspek
            </Label>
            <DropdownMenu
              open={isAspekDropdownOpen}
              onOpenChange={setIsAspekDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 justify-between rounded-lg bg-state text-navy border-gray-300 hover:bg-gray-light"
                >
                  <span
                    className={
                      formData.aspekId ? "text-navy" : "text-gray-dark"
                    }
                  >
                    {formData.aspekName}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isAspekDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[456px]" align="start">
                <DropdownMenuRadioGroup
                  value={String(formData.aspekId)}
                  onValueChange={handleAspekSelect}
                >
                  {aspekAuditData.map((aspek) => (
                    <DropdownMenuRadioItem
                      key={aspek.id}
                      value={String(aspek.id)}
                      className="body text-navy bg-gray-light focus:bg-gray-dark2"
                    >
                      {aspek.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemAudit" className="text-sm text-navy">
              Item Audit
            </Label>
            <Textarea
              id="itemAudit"
              value={formData.itemAudit}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, itemAudit: e.target.value }))
              }
              placeholder="Masukkan Item Audit"
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
              {isAddMode ? "Simpan Item Audit" : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteItemAuditDialog({
  item,
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
    if (confirmText === item?.itemAudit) {
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

  if (!item) return null;

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
              Hapus Item Audit
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-sm font-semibold text-red-800 mb-2">
              Peringatan!
            </p>
            <p className="text-sm text-red-700">
              Tindakan ini tidak dapat dibatalkan. Item Audit akan dihapus
              secara permanen.
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Untuk menghapus item audit, ketik item audit berikut:
            </p>
            <p className="font-semibold text-navy mb-3">{item.itemAudit}</p>
          </div>

          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirm-text" className="text-sm text-gray-700">
                Ketik item audit di sini
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Masukkan item audit"
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
                disabled={confirmText !== item.itemAudit}
                className="rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Hapus Item Audit
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
