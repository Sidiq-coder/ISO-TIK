import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, FileText, Trash2 } from "lucide-react"
import { AlertIconDialog } from "./AlertIconDialog"

export function SoATable({ data, className = "" }) {
  const rows = data && data.length ? data : []

  return (
    <div
      className={`border-2 rounded-t-xl relative w-full overflow-x-auto ${className}`}
    >
      <Table>
        <TableHeader className="bg-state">
          <TableRow>
            <TableHead className="text-left text-navy py-3 body-medium">
              No Dokumen
            </TableHead>
            <TableHead className="text-left text-navy-hover py-3 body-medium">
              Judul
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Tanggal Terbit
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Penyusun
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Ketua ISO
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Direktur
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Status
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
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
                <TableCell className="body text-navy text-left">
                  {row.noDoc}
                </TableCell>
                <TableCell className="body text-left">{row.judul}</TableCell>
                <TableCell className="body text-center">
                  {row.tanggalTerbit}
                </TableCell>
                <TableCell className="body text-center">
                  {row.penyusun}
                </TableCell>
                <TableCell className="body text-center">
                  {row.ketuaIso}
                </TableCell>
                <TableCell className="body text-center">
                  {row.direktur}
                </TableCell>
                <TableCell className="body text-center">{row.status}</TableCell>
                <TableCell className="body flex justify-center gap-4">
                  <AlertIconDialog type="view" row={row} />
                  <AlertIconDialog type="edit" row={row} />
                  <FileText className="text-[#00C950] w-5 h-5 cursor-pointer" />
                  <Download className="text-[#F1C441] w-5 h-5 cursor-pointer" />
                  <Trash2 className="text-[#FB2C36] w-5 h-5 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
