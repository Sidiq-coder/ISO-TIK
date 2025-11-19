import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  PaginateControls,
  SearchBar,
  StatusDropdown,
  Table as AdminTable,
} from "@/components/admin/table"
import { Download, Eye, FilePen, FileText, Plus, Trash2 } from "lucide-react"

const FILTER_OPTIONS = [
  { value: "Semua Status" },
  { value: "Draft" },
  { value: "In Progress" },
  { value: "Reviewed" },
  { value: "Approved" },
]

const PAGINATE_OPTIONS = [10, 20, 50]

const STATUS_STYLES = {
  Draft: "bg-gray-light text-navy-hover border border-[#D7DBE4] shadow-sm small",
  "In Progress":
    "bg-yellow-light text-yellow border border-[#F4E0A3] shadow-sm small",
  Reviewed: "bg-blue-light text-blue border border-[#C5D4FF] shadow-sm small",
  Approved: "bg-green-light text-green border border-[#BDECCB] shadow-sm small",
}

const MANUAL_DOCUMENTS = [
  {
    noDoc: "MAN-001",
    judul: "Manual Operasional Pusat Data",
    tanggalTerbit: "12/02/2025",
    penyusun: "Divisi Infrastruktur",
    ketuaIso: "Nadia Putri",
    direktur: "Robert Johnson",
    status: "Approved",
  },
  {
    noDoc: "MAN-002",
    judul: "Panduan Eskalasi Insiden Siber",
    tanggalTerbit: "08/02/2025",
    penyusun: "Divisi Keamanan",
    ketuaIso: "Arif Rahman",
    direktur: "Dewi Larasati",
    status: "Reviewed",
  },
  {
    noDoc: "MAN-003",
    judul: "Manual Audit Internal ISMS",
    tanggalTerbit: "02/02/2025",
    penyusun: "Divisi Audit",
    ketuaIso: "Arif Rahman",
    direktur: "Dewi Larasati",
    status: "In Progress",
  },
  {
    noDoc: "MAN-004",
    judul: "Panduan Pengelolaan Vendor Kritis",
    tanggalTerbit: "28/01/2025",
    penyusun: "Divisi Procurement",
    ketuaIso: "Arif Rahman",
    direktur: "Linda Pratama",
    status: "Draft",
  },
  {
    noDoc: "MAN-005",
    judul: "Manual Penerapan Keamanan Aplikasi",
    tanggalTerbit: "24/01/2025",
    penyusun: "Divisi Pengembangan",
    ketuaIso: "Nadia Putri",
    direktur: "Robert Johnson",
    status: "Approved",
  },
  {
    noDoc: "MAN-006",
    judul: "Panduan Kontrol Akses Cabang",
    tanggalTerbit: "20/01/2025",
    penyusun: "Divisi Operasional",
    ketuaIso: "Jane Smith",
    direktur: "Linda Pratama",
    status: "Reviewed",
  },
  {
    noDoc: "MAN-007",
    judul: "Manual Sosialisasi Awareness",
    tanggalTerbit: "15/01/2025",
    penyusun: "Divisi HR",
    ketuaIso: "Jane Smith",
    direktur: "Linda Pratama",
    status: "Draft",
  },
  {
    noDoc: "MAN-008",
    judul: "Manual Pelaksanaan BCP",
    tanggalTerbit: "05/01/2025",
    penyusun: "Divisi Risiko",
    ketuaIso: "Nadia Putri",
    direktur: "Robert Johnson",
    status: "In Progress",
  },
]

