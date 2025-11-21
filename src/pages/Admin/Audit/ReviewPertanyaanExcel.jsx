import { useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, ChevronUp, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Mock data untuk review excel
const mockExcelData = {
  checklistExcel: [
    {
      id: 1,
      name: "Fully Redundant Critical Systems",
      active: true,
      items: [
        {
          id: 1,
          aspek: "Kebijakan & SLA",
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Dokumen SLA",
          kesesuaian: "Ya",
          catatanEditor: "Perlu Ada Perubahan terkait dokumen terkait",
          statusReview: "sudah",
          reviewer: {
            name: "Admin Reviewer",
            date: "8/1/2025",
            comment: "Perlu ada perbaikan",
          },
        },
        {
          id: 2,
          aspek: "Kebijakan & SLA",
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Dokumen SLA",
          kesesuaian: "Tidak",
          catatanEditor: "-",
          statusReview: "belum",
          reviewer: null,
        },
      ],
    },
    {
      id: 2,
      name: "Jenis Checklist excel 1",
      active: false,
      items: [],
    },
    {
      id: 3,
      name: "Jenis Checklist excel 2",
      active: false,
      items: [],
    },
  ],
};

function ReviewPertanyaanExcel() {
  const { id, checklistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { dokumenTitle, lokasi, tanggalAudit, revisi, mode } = location.state || {};
  const [activeTab, setActiveTab] = useState("excel");
  const [checklistExcel, setChecklistExcel] = useState(mockExcelData.checklistExcel);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [komentarReviewer, setKomentarReviewer] = useState("");

  const toggleChecklist = (checklistId) => {
    setChecklistExcel(
      checklistExcel.map((checklist) =>
        checklist.id === checklistId
          ? { ...checklist, active: !checklist.active }
          : checklist
      )
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "aspek") {
      // Navigate to ReviewAspekPertanyaan
      navigate(`/admin/audit/dokumen/${id}/review/${checklistId}`, {
        state: { dokumenTitle, lokasi, tanggalAudit, revisi, mode },
      });
    }
  };

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setKomentarReviewer(item.reviewer?.comment || "");
    setDialogOpen(true);
  };

  const handleSimpanKomentar = () => {
    console.log("Simpan komentar:", komentarReviewer, "untuk item:", selectedItem.id);
    // Update item with new review
    setDialogOpen(false);
  };

  const handleEditKomentar = () => {
    // Enable edit mode
    console.log("Edit komentar");
  };

  // Get active checklist items
  const activeItems = checklistExcel.find((c) => c.active)?.items || [];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-8 border-b">
        <button
          onClick={() => handleTabChange("aspek")}
          className={`pb-3 body font-medium transition-colors relative ${
            activeTab === "aspek" ? "text-navy" : "text-gray-dark"
          }`}
        >
          Aspek Pertanyaan
          {activeTab === "aspek" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy" />
          )}
        </button>
        <button
          onClick={() => handleTabChange("excel")}
          className={`pb-3 body font-medium transition-colors relative ${
            activeTab === "excel" ? "text-navy" : "text-gray-dark"
          }`}
        >
          Pertanyaan Excel
          {activeTab === "excel" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy" />
          )}
        </button>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 body text-gray-dark">
        <Link
          to="/admin/audit/dokumen"
          className="text-[#2B7FFF] hover:underline"
        >
          Dokumen Audit
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-dark" />
        <Link
          to={`/admin/audit/dokumen/${id}`}
          state={{ dokumenTitle, lokasi, tanggalAudit, revisi, mode }}
          className="text-[#2B7FFF] hover:underline"
        >
          Daftar Checklist
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-dark" />
        <span className="text-[#2B7FFF] font-medium">
          Review Pertanyaan Excel
        </span>
      </nav>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          {/* Info Header */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="small text-gray-dark mb-1">Jenis Checklist</p>
              <p className="body-medium text-[#2B7FFF]">
                Fully Redundant Critical Systems
              </p>
            </div>
            <div>
              <p className="small text-gray-dark mb-1">Jenis Checklist Excel</p>
              <p className="body-medium text-[#2B7FFF]">
                Fully Redundant Critical Systems
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-[#2B7FFF] text-white">
                  <th className="p-3 text-left small font-medium">No</th>
                  <th className="p-3 text-left small font-medium">Aspek</th>
                  <th className="p-3 text-left small font-medium">Item Audit</th>
                  <th className="p-3 text-left small font-medium">Bukti Objektif</th>
                  <th className="p-3 text-center small font-medium">Kesesuaian</th>
                  <th className="p-3 text-left small font-medium">Catatan Editor</th>
                  <th className="p-3 text-center small font-medium">Status Review</th>
                  <th className="p-3 text-left small font-medium">Komentar Reviewer</th>
                  <th className="p-3 text-center small font-medium">Aksi Reviewer</th>
                </tr>
              </thead>
              <tbody>
                {activeItems.map((item, index) => (
                  <tr key={item.id} className="border-t hover:bg-state transition-colors">
                    <td className="p-3 body text-navy">{index + 1}</td>
                    <td className="p-3 body text-navy">{item.aspek}</td>
                    <td className="p-3 body text-navy">{item.itemAudit}</td>
                    <td className="p-3 body text-navy">{item.buktiObjektif}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded small font-medium ${
                          item.kesesuaian === "Ya"
                            ? "bg-[#E8F5E9] text-[#28A745]"
                            : "bg-[#FFF4E5] text-[#FF9800]"
                        }`}
                      >
                        {item.kesesuaian}
                      </span>
                    </td>
                    <td className="p-3 body text-navy">{item.catatanEditor}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded small font-medium ${
                          item.statusReview === "sudah"
                            ? "bg-[#2B7FFF] text-white"
                            : "bg-[#FEE] text-[#F44336]"
                        }`}
                      >
                        {item.statusReview === "sudah"
                          ? "Sudah Direview"
                          : "Belum Direview"}
                      </span>
                    </td>
                    <td className="p-3 body text-navy">
                      {item.reviewer?.comment || "-"}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDialog(item)}
                          className="p-2 hover:bg-blue-50 rounded transition-colors"
                          title="Komentar"
                        >
                          <MessageSquare className="w-5 h-5 text-[#2B7FFF]" />
                        </button>
                        <button
                          className="p-2 hover:bg-green-50 rounded transition-colors"
                          title="Tandai Direview"
                        >
                          <Check className="w-5 h-5 text-[#28A745]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigator Sidebar */}
        <div className="w-80 shrink-0">
          <div className="border rounded-lg p-4 bg-white sticky top-6">
            <h3 className="body-medium text-navy mb-4">
              Navigator Checklist Excel
            </h3>

            <div className="space-y-2">
              {checklistExcel.map((checklist) => (
                <button
                  key={checklist.id}
                  onClick={() => toggleChecklist(checklist.id)}
                  className={`w-full flex items-center justify-between p-3 rounded transition-colors text-left ${
                    checklist.active
                      ? "bg-[#2B7FFF] text-white"
                      : "hover:bg-state text-gray-dark"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {checklist.active && (
                      <div className="w-2 h-2 rounded-full bg-[#28A745] shrink-0" />
                    )}
                    <span className={`body ${checklist.active ? "font-medium" : ""}`}>
                      {checklist.name}
                    </span>
                  </div>
                  {checklist.active ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Komentar Reviewer */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="heading-3 text-navy">
              Komentar Reviewer
            </DialogTitle>
            <p className="text-gray-dark small mt-1">
              {selectedItem?.aspek}
            </p>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Item Info */}
            <div className="space-y-3">
              <div>
                <p className="small text-gray-dark mb-1">Item Audit</p>
                <p className="body text-navy">{selectedItem?.itemAudit}</p>
              </div>
              <div>
                <p className="small text-gray-dark mb-1">Bukti Objektif</p>
                <p className="body text-navy">{selectedItem?.buktiObjektif}</p>
              </div>
              <div>
                <p className="small text-gray-dark mb-1">Kesesuaian</p>
                <p className="body text-navy">{selectedItem?.kesesuaian}</p>
              </div>
              <div>
                <p className="small text-gray-dark mb-1">Catatan Editor</p>
                <p className="body text-navy">{selectedItem?.catatanEditor}</p>
              </div>
            </div>

            {/* Existing Review */}
            {selectedItem?.reviewer && (
              <div className="bg-[#E8F5E9] p-4 rounded-lg space-y-2">
                <p className="small text-gray-dark">Direview oleh</p>
                <p className="body text-navy font-medium">
                  {selectedItem.reviewer.name}
                </p>
                <div>
                  <p className="small text-gray-dark">Tanggal</p>
                  <p className="body text-navy">{selectedItem.reviewer.date}</p>
                </div>
                <div>
                  <p className="small text-gray-dark">Komentar Reviewer</p>
                  <p className="body text-navy">{selectedItem.reviewer.comment}</p>
                </div>
              </div>
            )}

            {/* Comment Form */}
            <div className="space-y-2">
              <label className="body text-navy">
                {selectedItem?.reviewer ? "Edit Komentar" : "Berikan Komentar"}
              </label>
              <Textarea
                placeholder="Masukkan Komentar Reviewer"
                value={komentarReviewer}
                onChange={(e) => setKomentarReviewer(e.target.value)}
                className="min-h-[100px] rounded-lg bg-state placeholder:text-gray-dark focus:bg-white focus:border-2 focus:border-navy"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-lg">
                Batal
              </Button>
            </DialogClose>
            <Button
              onClick={handleSimpanKomentar}
              className="rounded-lg bg-navy hover:bg-navy-hover text-white"
            >
              Simpan Komentar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReviewPertanyaanExcel;
