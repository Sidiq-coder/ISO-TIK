import { reviewControlMatrix, reviewNavigatorConfig, reviewRelatedDocuments } from "@/mocks/reviewSoAData"

const controlCodes = ["PL", "KK", "PK/PB", "HPR"]

const controlSummary = controlCodes.reduce((acc, code) => {
  const found = reviewControlMatrix.find((item) => item.code === code)
  if (!found) {
    acc[code] = "-"
  } else if (found.value.yes) {
    acc[code] = "Y"
  } else if (found.value.partial) {
    acc[code] = "S"
  } else if (found.value.no) {
    acc[code] = "T"
  } else {
    acc[code] = "-"
  }
  return acc
}, {})

const statusBadge = (status) => {
  const mapping = {
    complete: { text: "Sudah Direview", className: "bg-blue-50 text-blue-600 border border-blue-200" },
    "in-progress": { text: "Sedang Direview", className: "bg-yellow-50 text-yellow-600 border border-yellow-200" },
    active: { text: "Belum Direview", className: "bg-red-50 text-red-600 border border-red-200" },
    pending: { text: "Belum Direview", className: "bg-red-50 text-red-600 border border-red-200" },
  }
  return mapping[status] ?? mapping.pending
}

export const scaleTableData = {
  controlCodes,
  sections: reviewNavigatorConfig
    .filter((section) => section.questions.length > 0)
    .map((section) => ({
      code: section.code,
      title: `${section.code} ${section.title || section.label}`,
      questions: section.questions.map((question) => {
        const summaryList = [
          "Kebijakan-kebijakan terhadap penerapan SMKI telah didokumentasikan dan diterapkan.",
          "Peninjauan terhadap dokumen SMKI dilakukan minimal 1 (satu) tahun sekali.",
        ]
        const docs = reviewRelatedDocuments.slice(0, 4)
        const statusMeta = statusBadge(question.status)
        const ytsValue = question.status === "complete" ? "Y" : question.status === "pending" ? "-" : "S"

        return {
          id: question.id,
          title: question.label,
          description: question.description,
          yts: ytsValue,
          controls: { ...controlSummary },
          justification:
            "Kebijakan keamanan informasi telah ditetapkan, didokumentasikan, dan disetujui oleh manajemen serta dikomunikasikan ke pihak terkait.",
          summary: summaryList,
          documents: docs,
          statusLabel: statusMeta.text,
          statusClass: statusMeta.className,
          reviewerComment:
            question.status === "complete"
              ? "Perlu ada perubahan terkait dokumen terkait."
              : "Belum diisi",
        }
      }),
    })),
}
