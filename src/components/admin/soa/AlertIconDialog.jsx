import { useState } from "react"
import { Eye, FilePen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const titleMap = {
  view: "Detail Dokumen SoA",
  edit: "Edit Dokumen",
  delete: "Hapus Dokumen",
}

export function AlertIconDialog({ type, row, className = "" }) {
  const [open, setOpen] = useState(false)
  const readOnly = type === "view"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {type === "view" && (
            <Eye className="text-[#121A2E] w-5 h-5 cursor-pointer" />
          )}
          {type === "edit" && (
            <FilePen className="text-[#2B7FFF] w-5 h-5 cursor-pointer" />
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle className="heading-3 text-navy">
            {titleMap[type]}
          </DialogTitle>
          <DialogTitle className="text-gray-dark small">
            Informasi lengkap mengenai dokumen SoA yang dipilih
          </DialogTitle>
        </DialogHeader>

        {readOnly ? (
          <div className="space-y-2 text-sm text-navy grid grid-cols-2">
            <p>
              No Dokumen <br /> {row.noDoc}
            </p>
            <p>
              Tanggal Dibuat <br /> {row.tanggalDibuat}
            </p>
            <p>
              Judul Dokumen <br /> {row.judul}
            </p>
            <p>
              Tanggal Terbit {row.tanggalTerbit}
            </p>
            <p>
              Klasifikasi <br /> {row.klasifikasi}
            </p>
            <p>
              Revisi <br /> {row.revisi}
            </p>
            <p>
              Penyusun <br /> {row.penyusun}
            </p>
          </div>
        ) : (
          <form className="grid gap-4">
            <label className="text-sm text-muted-foreground">
              Judul
              <Input defaultValue={row.judul} />
            </label>
            <label className="text-sm text-muted-foreground">
              Penyusun
              <Input defaultValue={row.penyusun} />
            </label>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
