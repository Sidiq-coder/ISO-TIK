import { useCallback, useMemo, useState } from "react"
import { tableData } from "@/mocks/tableData.js"
import { Download, FilePen, FileText, Trash2, Eye } from "lucide-react"
import { PaginateControls, SearchBar, StatusDropdown, Table as AdminTable } from "@/components/admin/table"
import { AlertIconDialog } from "@/components/admin/soa/AlertIconDialog"
import { OverlayForm } from "@/components/admin/soa/OverlayForm"

const FILTER_OPTIONS = [
  { value: "Semua Status" },
  { value: "Draft" },
  { value: "In Progress" },
  { value: "Reviewed" },
  { value: "Approved" },
]

const PAGINATE_OPTIONS = [10, 20, 50, 100]

const STATUS_STYLES = {
  Draft: "bg-gray-light text-navy-hover border border-[#D7DBE4] shadow-sm small",
  "In Progress":
    "bg-yellow-light text-yellow border border-[#F4E0A3] shadow-sm small",
  Reviewed: "bg-blue-light text-blue border border-[#C5D4FF] shadow-sm small",
  Approved: "bg-green-light text-green border border-[#BDECCB] shadow-sm small",
}

const SOA_COLUMNS = [
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
      </>
    ),
  },
]

function useSoADocuments() {
  const [statusFilter, setStatusFilter] = useState("Semua Status")
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [isModalDropdownOpen, setIsModalDropdownOpen] = useState(false)
  const [modalStatus, setModalStatus] = useState("Draft")
  const [perPage, setPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)

  const filteredData = useMemo(() => {
    return statusFilter === "Semua Status"
      ? tableData
      : tableData.filter((item) => item.status === statusFilter)
  }, [statusFilter])

  const totalData = filteredData.length
  const totalPages = Math.max(1, Math.ceil(totalData / perPage))
  const currentPage = Math.min(activePage, totalPages)

  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage
    return filteredData.slice(startIndex, startIndex + perPage)
  }, [filteredData, currentPage, perPage])

  const handlePaginateChange = useCallback((value) => {
    setPerPage(Number(value))
  }, [])

  return {
    statusFilter,
    setStatusFilter,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    isModalDropdownOpen,
    setIsModalDropdownOpen,
    modalStatus,
    setModalStatus,
    perPage,
    currentPage,
    setActivePage,
    pagedData,
    totalData,
    totalPages,
    handlePaginateChange,
  }
}

export default function DokumenSoA() {
  const {
    statusFilter,
    setStatusFilter,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    isModalDropdownOpen,
    setIsModalDropdownOpen,
    modalStatus,
    setModalStatus,
    perPage,
    currentPage,
    setActivePage,
    pagedData,
    totalData,
    totalPages,
    handlePaginateChange,
  } = useSoADocuments()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchBar />

      <StatusDropdown
        isMenuOpen={isFilterDropdownOpen}
        setIsMenuOpen={setIsFilterDropdownOpen}
        value={statusFilter}
        onChange={setStatusFilter}
        options={FILTER_OPTIONS}
        classNameButton="w-[204px]! h-14!"
        classNameDropdown="w-[204px]!"
      />

      <OverlayForm
        isStatusDropdownOpen={isModalDropdownOpen}
        setIsStatusDropdownOpen={setIsModalDropdownOpen}
        statusValue={modalStatus}
        onStatusChange={setModalStatus}
      />

      <AdminTable
        className="bg-white"
        tableClassName="min-w-[900px]"
        columns={SOA_COLUMNS}
        data={pagedData}
        getRowKey={(row) => `${row.noDoc}-${row.revisi}`}
      />

      <PaginateControls
        perPage={perPage}
        onPaginateChange={handlePaginateChange}
        paginateValue={PAGINATE_OPTIONS}
        setActivePage={setActivePage}
        activePage={currentPage}
        onPageChange={setActivePage}
        totalPages={totalPages}
        totalData={totalData}
      />
    </div>
  )
}
