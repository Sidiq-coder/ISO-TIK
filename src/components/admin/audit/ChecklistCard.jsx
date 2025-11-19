import { Eye, FilePen, Trash2 } from "lucide-react";

export function ChecklistCard({
  checklist,
  title,
  description,
  badge,
  meta,
  onView,
  onEdit,
  onDelete,
  className = "",
}) {
  const effectiveTitle = title ?? checklist?.title ?? "Checklist Item";
  const effectiveDescription = description ?? checklist?.description ?? "";
  const effectiveBadge = badge ?? checklist?.badge;
  const metaContent = meta ?? checklist?.meta;
  const payload = checklist ?? { title: effectiveTitle, description: effectiveDescription };

  return (
    <div
      className={`border-l-4 border-navy bg-white h-[159px] max-w-[1562px] p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            {effectiveBadge && (
              <span className="rounded-[4px] bg-navy px-[8px] body-medium text-white">
                {effectiveBadge}
              </span>
            )}
            <h3 className="text-base font-semibold text-navy heading-4">{effectiveTitle}</h3>
          </div>
          <p className="body leading-relaxed text-gray-dark">{effectiveDescription}</p>
          {metaContent && <div className="text-xs text-gray-dark">{metaContent}</div>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {onView && (
            <button
              type="button"
              onClick={() => onView(payload)}
              className="rounded p-2 transition-colors hover:bg-blue-50"
              title="Lihat"
            >
              <Eye className="h-5 w-5 text-[#2B7FFF]" />
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(payload)}
              className="rounded p-2 transition-colors hover:bg-blue-50"
              title="Edit"
            >
              <FilePen className="h-5 w-5 text-[#2B7FFF]" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(payload)}
              className="rounded p-2 transition-colors hover:bg-red-50"
              title="Hapus"
            >
              <Trash2 className="h-5 w-5 text-[#FB2C36]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
