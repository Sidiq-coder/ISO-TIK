import { useMemo, useState } from "react"
import { Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusDropdown } from "@/components/admin/table"

const statusOptions = [
  { value: "Draft" },
  { value: "In Progress" },
  { value: "Reviewed" },
  { value: "Approved" },
]

export function OverlayForm({
  variant = "document",
  mode = "add",
  trigger,
  triggerLabel,
  statusValue,
  onStatusChange,
  isStatusDropdownOpen,
  setIsStatusDropdownOpen,
  categoryOptions = [],
  defaultValues = {},
  className = "",
}) {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const initialCategory = useMemo(() => {
    if (defaultValues.category) return defaultValues.category
    return categoryOptions[0]?.label ?? "Semua Kategori"
  }, [defaultValues.category, categoryOptions])
  const [internalCategory, setInternalCategory] = useState(initialCategory)

  const isQuestionVariant = variant === "question"
  const isEditMode = mode === "edit"

  const heading = isQuestionVariant
    ? isEditMode
      ? "Edit Pertanyaan"
      : "Tambah Pertanyaan"
    : "Tambahkan Dokumen SoA"

  const description = isQuestionVariant
    ? isEditMode
      ? "Ubah informasi pertanyaan sesuai kebutuhan"
      : "Lengkapi form di bawah ini untuk menambah pertanyaan baru"
    : "Lengkapi form di bawah ini untuk menambah dokumen SoA baru"

  const submitLabel = isQuestionVariant
    ? isEditMode
      ? "Simpan Perubahan"
      : "Simpan Pertanyaan"
    : "Simpan Dokumen"

  const handleCategoryClick = (option) => {
    setInternalCategory(option.label)
    setIsCategoryMenuOpen(false)
  }

  const defaultTrigger = (
    <Button
      type="button"
      className={
        isQuestionVariant
          ? "h-12 gap-2 bg-navy px-6 text-white hover:bg-navy-hover"
          : "bg-navy text-gray-light hover:bg-navy-hover"
      }
    >
      <Plus className="h-5 w-5" /> {triggerLabel ?? (isQuestionVariant ? "Tambah Pertanyaan" : "Tambah Dokumen SoA")}
    </Button>
  )

  return (
    <div className={className}>
      <Dialog>
        <form>
          <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>
          <DialogContent className={isQuestionVariant ? "sm:max-w-[520px]" : "sm:max-w-[600px] sm:max-h-[993px] mx-auto"}>
            <DialogHeader>
              <DialogTitle className="text-navy heading-3">{heading}</DialogTitle>
              <DialogDescription className="text-gray-dark small">
                {description}
              </DialogDescription>
            </DialogHeader>
            {isQuestionVariant ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <DropdownMenu open={isCategoryMenuOpen} onOpenChange={setIsCategoryMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg bg-[#F6F7FB] px-4 py-3 text-left text-sm font-semibold text-navy"
                      >
                        {internalCategory}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isCategoryMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {categoryOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value ?? option.label}
                          onClick={() => handleCategoryClick(option)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kodePertanyaan">Kode Pertanyaan</Label>
                  <Input
                    id="kodePertanyaan"
                    defaultValue={defaultValues.code}
                    placeholder="Contoh A.5.1"
                    className="bg-[#F6F7FB]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="namaPertanyaan">Nama Pertanyaan</Label>
                  <Input
                    id="namaPertanyaan"
                    defaultValue={defaultValues.name}
                    placeholder="Masukkan Nama Pertanyaan"
                    className="bg-[#F6F7FB]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isiPertanyaan">Pertanyaan</Label>
                  <textarea
                    id="isiPertanyaan"
                    defaultValue={defaultValues.question}
                    placeholder="Masukkan Pertanyaan"
                    className="min-h-[120px] w-full rounded-lg border border-transparent bg-[#F6F7FB] px-4 py-3 text-sm text-gray-dark focus:border-navy focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Label htmlFor="tanggalTerbit">Tanggal Terbit</Label>
                    <Input
                      id="tanggalTerbit"
                      name="tanggalTerbit"
                      type="date"
                      className="rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
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
                      classNameButton="w-full h-12!"
                      classNameDropdown="w-full"
                      showFunnelIcon={false}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button className="rounded-[4px]" variant="outline">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" className="hover:bg-navy-hover! rounded-[4px]">
                {submitLabel}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}
