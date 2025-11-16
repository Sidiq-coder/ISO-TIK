import { FilePen, Trash2 } from "lucide-react";

export function ChecklistCard({ checklist, onEdit, onDelete }) {
  return (
    <div className="border-l-4 border-navy bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-navy font-semibold text-base mb-2">
            {checklist.title}
          </h3>
          <p className="text-gray-dark text-sm leading-relaxed">
            {checklist.description}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(checklist)}
            className="hover:bg-blue-50 p-2 rounded transition-colors"
            title="Edit checklist"
          >
            <FilePen className="text-[#2B7FFF] w-5 h-5 cursor-pointer" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(checklist)}
            className="hover:bg-red-50 p-2 rounded transition-colors"
            title="Hapus checklist"
          >
            <Trash2 className="text-[#FB2C36] w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}
