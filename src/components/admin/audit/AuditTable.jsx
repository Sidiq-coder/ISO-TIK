import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText, Trash2 } from "lucide-react";
import { AlertIconDialog } from "./AlertIconDialog";

export function AuditTable({ data, className = "" }) {
  const rows = data && data.length ? data : [];

  return (
    <div
      className={`border-2 rounded-t-xl relative w-full overflow-x-auto ${className}`}
    >
      <Table>
        <TableHeader className="bg-state">
          <TableRow>
            <TableHead className="text-left text-navy py-3 body-medium">
              Judul
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Lokasi
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Tanggal Audit
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Lead Auditor
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Auditor
            </TableHead>
            <TableHead className="text-center text-navy-hover py-3 body-medium">
              Revisi
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
            rows.map((row, index) => (
              <TableRow key={`${row.judul}-${index}`}>
                <TableCell className="body text-navy text-left">
                  {row.judul}
                </TableCell>
                <TableCell className="body text-center">{row.lokasi}</TableCell>
                <TableCell className="body text-center">
                  {row.tanggalAudit}
                </TableCell>
                <TableCell className="body text-center">
                  {row.leadAuditor}
                </TableCell>
                <TableCell className="body text-center">
                  {row.auditor}
                </TableCell>
                <TableCell className="body text-center">{row.revisi}</TableCell>
                <TableCell className="body text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
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
                </TableCell>
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
  );
}
