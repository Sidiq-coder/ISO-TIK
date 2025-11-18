import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FindingAddModal, FindingEditModal, FindingDeleteModal } from "./components/finding";

export default function FindingsListPage() {
  const { setHeader } = useAdminLayout();
  const navigate = useNavigate();
  const { id, caseId } = useParams();

  // Mock data - in real app, fetch based on caseId
  const caseDetail = {
    ncrTitle: "NCR Dokumen 1",
    caseNumber: "010101",
  };

  const [findings, setFindings] = useState([
    {
      id: 1,
      kategori: "Kategori Temuan Audit - Minor",
      deskripsi: "Organisasi PT. ABC belum adanya SDM IT khususnya pada bidang artefaktif IT, organisasi hanya memiliki SDM IT Support",
    },
    {
      id: 2,
      kategori: "Kategori Temuan Audit - Minor",
      deskripsi: "Organisasi PT. ABC belum adanya SDM IT khususnya pada bidang artefaktif IT, organisasi hanya memiliki SDM IT Support",
    },
  ]);

  const [selectedFinding, setSelectedFinding] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setHeader({
      title: "Non Conformity Report (NCR)",
      subtitle: "Kelola dokumen dan temuan",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profile",
      },
    });
  }, [setHeader]);

  const handleBack = () => {
    navigate(`/admin/ncr/${id}/kasus`);
  };

  const handleAddFinding = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (newFinding) => {
    // TODO: Implement add logic (API call)
    const newId = Math.max(...findings.map(f => f.id), 0) + 1;
    setFindings([...findings, { ...newFinding, id: newId }]);
    console.log("Adding new finding:", newFinding);
  };

  const handleEditCategory = () => {
    // Open edit modal with the category (first finding's category as reference)
    if (findings.length > 0) {
      setSelectedFinding(findings[0]);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (updatedFinding) => {
    // TODO: Implement edit logic (API call)
    setFindings(findings.map(f => 
      f.id === updatedFinding.id ? updatedFinding : f
    ));
    console.log("Updating finding:", updatedFinding);
  };

  const handleDeleteFinding = (finding) => {
    setSelectedFinding(finding);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (findingData) => {
    // TODO: Implement delete logic (API call)
    setFindings(findings.filter(f => f.id !== findingData.id));
    console.log("Deleting finding:", findingData);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate("/admin/ncr")}
          className="text-gray-dark hover:text-navy"
        >
          Dokumen NCR
        </button>
        <span className="text-gray-dark">&gt;</span>
        <button
          onClick={handleBack}
          className="text-gray-dark hover:text-navy"
        >
          Daftar Kasus
        </button>
        <span className="text-gray-dark">&gt;</span>
        <span className="text-navy font-medium">Daftar Temuan</span>
      </div>

      {/* Header Info */}
      <div className="bg-white rounded-lg border border-gray-300 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-dark mb-1">Judul Dokumen</p>
            <h2 className="text-lg font-semibold text-navy">
              {caseDetail.ncrTitle}
            </h2>
          </div>
          <div>
            <p className="text-sm text-gray-dark mb-1">Nomor NCR</p>
            <h2 className="text-lg font-semibold text-navy">
              {caseDetail.caseNumber}
            </h2>
          </div>
        </div>
      </div>

      {/* Section Title and Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-navy">Daftar Temuan</h2>
        <Button
          onClick={handleAddFinding}
          className="h-12 px-6 bg-green-600 text-white hover:bg-green-700 gap-2"
        >
          <Plus className="h-5 w-5" />
          Tambah Temuan
        </Button>
      </div>

      {/* Findings List */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-navy mb-4">
            Uraian Ketidaksesuaian :
          </h3>
          
          <div className="bg-gray-100 rounded-md px-3 py-2 inline-block">
            <p className="text-sm text-gray-700">Kategori Temuan Audit - Minor</p>
          </div>

          <div className="space-y-3">
            {findings.map((finding, index) => (
              <div
                key={finding.id}
                className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-300"
              >
                <span className="text-navy font-medium">{index + 1}.</span>
                <p className="flex-1 text-navy">{finding.deskripsi}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteFinding(finding)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="h-12 px-6 border-gray-300"
          >
            Kembali
          </Button>
          <Button
            onClick={handleEditCategory}
            className="h-12 px-6 bg-blue-600 text-white hover:bg-blue-700"
          >
            ✏️ Edit Kategori Temuan
          </Button>
        </div>
      </div>

      {/* Penanganan Terkait Temuan Button */}
      <div className="flex justify-center">
        <Button className="h-12 px-8 bg-navy text-white hover:bg-navy-hover">
          Penanganan Terkait Temuan
        </Button>
      </div>

      {/* Modals */}
      <FindingAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAdd}
      />

      <FindingEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        findingData={selectedFinding}
        onSave={handleSaveEdit}
      />

      <FindingDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        findingData={selectedFinding}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
