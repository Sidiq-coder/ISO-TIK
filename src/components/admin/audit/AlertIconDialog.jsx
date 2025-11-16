import { useState } from "react";
import { Eye, FilePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const titleMap = {
  view: "Detail Dokumen Audit",
  edit: "Edit Dokumen Audit",
  delete: "Hapus Dokumen Audit",
};

export function AlertIconDialog({ type, row, className = "" }) {
  const [open, setOpen] = useState(false);
  const readOnly = type === "view";

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
            Informasi lengkap mengenai dokumen audit yang dipilih
          </DialogTitle>
        </DialogHeader>

        {readOnly ? (
          <div className="space-y-2 text-sm text-navy grid grid-cols-2">
            <p>
              Judul <br /> {row.judul}
            </p>
            <p>
              Lokasi <br /> {row.lokasi}
            </p>
            <p>
              Tanggal Audit <br /> {row.tanggalAudit}
            </p>
            <p>
              Lead Auditor <br /> {row.leadAuditor}
            </p>
            <p>
              Auditor <br /> {row.auditor}
            </p>
            <p>
              Revisi <br /> {row.revisi}
            </p>
            <p>
              Status <br /> {row.status}
            </p>
          </div>
        ) : (
          <form className="grid gap-4">
            <label className="text-sm text-muted-foreground">
              Judul
              <Input defaultValue={row.judul} />
            </label>
            <label className="text-sm text-muted-foreground">
              Lokasi
              <Input defaultValue={row.lokasi} />
            </label>
            <label className="text-sm text-muted-foreground">
              Lead Auditor
              <Input defaultValue={row.leadAuditor} />
            </label>
            <label className="text-sm text-muted-foreground">
              Auditor
              <Input defaultValue={row.auditor} />
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
  );
}
