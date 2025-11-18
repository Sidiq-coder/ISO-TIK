import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusDropdown } from "@/components/admin/table";

const statusOptions = [
  { value: "Draft" },
  { value: "In Progress" },
  { value: "Reviewed" },
  { value: "Approved" },
];

export function OverlayForm({
  statusValue,
  onStatusChange,
  isStatusDropdownOpen,
  setIsStatusDropdownOpen,
  className = "",
}) {
  return (
    <div className={className}>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <ButtonGroup>
              <Button
                type="button"
                className="bg-navy! cursor-pointer text-gray-light hover:bg-navy-hover! rounded-lg! w-[233px]! h-[52px]! gap-4!"
                variant="secondary"
              >
                <Plus className="text-gray-light w-5! h-5!" />
                Tambah Dokumen Audit
              </Button>
            </ButtonGroup>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] sm:max-h-[993px] mx-auto">
            <DialogHeader>
              <DialogTitle className="text-navy heading-3">
                Tambahkan Dokumen Audit
              </DialogTitle>
              <DialogDescription className="text-gray-dark small">
                Lengkapi form di bawah ini untuk menambah dokumen audit baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 w-[536px]!">
              <div className="grid gap-3">
                <Label htmlFor="judul">Judul</Label>
                <Input
                  id="judul"
                  name="judul"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Judul"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  name="lokasi"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Lokasi"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tanggalAudit">Tanggal Audit</Label>
                <Input
                  id="tanggalAudit"
                  name="tanggalAudit"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="15/12/2025"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="leadAuditor">Lead Auditor</Label>
                <Input
                  id="leadAuditor"
                  name="leadAuditor"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Nama Lead Auditor"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="auditor">Auditor</Label>
                <Input
                  id="auditor"
                  name="auditor"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Nama Auditor"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="revisi">Revisi</Label>
                <Input
                  id="revisi"
                  name="revisi"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Revisi"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <StatusDropdown
                  isMenuOpen={isStatusDropdownOpen}
                  setIsMenuOpen={setIsStatusDropdownOpen}
                  value={statusValue}
                  onChange={onStatusChange}
                  options={statusOptions}
                  classNameButton="w-[536px]! h-12!"
                  classNameDropdown="w-[536px]!"
                  showFunnelIcon={false}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="rounded-[4px]" variant="outline">
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="hover:bg-navy-hover! rounded-[4px]"
              >
                Simpan Dokumen
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
