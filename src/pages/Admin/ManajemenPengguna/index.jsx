import { useEffect, useMemo, useState } from "react"
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext"
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
  { value: "Aktif" },
  { value: "Menunggu" },
  { value: "Nonaktif" },
]

const PAGINATE_OPTIONS = [10, 20, 50]

const STATUS_STYLES = {
  Aktif: "bg-green-light text-green border border-[#BDECCB] shadow-sm small",
  Menunggu: "bg-yellow-light text-yellow border border-[#F4E0A3] shadow-sm small",
  Nonaktif: "bg-gray-light text-navy-hover border border-[#D7DBE4] shadow-sm small",
}

const USERS = [
  {
    id: "USR-001",
    fullName: "Nadia Putri",
    username: "nadia.putri",
    email: "nadia.putri@example.com",
    role: "Admin",
    status: "Aktif",
  },
  {
    id: "USR-002",
    fullName: "Arif Rahman",
    username: "arif.rahman",
    email: "arif.rahman@example.com",
    role: "Reviewer",
    status: "Aktif",
  },
  {
    id: "USR-003",
    fullName: "Dewi Larasati",
    username: "dewilarasati",
    email: "dewi.larasati@example.com",
    role: "Approver",
    status: "Menunggu",
  },
  {
    id: "USR-004",
    fullName: "Robert Johnson",
    username: "r.johnson",
    email: "robert.johnson@example.com",
    role: "Direktur",
    status: "Aktif",
  },
  {
    id: "USR-005",
    fullName: "Linda Pratama",
    username: "linda.pratama",
    email: "linda.pratama@example.com",
    role: "Manager",
    status: "Nonaktif",
  },
  {
    id: "USR-006",
    fullName: "Jane Smith",
    username: "jane.smith",
    email: "jane.smith@example.com",
    role: "Admin",
    status: "Aktif",
  },
  {
    id: "USR-007",
    fullName: "Yuda Saputra",
    username: "yuda.saputra",
    email: "yuda.saputra@example.com",
    role: "Reviewer",
    status: "Menunggu",
  },
]

const USER_COLUMNS = [
  {
    key: "fullName",
    header: "Nama Lengkap",
    headerClassName: "text-left text-navy min-w-[120px] whitespace-nowrap",
    cellClassName: "text-left text-navy",
    render: (row) => (
      <div>
        <p className="">{row.fullName}</p>
      </div>
    ),
  },
  {
    key: "username",
    header: "Username",
    headerClassName: "text-left min-w-[220px]",
    cellClassName: "text-left max-w-[240px] text-gray-dark",
    accessor: "username",
  },
  {
    key: "email",
    header: "Email",
    headerClassName: "text-left min-w-[220px]",
    cellClassName: "text-left truncate",
    accessor: "email",
  },
  {
    key: "role",
    header: "Roles",
    headerClassName: "text-center min-w-[120px]",
    cellClassName: "text-center",
    accessor: "role",
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
    key: "actions",
    header: "Aksi",
    headerClassName: "text-center min-w-[180px]",
    cellClassName: "flex justify-center gap-4 whitespace-nowrap",
    render: () => (
      <>
        <button type="button" title="Lihat">
          <Eye className="text-[#121A2E] w-5 h-5 cursor-pointer" />
        </button>
        <button type="button" title="Edit">
          <FilePen className="text-[#2B7FFF] w-5 h-5 cursor-pointer" />
        </button>
        <button type="button" title="Reset Password">
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

export default function ManajemenPengguna() {
  const { setHeader } = useAdminLayout()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS[0].value)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {
    setHeader({
      title: "Manajemen Pengguna",
      subtitle: "Kelola akses dan peran pengguna platform",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profile",
      },
    })
  }, [setHeader])

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase()
    return USERS.filter((user) => {
      const matchesStatus =
        statusFilter === "Semua Status" || user.status === statusFilter
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchValue) ||
        user.username.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
      return matchesStatus && matchesSearch
    })
  }, [search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / perPage))
  const pagedUsers = useMemo(() => {
    const startIndex = (activePage - 1) * perPage
    return filteredUsers.slice(startIndex, startIndex + perPage)
  }, [filteredUsers, activePage, perPage])

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchBar
        placeholder="Cari pengguna..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
          setActivePage(1)
        }}
        inputGroupClassName="h-14 max-w-[1123px]"
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

      <Button className="flex h-14 items-center gap-2 rounded-[4px] bg-navy px-4 text-white hover:bg-navy/90 w-[193px]">
        <Plus className="h-4 w-4" />
        Tambah Pengguna
      </Button>

      <AdminTable
        className="bg-white"
        tableClassName="min-w-[960px]"
        columns={USER_COLUMNS}
        data={pagedUsers}
        getRowKey={(row) => row.id}
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
        totalData={filteredUsers.length}
      />
    </div>
  )
}
