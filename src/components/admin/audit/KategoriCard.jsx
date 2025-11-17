import { useState } from "react";
import { FilePen, Trash2, ChevronDown, Plus } from "lucide-react";

export function KategoriCard({
  kategori,
  onEdit,
  onDelete,
  onAddPertanyaan,
  onViewPertanyaan,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-l-4 border-navy bg-white shadow-sm">
      <div className="p-4 flex justify-between items-center gap-4">
        <h3 className="text-navy font-medium text-base flex-1">
          {kategori.name}
        </h3>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onAddPertanyaan(kategori)}
            className="hover:bg-green-50 p-2 rounded transition-colors"
            title="Tambah pertanyaan"
          >
            <Plus className="text-[#00B227] w-5 h-5" />
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
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-gray-100 p-2 rounded transition-colors"
            title={isExpanded ? "Tutup" : "Buka"}
          >
            <ChevronDown
              className={`text-[#121A2E] w-5 h-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200">
          <div className="pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {kategori.description || "Tidak ada deskripsi"}
            </p>
            {kategori.pertanyaanCount !== undefined && (
              <p className="text-xs text-gray-500 mt-2">
                Jumlah Pertanyaan:{" "}
                <span className="font-medium">{kategori.pertanyaanCount}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
