import { useState, useEffect } from "react";
import { SearchIcon, Plus } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import { NCRDetailModal } from "./components/NCRDetailModal";
import { NCRCard } from "./components/NCRCard";
import { PaginationControls } from "./components/PaginationControls";
import { useNCRDocuments } from "./hooks/useNCRData";
import { ncrMockData } from "./data/mockData";

export default function NCR() {
  const { setHeader } = useAdminLayout();
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
  } = useNCRDocuments(ncrMockData);

  const [selectedNCR, setSelectedNCR] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHeader({
      title: "Non Conformity Report (NCR)",
      subtitle: "Kelola dokumen dan status",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profile",
      },
    });
  }, [setHeader]);

  const handleViewDetail = (ncr) => {
    setSelectedNCR(ncr);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNCR(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Add Button */}
      <div className="flex flex-wrap items-center gap-4">
        <InputGroup className="h-14 flex-1">
          <InputGroupInput
            placeholder="Cari NCR berdasarkan judul dokumen"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-state text-navy placeholder:text-gray-dark"
          />
          <InputGroupAddon>
            <SearchIcon className="text-navy" />
          </InputGroupAddon>
        </InputGroup>

        <Button className="h-14 px-6 bg-navy text-white hover:bg-navy-hover gap-2">
          <Plus className="h-5 w-5" />
          Tambah NCR
        </Button>
      </div>

      {/* NCR Cards */}
      <div className="space-y-4">
        {pagedData.map((ncr) => (
          <NCRCard key={ncr.id} ncr={ncr} onViewDetail={handleViewDetail} />
        ))}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        perPage={perPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={totalData}
        onPageChange={setActivePage}
        onPaginateChange={handlePaginateChange}
      />

      {/* NCR Detail Modal */}
      {selectedNCR && (
        <NCRDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ncrData={selectedNCR}
        />
      )}
    </div>
  );
}
