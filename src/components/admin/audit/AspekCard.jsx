import { Eye, FilePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AspekCard({ aspek, onEdit, onDelete, checklistName }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/admin/audit/aspek/kategori/${aspek.id}`, {
      state: {
        aspekName: aspek.name,
        checklistName: checklistName || "Pencapaian Target Uptime 99,995%",
      },
    });
  };

  return (
    <div className="border-l-4 border-navy bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-navy font-semibold text-lg mb-2">{aspek.name}</h3>
          <p className="text-gray-dark text-sm leading-relaxed mb-3">
            {aspek.description}
          </p>
          {checklistName && (
            <div className="inline-block">
              <span className="text-xs bg-state text-navy px-3 py-1 rounded">
                Checklist: {checklistName}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleViewDetail}
            className="hover:bg-gray-100 p-2 rounded transition-colors"
            title="Lihat detail"
          >
            <Eye className="text-[#121A2E] w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(aspek)}
            className="hover:bg-blue-50 p-2 rounded transition-colors"
            title="Edit aspek"
          >
            <FilePen className="text-[#2B7FFF] w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(aspek)}
            className="hover:bg-red-50 p-2 rounded transition-colors"
            title="Hapus aspek"
          >
            <Trash2 className="text-[#FB2C36] w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
