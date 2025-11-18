import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { ChevronRight, SearchIcon, FilePen, Trash2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PaginateControls } from "@/components/admin/table/PaginateControls";
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import {
  PertanyaanDialog,
  DeletePertanyaanDialog,
} from "@/components/admin/audit/PertanyaanDialog";
import { pertanyaanAuditData } from "@/mocks/tableData";

const PAGINATE_OPTIONS = [10, 20, 50, 100];

function PertanyaanCard({ pertanyaan, onEdit, onDelete }) {
  return (
    <div className="border-l-4 border-navy bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-navy text-base leading-relaxed">
            {pertanyaan.pertanyaan}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(pertanyaan)}
            className="hover:bg-blue-50 p-2 rounded transition-colors"
            title="Edit pertanyaan"
          >
            <FilePen className="text-[#2B7FFF] w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(pertanyaan)}
            className="hover:bg-red-50 p-2 rounded transition-colors"
            title="Hapus pertanyaan"
          >
            <Trash2 className="text-[#FB2C36] w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ aspekId }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      <Link
        to="/admin/audit/aspek"
        className="hover:text-navy transition-colors"
      >
        Aspek Audit
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link
        to={`/admin/audit/aspek/kategori/${aspekId}`}
        className="hover:text-navy transition-colors"
      >
        Kategori Pertanyaan
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-navy font-medium">Pertanyaan Audit</span>
    </nav>
  );
}

export default function PertanyaanAudit() {
  const { setHeader } = useAdminLayout();
  const location = useLocation();
  const { id: kategoriId } = useParams();

  const { checklistName, aspekName, kategoriName, aspekId } =
    location.state || {
      checklistName: "Pencapaian Target Uptime 99,995%",
      aspekName: "Availability & Reliability",
      kategoriName: "Kebijakan & Perencanaan",
      aspekId: 1,
    };

  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [pertanyaanList, setPertanyaanList] = useState([]);

  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPertanyaan, setSelectedPertanyaan] = useState(null);

  // Set page header
  useEffect(() => {
    setHeader({
      title: "Detail Checklist Audit",
      subtitle: "Kelola dokumen, checklist, aspek, pertanyaan audit",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profile",
      },
    });
  }, [setHeader]);

  // Load pertanyaan data based on kategoriId
  useEffect(() => {
    const filtered = pertanyaanAuditData.filter(
      (item) => item.kategoriId === parseInt(kategoriId)
    );
    setPertanyaanList(filtered);
  }, [kategoriId]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return pertanyaanList;
    return pertanyaanList.filter((item) =>
      item.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pertanyaanList, searchQuery]);

  const totalData = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalData / perPage));
  const currentPage = Math.min(activePage, totalPages);

  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return filteredData.slice(startIndex, startIndex + perPage);
  }, [filteredData, currentPage, perPage]);

  const handlePaginateChange = useCallback((value) => {
    setPerPage(Number(value));
    setActivePage(1);
  }, []);

  const handleAddPertanyaan = (formData) => {
    const newPertanyaan = {
      id: Math.max(...pertanyaanList.map((p) => p.id), 0) + 1,
      kategoriId: parseInt(kategoriId),
      pertanyaan: formData.pertanyaan,
    };
    setPertanyaanList([...pertanyaanList, newPertanyaan]);
  };

  const handleEdit = (pertanyaan) => {
    setSelectedPertanyaan(pertanyaan);
    setIsEditDialogOpen(true);
  };

  const handleEditPertanyaan = (formData) => {
    setPertanyaanList(
      pertanyaanList.map((p) =>
        p.id === selectedPertanyaan.id
          ? { ...p, pertanyaan: formData.pertanyaan }
          : p
      )
    );
    setIsEditDialogOpen(false);
    setSelectedPertanyaan(null);
  };

  const handleDelete = (pertanyaan) => {
    setSelectedPertanyaan(pertanyaan);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setPertanyaanList(
      pertanyaanList.filter((p) => p.id !== selectedPertanyaan.id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedPertanyaan(null);
  };

  return (
    <div className="space-y-4">
      <Breadcrumb aspekId={aspekId} />

      <div>
        <h2 className="text-2xl font-bold text-navy mb-3">Pertanyaan Audit</h2>
        <div className="flex items-start gap-12">
          <div>
            <p className="text-sm text-gray-600 mb-1">Checklist Audit:</p>
            <p className="text-[#2B7FFF] font-medium">{checklistName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Aspek Audit:</p>
            <p className="text-[#2B7FFF] font-medium">{aspekName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Kategori Pertanyaan:</p>
            <p className="text-[#2B7FFF] font-medium">{kategoriName}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-between">
        <InputGroup className="h-14 max-w-[1080px] flex-1">
          <InputGroupInput
            placeholder="Cari pertanyaan berdasarkan nama"
            className="bg-state text-navy placeholder:text-gray-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon className="text-navy" />
          </InputGroupAddon>
        </InputGroup>

        <PertanyaanDialog mode="add" onSave={handleAddPertanyaan} />
      </div>

      <div className="space-y-3">
        {pagedData.length === 0 ? (
          <div className="text-center py-12 text-gray-dark">
            <p className="body">Tidak ada pertanyaan ditemukan</p>
          </div>
        ) : (
          pagedData.map((pertanyaan) => (
            <PertanyaanCard
              key={pertanyaan.id}
              pertanyaan={pertanyaan}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {totalData > 0 && (
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
      )}

      {/* Edit Dialog */}
      {selectedPertanyaan && (
        <PertanyaanDialog
          key={`edit-${selectedPertanyaan.id}`}
          mode="edit"
          pertanyaan={selectedPertanyaan}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleEditPertanyaan}
        />
      )}

      {/* Delete Dialog */}
      <DeletePertanyaanDialog
        pertanyaan={selectedPertanyaan}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
