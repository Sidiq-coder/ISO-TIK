import { useState, useEffect } from "react";
import { SearchIcon, Plus } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import {
  NCRCard,
  NCRDetailModal,
  NCREditModal,
  NCRDeleteModal,
  NCRAddModal,
} from "./components/ncr";
import { PaginationControls } from "./components/common";
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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    setIsDetailModalOpen(true);
  };

  const handleEdit = (ncr) => {
    setSelectedNCR(ncr);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedNCR) => {
    // TODO: Implement save logic (API call)
    console.log("Saving NCR:", updatedNCR);
    // In real app, you would update the data here
  };

  const handleDelete = (ncr) => {
    setSelectedNCR(ncr);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (ncrData) => {
    // TODO: Implement delete logic (API call)
    console.log("Deleting NCR:", ncrData);
    // In real app, you would delete the data here
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedNCR(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedNCR(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedNCR(null);
  };

  const handleAddNCR = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (newNCR) => {
    // TODO: Implement add logic (API call)
    console.log("Adding new NCR:", newNCR);
    // In real app, you would add the data here
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
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

        <Button 
          onClick={handleAddNCR}
          className="h-14 px-6 bg-navy text-white hover:bg-navy-hover gap-2"
        >
          <Plus className="h-5 w-5" />
          Tambah NCR
        </Button>
      </div>

      {/* NCR Cards */}
      <div className="space-y-4">
        {pagedData.map((ncr) => (
          <NCRCard 
            key={ncr.id} 
            ncr={ncr} 
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          ncrData={selectedNCR}
        />
      )}

      {/* NCR Edit Modal */}
      {selectedNCR && (
        <NCREditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          ncrData={selectedNCR}
          onSave={handleSaveEdit}
        />
      )}

      {/* NCR Delete Modal */}
      {selectedNCR && (
        <NCRDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          ncrData={selectedNCR}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* NCR Add Modal */}
      <NCRAddModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveAdd}
      />
    </div>
  );
}
