import { useCallback, useMemo, useState } from "react";
import { auditData } from "@/mocks/tableData.js";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { OverlayForm } from "@/components/admin/audit/OverlayForm";
import { PaginateControls } from "@/components/admin/audit/PaginateControls";
import { AuditTable } from "@/components/admin/audit/AuditTable";
import { StatusDropdown } from "@/components/admin/audit/StatusDropdown";

const FILTER_OPTIONS = [
  { value: "Semua Status" },
  { value: "Draft" },
  { value: "In Progress" },
  { value: "Reviewed" },
  { value: "Approved" },
];

const PAGINATE_OPTIONS = [10, 20, 50, 100];

function useAuditDocuments() {
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isModalDropdownOpen, setIsModalDropdownOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("Draft");
  const [perPage, setPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const filteredData = useMemo(() => {
    return statusFilter === "Semua Status"
      ? auditData
      : auditData.filter((item) => item.status === statusFilter);
  }, [statusFilter]);

  const totalData = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalData / perPage));
  const currentPage = Math.min(activePage, totalPages);

  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return filteredData.slice(startIndex, startIndex + perPage);
  }, [filteredData, currentPage, perPage]);

  const handlePaginateChange = useCallback((value) => {
    setPerPage(Number(value));
  }, []);

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
  };
}

export default function DokumenAudit() {
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
  } = useAuditDocuments();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <InputGroup className="h-14 max-w-[1080px]">
        <InputGroupInput
          placeholder="Cari dokumen berdasarkan nama"
          className="bg-state text-navy placeholder:text-gray-dark"
        />
        <InputGroupAddon>
          <SearchIcon className="text-navy" />
        </InputGroupAddon>
      </InputGroup>

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

      <AuditTable data={pagedData} />

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
  );
}
