import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, FilePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const titleMap = {
  view: "Detail Dokumen Audit",
  edit: "Edit Dokumen Audit",
};

const subtitleMap = {
  view: "Informasi lengkap mengenai dokumen audit yang dipilih",
  edit: "Ubah informasi dokumen audit sesuai kebutuhan",
};

export function AlertIconDialog({ type, row, className = "" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const readOnly = type === "view";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
    setOpen(false);
  };

  const handleNavigate = (mode) => {
    navigate(`/admin/audit/dokumen/${row.id}`, {
      state: {
        dokumenTitle: row.judul,
        lokasi: row.lokasi,
        tanggalAudit: row.tanggalAudit,
        revisi: row.revisi,
        mode: mode, // "view" or "fill"
      },
    });
    setOpen(false);
  };

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

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="heading-3 text-navy">
            {titleMap[type]}
          </DialogTitle>
          <p className="text-gray-dark small mt-1">{subtitleMap[type]}</p>
        </DialogHeader>

        {readOnly ? (
          <div className="space-y-4 py-2">
            <div className="bg-state p-4 rounded-lg">
              <p className="text-sm font-semibold text-navy mb-1">
                Checklist Audit
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-dark mb-1">Tanggal Audit</p>
                <p className="text-sm text-navy font-medium">
                  {row.tanggalAudit}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Lokasi</p>
                <p className="text-sm text-navy font-medium">{row.lokasi}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-dark mb-1">Lead Auditor</p>
                <p className="text-sm text-navy font-medium">
                  {row.leadAuditor}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Auditor</p>
                <p className="text-sm text-navy font-medium">{row.auditor}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-dark mb-1">Revisi</p>
                <p className="text-sm text-navy font-medium">{row.revisi}</p>
              </div>
              <div>
                <p className="text-xs text-gray-dark mb-1">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                    row.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : row.status === "Reviewed"
                      ? "bg-blue-100 text-blue-700"
                      : row.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {row.status}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="rounded-lg"
                onClick={() => handleNavigate("view")}
              >
                Lihat Jawaban
              </Button>
              <Button
                className="rounded-lg bg-navy hover:bg-navy-hover"
                onClick={() => handleNavigate("fill")}
              >
                Isi Jawaban
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="judul" className="text-sm text-navy">
                Judul Dokumen
              </Label>
              <Input
                id="judul"
                defaultValue={row.judul}
                className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lokasi" className="text-sm text-navy">
                  Lokasi
                </Label>
                <Input
                  id="lokasi"
                  defaultValue={row.lokasi}
                  className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalAudit" className="text-sm text-navy">
                  Tanggal Audit
                </Label>
                <Input
                  id="tanggalAudit"
                  defaultValue={row.tanggalAudit}
                  className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadAuditor" className="text-sm text-navy">
                  Lead Auditor
                </Label>
                <Input
                  id="leadAuditor"
                  defaultValue={row.leadAuditor}
                  className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auditor" className="text-sm text-navy">
                  Auditor
                </Label>
                <Input
                  id="auditor"
                  defaultValue={row.auditor}
                  className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revisi" className="text-sm text-navy">
                  Revisi
                </Label>
                <Input
                  id="revisi"
                  defaultValue={row.revisi}
                  className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm text-navy">
                  Status
                </Label>
                <Input
                  id="status"
                  defaultValue={row.status}
                  className="rounded-lg bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy"
                />
              </div>
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
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
