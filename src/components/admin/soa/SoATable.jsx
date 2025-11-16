import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, FilePen, FileText, Trash2, Eye } from "lucide-react"
import { AlertIconDialog } from "./AlertIconDialog"

export function SoATable({ data, className = "" }) {
  const rows = data && data.length ? data : []
  const statusStyles = {
    Draft:
      "bg-gray-light text-navy-hover border border-[#D7DBE4] shadow-sm small",
    "In Progress":
      "bg-yellow-light text-yellow border border-[#F4E0A3] shadow-sm small",
    Reviewed:
      "bg-blue-light text-blue border border-[#C5D4FF] shadow-sm small",
    Approved:
      "bg-green-light text-green border border-[#BDECCB] shadow-sm small",
  }

  return (
    <div
      className={`border-2 rounded-t-xl relative w-full bg-white ${className}`}
    >
      <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-state">
          <TableRow>
            <TableHead className="text-left text-navy py-3 body-medium min-w-[120px] whitespace-nowrap">
              No Dokumen
            </TableHead>
            <TableHead className="text-left text-navy-hover py-3 body-medium min-w-[220px] whitespace-nowrap">
              Judul
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium min-w-[140px] whitespace-nowrap">
              Tanggal Terbit
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium min-w-[140px] whitespace-nowrap">
              Penyusun
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium min-w-[130px] whitespace-nowrap">
              Ketua ISO
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium min-w-[120px] whitespace-nowrap">
              Direktur
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium min-w-[120px]">
              Status
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium min-w-[140px]">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center body text-gray-dark py-6"
              >
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={`${row.noDoc}-${row.revisi}`}>
                <TableCell className="body text-navy text-left whitespace-nowrap">
                  {row.noDoc}
                </TableCell>
                <TableCell className="body text-left max-w-[240px] truncate" title={row.judul}>
                  {row.judul}
                </TableCell>
                <TableCell className="body text-center whitespace-nowrap">
                  {row.tanggalTerbit}
                </TableCell>
                <TableCell className="body text-center max-w-[140px] truncate" title={row.penyusun}>
                  {row.penyusun}
                </TableCell>
                <TableCell className="body text-center max-w-[140px] truncate" title={row.ketuaIso}>
                  {row.ketuaIso}
                </TableCell>
                <TableCell className="body text-center max-w-[140px] truncate" title={row.direktur}>
                  {row.direktur}
                </TableCell>
                <TableCell className="body text-center">
                  <span
                    className={`inline-flex items-center justify-center rounded-[4px] px-3 py-1 text-xs font-medium ${statusStyles[row.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"}`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="body flex justify-center gap-4 whitespace-nowrap">
                  <AlertIconDialog
                    type="view"
                    row={row}
                    trigger={() => (
                      <button type="button">
                        <Eye className="text-[#121A2E] w-5 h-5 cursor-pointer" />
                      </button>
                    )}
                  />
                  <AlertIconDialog
                    type="edit"
                    row={row}
                    trigger={() => (
                      <button type="button">
                        <FilePen className="text-[#2B7FFF] w-5 h-5 cursor-pointer" />
                      </button>
                    )}
                  />
                  <FileText className="text-[#00C950] w-5 h-5 cursor-pointer" />
                  <Download className="text-[#F1C441] w-5 h-5 cursor-pointer" />
                  <AlertIconDialog
                    type="delete"
                    row={row}
                    trigger={() => (
                      <button type="button">
                        <Trash2 className="text-[#FB2C36] w-5 h-5 cursor-pointer" />
                      </button>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
