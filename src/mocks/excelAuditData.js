// Mock data untuk Pertanyaan Excel Audit
export const pertanyaanExcelData = {
  sections: [
    {
      code: "Excel1",
      title: "Kebijakan & SLA",
      items: [
        {
          id: 1,
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Dokumen SLA",
          kesesuaian: "Ya",
          catatanEditor: "Perlu Ada Perubahan terkait dokumen terkait",
        },
        {
          id: 2,
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Dokumen SLA",
          kesesuaian: "Tidak",
          catatanEditor: "Perlu Ada Perubahan terkait dokumen terkait",
        },
        {
          id: 3,
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Belum Diisi",
          kesesuaian: "Belum Diisi",
          catatanEditor: "Belum Diisi",
        },
      ],
    },
  ],
};

// Mock data untuk Review Pertanyaan Excel
export const reviewExcelData = {
  sections: [
    {
      code: "Excel1",
      title: "Kebijakan & SLA",
      items: [
        {
          id: 1,
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Dokumen SLA",
          kesesuaian: "Ya",
          catatanEditor: "Perlu Ada Perubahan terkait dokumen terkait",
          statusReview: "sudah",
          komentarReviewer: "Perlu ada perbaikan",
          reviewer: {
            name: "Admin Reviewer",
            date: "8/1/2025",
            comment: "Perlu ada perbaikan",
          },
        },
        {
          id: 2,
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Dokumen SLA",
          kesesuaian: "Tidak",
          catatanEditor: "-",
          statusReview: "belum",
          komentarReviewer: "Belum diisi",
          reviewer: null,
        },
        {
          id: 3,
          itemAudit: "Apakah SLA menetapkan uptime 99,995%?",
          buktiObjektif: "Belum Diisi",
          kesesuaian: "Belum Diisi",
          catatanEditor: "Belum Diisi",
          statusReview: "belum",
          komentarReviewer: "Belum diisi",
          reviewer: null,
        },
      ],
    },
  ],
};
