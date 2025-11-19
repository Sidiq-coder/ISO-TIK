import { useCallback, useMemo, useState } from "react"
import { tableData } from "@/mocks/tableData.js"

export function useSoADocuments() {
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