const MANUAL_COLUMNS = [
  {
    key: "noDoc",
    header: "No Dokumen",
    headerClassName: "text-left text-navy min-w-[120px] whitespace-nowrap",
    cellClassName: "text-navy text-left whitespace-nowrap",
    accessor: "noDoc",
  },
  {
    key: "judul",
    header: "Judul",
    headerClassName: "text-left min-w-[220px] whitespace-nowrap",
    cellClassName: "text-left max-w-[240px] truncate",
    render: (row) => <span title={row.judul}>{row.judul}</span>,
  },
  {
    key: "tanggalTerbit",
    header: "Tanggal Terbit",
    headerClassName: "text-center min-w-[140px] whitespace-nowrap",
    cellClassName: "text-center whitespace-nowrap",
    accessor: "tanggalTerbit",
  },
  {
    key: "penyusun",
    header: "Penyusun",
    headerClassName: "text-center min-w-[140px] whitespace-nowrap",
    cellClassName: "text-center max-w-[140px] truncate",
    render: (row) => <span title={row.penyusun}>{row.penyusun}</span>,
  },
  {
    key: "ketuaIso",
    header: "Ketua ISO",
    headerClassName: "text-center min-w-[130px] whitespace-nowrap",
    cellClassName: "text-center max-w-[140px] truncate",
    render: (row) => <span title={row.ketuaIso}>{row.ketuaIso}</span>,
  },
  {
    key: "direktur",
    header: "Direktur",
    headerClassName: "text-center min-w-[120px] whitespace-nowrap",
    cellClassName: "text-center max-w-[140px] truncate",
    render: (row) => <span title={row.direktur}>{row.direktur}</span>,
  },
  {
    key: "status",
    header: "Status",
    headerClassName: "text-center min-w-[120px]",
    cellClassName: "text-center",
    render: (row) => (
      <span
        className={`inline-flex items-center justify-center rounded-[4px] px-3 py-1 text-xs font-medium ${
          STATUS_STYLES[row.status] ??
          "bg-gray-100 text-gray-600 border border-gray-200"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "aksi",
    header: "Aksi",
    headerClassName: "text-center min-w-[140px]",
    cellClassName: "flex justify-center gap-4 whitespace-nowrap",
    render: (row) => (
      <>
        <button type="button" title="Lihat">
          <Eye className="text-[#121A2E] w-5 h-5 cursor-pointer" />
        </button>
        <button type="button" title="Edit">
          <FilePen className="text-[#2B7FFF] w-5 h-5 cursor-pointer" />
        </button>
        <button type="button" title="Duplikasi">
          <FileText className="text-[#00C950] w-5 h-5 cursor-pointer" />
        </button>
        <button type="button" title="Unduh">
          <Download className="text-[#F1C441] w-5 h-5 cursor-pointer" />
        </button>
        <button type="button" title="Hapus">
          <Trash2 className="text-[#FB2C36] w-5 h-5 cursor-pointer" />
        </button>
      </>
    ),
  },
]

export default function ManualDocuments() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS[0].value)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)

  const filteredDocuments = useMemo(() => {
    return MANUAL_DOCUMENTS.filter((doc) => {
      const matchesStatus =
        statusFilter === "Semua Status" || doc.status === statusFilter
      const searchValue = search.toLowerCase()
      const matchesSearch =
        doc.judul.toLowerCase().includes(searchValue) ||
        doc.noDoc.toLowerCase().includes(searchValue)
      return matchesStatus && matchesSearch
    })
  }, [search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / perPage))
  const pagedDocuments = useMemo(() => {
    const startIndex = (activePage - 1) * perPage
    return filteredDocuments.slice(startIndex, startIndex + perPage)
  }, [filteredDocuments, activePage, perPage])

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchBar
        placeholder="Cari dokumen manual..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
          setActivePage(1)
        }}
        inputGroupClassName="h-14 max-w-[480px]"
      />

      <StatusDropdown
        isMenuOpen={isStatusDropdownOpen}
        setIsMenuOpen={setIsStatusDropdownOpen}
        value={statusFilter}
        onChange={(value) => {
          setStatusFilter(value)
          setActivePage(1)
        }}
        options={FILTER_OPTIONS}
        classNameButton="w-[204px]! h-14!"
        classNameDropdown="w-[204px]!"
      />

      <Button className="flex h-14 items-center gap-2 rounded-[4px] bg-navy px-4 text-white hover:bg-navy/90">
        <Plus className="h-4 w-4" />
        Tambah Dokumen
      </Button>

      <AdminTable
        className="bg-white"
        tableClassName="min-w-[900px]"
        columns={MANUAL_COLUMNS}
        data={pagedDocuments}
        getRowKey={(row) => `${row.noDoc}-${row.judul}`}
      />

      <PaginateControls
        perPage={perPage}
        onPaginateChange={(value) => {
          setPerPage(Number(value))
          setActivePage(1)
        }}
        paginateValue={PAGINATE_OPTIONS}
        activePage={activePage}
        onPageChange={setActivePage}
        totalPages={totalPages}
        totalData={filteredDocuments.length}
      />
    </div>
  )
}
