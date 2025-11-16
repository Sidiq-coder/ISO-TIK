import { useNavigate } from "react-router-dom";
import { ChevronRight, Eye, FilePen, Trash2 } from "lucide-react";

export function KategoriPertanyaanCard({ 
  kategori, 
  onEdit, 
  onDelete,
  checklistName,
  aspekName 
}) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    // Navigate to detail page with state
    navigate(`/admin/audit/aspek/kategori/${kategori.id}`, {
      state: {
        kategoriName: kategori.name,
        checklistName,
        aspekName,
      }
    });
  };

  return (
    <div className="border-l-4 border-navy bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-navy font-semibold text-base mb-2">
            {kategori.name}
          </h3>
          {kategori.description && (
            <p className="text-gray-dark text-sm leading-relaxed">
              {kategori.description}
            </p>
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
            onClick={() => onEdit(kategori)}
            className="hover:bg-blue-50 p-2 rounded transition-colors"
            title="Edit kategori"
          >
            <FilePen className="text-[#2B7FFF] w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(kategori)}
            className="hover:bg-red-50 p-2 rounded transition-colors"
            title="Hapus kategori"
          >
            <Trash2 className="text-[#FB2C36] w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {item.href ? (
            <a
              href={item.href}
              className="text-[#2B7FFF] hover:underline"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-navy font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
