import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusDropdown } from "./StatusDropdown"

const statusOptions = [
  { value: "Draft" },
  { value: "In Progress" },
  { value: "Reviewed" },
  { value: "Approved" },
]

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
                Tambah Dokumen SoA
              </Button>
            </ButtonGroup>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] sm:max-h-[993px] mx-auto">
            <DialogHeader>
              <DialogTitle className="text-navy heading-3">
                Tambahkan Dokumen SoA
              </DialogTitle>
              <DialogDescription className="text-gray-dark small">
                Lengkapi form di bawah ini untuk menambah dokumen SoA baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 md:grid-cols-2 w-[536px]!">
              <div className="grid gap-3">
                <Label htmlFor="noDokumen">No Dokumen</Label>
                <Input
                  id="noDokumen"
                  name="doDokumen"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan No Dokumen"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tanggalTerbit">Username</Label>
                <Input
                  id="tanggalTerbit"
                  name="tanggalTerbit"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="10/09/2005"
                />
              </div>
            </div>
            <div className="grid gap-4 w-[536px]!`">
              <div className="grid gap-3">
                <Label htmlFor="judulDokumen">Judul Dokumen</Label>
                <Input
                  id="judulDokumen"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  name="judulDokumen"
                  placeholder="Masukkan Judul Dokumen"
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
                <Label htmlFor="klasifikasi">Klasifikasi</Label>
                <Input
                  id="klasifikasi"
                  name="klasifikasi"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Klasifikasi"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="penyusun">Username</Label>
                <Input
                  id="penyusun"
                  name="penyusun"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Nama Penyusun"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="ketuaIso">Ketua ISO</Label>
                <Input
                  id="ketuaIso"
                  name="ketuaIso"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Nama Ketua Iso"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="direktur">Direktur</Label>
                <Input
                  id="direktur"
                  name="direktur"
                  className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                  placeholder="Masukkan Nama Direktur"
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
              <Button type="submit" className="hover:bg-navy-hover! rounded-[4px]">
                Simpan Dokumen
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}
