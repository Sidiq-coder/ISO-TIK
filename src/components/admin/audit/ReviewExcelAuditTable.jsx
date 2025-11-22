import { Fragment } from "react";
import { MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewExcelAuditTable({
  data,
  onKomentarClick,
  onTandaiDireview,
}) {
  if (!data || !data.sections) return null;

  return (
    <section className="rounded-2xl border border-[#D8E2FF] bg-white shadow-sm">
      <div className="overflow-auto">
        <table className="min-w-full w-full">
          <thead>
            <tr className="bg-[#0E39A0] text-white">
              <th className="border border-white/20 px-4 py-3 text-center font-semibold w-16">
                No
              </th>
              <th className="border border-white/20 px-4 py-3 text-left font-semibold w-48">
                Aspek
              </th>
              <th className="border border-white/20 px-4 py-3 text-left font-semibold">
                Item Audit
              </th>
              <th className="border border-white/20 px-4 py-3 text-left font-semibold">
                Bukti Objektif
              </th>
              <th className="border border-white/20 px-4 py-3 text-center font-semibold w-40">
                Kesesuaian
              </th>
              <th className="border border-white/20 px-4 py-3 text-left font-semibold">
                Catatan Editor
              </th>
              <th className="border border-white/20 px-4 py-3 text-center font-semibold w-40">
                Status Review
              </th>
              <th className="border border-white/20 px-4 py-3 text-left font-semibold">
                Komentar Reviewer
              </th>
              <th className="border border-white/20 px-4 py-3 text-center font-semibold w-32">
                Aksi Reviewer
              </th>
            </tr>
          </thead>
          <tbody>
            {data.sections.map((section) => (
              <Fragment key={section.code}>
                {section.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#E3E9FF] align-top"
                  >
                    <td className="border border-[#E3E9FF] px-4 py-3 text-center font-medium text-navy">
                      {index + 1}
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-[#1C2754] font-medium">
                      {section.title}
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-[#1C2754]">
                      {item.itemAudit}
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-[#1C2754]">
                      {item.buktiObjektif}
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center rounded-md px-4 py-1.5 text-sm font-medium ${
                          item.kesesuaian === "Ya"
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : item.kesesuaian === "Tidak"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {item.kesesuaian}
                      </span>
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-[#1C2754]">
                      {item.catatanEditor}
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center rounded-md px-4 py-1.5 text-sm font-medium ${
                          item.statusReview === "sudah"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                      >
                        {item.statusReview === "sudah"
                          ? "Sudah Direview"
                          : "Belum Direview"}
                      </span>
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3 text-gray-600">
                      {item.komentarReviewer}
                    </td>
                    <td className="border border-[#E3E9FF] px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-blue-300 text-blue-600 hover:bg-blue-50"
                          onClick={() =>
                            onKomentarClick &&
                            onKomentarClick(item, section.code)
                          }
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {item.statusReview !== "sudah" && (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 border-green-300 text-green-600 hover:bg-green-50"
                            onClick={() =>
                              onTandaiDireview &&
                              onTandaiDireview(item, section.code)
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
