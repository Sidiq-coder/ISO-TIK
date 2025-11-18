import { useState, useEffect, useMemo } from "react"
import { SearchIcon, Plus, ChevronDown } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext"
import { useNCRDocuments } from "./hooks/useNCRData"
import { ncrMockData } from "./data/mockData"
import {
  NCRDetailModal,
  NCREditModal,
  NCRDeleteModal,
  NCRAddModal,
} from "./components/ncr"
import { PaginationControls } from "./components/common"
import { ChecklistCard } from "@/components/admin/audit/ChecklistCard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NCR_STATUS } from "./constants"

export default function NCR() {
  const { setHeader } = useAdminLayout()
  const [statusFilter, setStatusFilter] = useState("all")

  const statusFilteredData = useMemo(() => {
    if (statusFilter === "all") return ncrMockData
    return ncrMockData.filter((item) => item.status === statusFilter)
  }, [statusFilter])

  const {
    searchQuery,
    setSearchQuery,
    perPage,
    currentPage,
    setActivePage,
    pagedData,
    totalData,
    totalPages,
    handlePaginateChange,
  } = useNCRDocuments(statusFilteredData)

  const [selectedNCR, setSelectedNCR] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    setHeader({
      title: "Non Conformity Report (NCR)",
      subtitle: "Kelola dokumen dan status",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profile",
      },
    })
  }, [setHeader])

  const handleViewDetail = (ncr) => {
    setSelectedNCR(ncr)
    setIsDetailModalOpen(true)
  }

  const handleEdit = (ncr) => {
    setSelectedNCR(ncr)
    setIsEditModalOpen(true)
  }

  const handleDelete = (ncr) => {
    setSelectedNCR(ncr)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedNCR(null)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedNCR(null)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedNCR(null)
  }

  const handleAddNCR = () => {
    setIsAddModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <InputGroup className="h-14 flex-1">
          <InputGroupInput
            placeholder="Cari NCR berdasarkan judul dokumen"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="bg-state text-navy placeholder:text-gray-dark"
          />
          <InputGroupAddon>
            <SearchIcon className="text-navy" />
          </InputGroupAddon>
        </InputGroup>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-14 min-w-[180px] justify-between gap-2">
              {statusFilter === "all" ? "Semua Status" : statusFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Pilih Status</DropdownMenuLabel>
            {["all", ...Object.values(NCR_STATUS)].map((value) => (
              <DropdownMenuItem
                key={value}
                onClick={() => {
                  setStatusFilter(value)
                  setActivePage(1)
                }}
              >
                {value === "all" ? "Semua Status" : value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={handleAddNCR}
          className="h-14 gap-2 bg-navy px-6 text-white hover:bg-navy-hover"
        >
          <Plus className="h-5 w-5" /> Tambah NCR
        </Button>
      </div>

      <div className="space-y-4">
        {pagedData.map((ncr) => (
          <ChecklistCard
            key={ncr.id}
            checklist={ncr}
            badge={ncr.id}
            title={ncr.title}
            description={ncr.description}
            
            onView={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {pagedData.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            Tidak ada NCR sesuai pencarian
          </div>
        )}
      </div>

      <PaginationControls
        perPage={perPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={totalData}
        onPageChange={setActivePage}
        onPaginateChange={handlePaginateChange}
      />

      {selectedNCR && (
        <NCRDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          ncrData={selectedNCR}
        />
      )}
      {selectedNCR && (
        <NCREditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          ncrData={selectedNCR}
          onSave={(data) => console.log("Saving data", data)}
        />
      )}
      {selectedNCR && (
        <NCRDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          ncrData={selectedNCR}
          onConfirm={(data) => console.log("Deleting data", data)}
        />
      )}
      <NCRAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => console.log("Adding data", data)}
      />
    </div>
  )
}
