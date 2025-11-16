import { useMemo, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Eye, ChevronDown } from "lucide-react"

const documentMeta = {
  title: "SOA ISO 27001:2022 - Q1 2025",
  category: { code: "A.5", name: "Information Security Policies" },
}

const controlQuestion = {
  id: "A.5.1",
  title: "Kebijakan untuk keamanan informasi",
  description:
    "Apakah kebijakan keamanan informasi dan kebijakan-kebijakan topik khusus telah ditentukan, disetujui oleh manajemen, diterbitkan, dikomunikasikan kepada dan diketahui oleh personil yang relevan serta para pihak berkepentingan yang relevan, dan ditinjau pada selang waktu terencana serta pada saat terjadi-nya perubahan yang signifikan?",
  justification:
    "Kebijakan keamanan informasi telah diterapkan di seluruh unit kerja dan dikomunikasikan minimal 2 kali dalam setahun. Pengecualian diberikan untuk unit yang sedang melakukan migrasi sistem.",
  summary: [
    "Kebijakan penerapan SMKI telah didokumentasikan dan diterapkan di seluruh unit.",
    "Peninjauan dokumen SMKI dilakukan minimal 1 kali setiap tahun.",
  ],
}

const controlMatrix = [
  {
    code: "PL",
    label: "Persyaratan Legal",
    value: { yes: true, no: false, partial: false },
  },
  {
    code: "KK",
    label: "Kewajiban Kontrak",
    value: { yes: false, no: true, partial: false },
  },
  {
    code: "PK/PB",
    label: "Persyaratan Kerja / Praktek yang Baik",
    value: { yes: false, no: false, partial: true },
  },
  {
    code: "HPR",
    label: "Hasil Penilaian Risiko (Keamanan Informasi)",
    value: { yes: true, no: false, partial: false },
  },
]

const relatedDocuments = [
  {
    id: "MN-MG-01",
    title: "Manual Keamanan Informasi",
    description: "Kebijakan umum keamanan informasi organisasi",
  },
  {
    id: "MN-MG-02",
    title: "Manual Prosedur Keamanan",
    description: "Rincian prosedur keamanan pada lingkungan produksi",
  },
  {
    id: "MN-MG-03",
    title: "Pedoman Audit Internal",
    description: "Checklist audit tahunan SMKI",
  },
]

const navigatorConfig = [
  {
    code: "A.5",
    label: "Information Security Policies",
    questions: [
      { id: "A5-1", label: "Information Security Policies", status: "complete" },
      { id: "A5-2", label: "Information Security Policies", status: "in-progress" },
      { id: "A5-3", label: "Information Security Policies", status: "active" },
    ],
  },
  {
    code: "A.6",
    label: "Organization of Information Security",
    questions: [{ id: "A6-1", label: "Information Security Policies", status: "pending" }],
  },
  {
    code: "A.7",
    label: "Human Resource Security",
    questions: [],
  },
  {
    code: "A.8",
    label: "Asset Management",
    questions: [],
  },
  {
    code: "A.9",
    label: "Access Control",
    questions: [],
  },
]

export default function ReviewJawabanSoA() {
  const controls = useMemo(() => controlMatrix, [])
  const [controlState, setControlState] = useState("no")
  const [comment, setComment] = useState("")
  const [toolbarShow, setToolbarShow] = useState(true)
  const [activeSection, setActiveSection] = useState(navigatorConfig[0].code)
  const [activeQuestion, setActiveQuestion] = useState("A5-3")
  const [viewMode, setViewMode] = useState("pengisian")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader />

      <section className="flex gap-6">
        <div className="flex-1 space-y-6">
          <QuestionCard
            controls={controls}
            controlState={controlState}
            setControlState={setControlState}
          />
          <RelatedDocs docs={relatedDocuments} />
          <CommentCard comment={comment} setComment={setComment} />
          <QuestionPagination />
        </div>

        <aside className="w-full max-w-xs space-y-6">
          <ViewSwitcher value={viewMode} onChange={setViewMode} />
          <ToolbarCard
            isOpen={toolbarShow}
            onToggle={() => setToolbarShow((prev) => !prev)}
            mode={viewMode}
          />
          <LegendCard />
          <Navigator
            sections={navigatorConfig}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
          />
        </aside>
      </section>
    </div>
  )
}

function PageHeader() {
  return (
    <header className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/soa/dokumen">Dokumen SOA</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Review Jawaban SOA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-2">
          <p className="text-gray-dark small">Judul Dokumen</p>
          <h1 className="heading-2 text-navy">Review Jawaban SOA</h1>
          <p className="text-[#2B7FFF] heading-4">{documentMeta.title}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-dark small">Kategori SoA</p>
          <div className="inline-flex items-center gap-3">
            <span className="px-3 py-1 bg-navy text-white rounded">{documentMeta.category.code}</span>
            <p className="text-navy font-medium">{documentMeta.category.name}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

function QuestionCard({ controls, controlState, setControlState }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded bg-[#E7EEFF] text-[#233876] px-3 py-1 text-xs font-semibold">
            {controlQuestion.id}
          </span>
          <h2 className="heading-4 text-navy">{controlQuestion.title}</h2>
        </div>
        <p className="text-gray-dark leading-relaxed">{controlQuestion.description}</p>
      </div>

      <div className="space-y-3">
        <p className="body-medium text-navy">Kendali Saat Ini</p>
        <div className="flex flex-wrap gap-6 text-body text-navy">
          {[
            { label: "Ya", value: "yes" },
            { label: "Tidak", value: "no" },
            { label: "Sebagian", value: "partial" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="control-state"
                value={option.value}
                checked={controlState === option.value}
                onChange={(event) => setControlState(event.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-4 text-sm font-semibold bg-[#F6F7FB] text-gray-dark min-w-[680px]">
          <div className="py-3 border-r text-left px-4">Kendali yang Dipilih &amp; Alasan Pemilihan</div>
          <div className="py-3 border-r text-center">Ya</div>
          <div className="py-3 border-r text-center">Tidak</div>
          <div className="py-3 text-center">Sebagian</div>
        </div>
        {controls.map((control, index) => (
          <div
            key={control.code}
            className={`grid grid-cols-4 text-sm border-t ${index % 2 === 1 ? "bg-[#FBFCFF]" : "bg-white"}`}
          >
            <div className="text-left px-4 py-3 flex items-center gap-2 text-gray-dark">
              <span className="text-xs font-semibold text-navy px-2 py-0.5 rounded-full bg-[#E7EEFF]">
                {control.code}
              </span>
              {control.label}
            </div>
            {["yes", "no", "partial"].map((type) => (
              <div key={type} className="py-3 border-l flex items-center justify-center">
                <span
                  className={`size-4 rounded-full border ${control.value[type] ? "bg-navy border-navy" : "border-gray-300"}`}
                />
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-dark">Pembenaran (Justifikasi) terhadap Pengecualian</p>
        <div className="rounded-md bg-[#F6F7FB] p-4 text-sm text-gray-700 min-h-[110px]">
          {controlQuestion.justification}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-dark">Ringkasan Penerapan / Pelaksanaan</p>
        <div className="rounded-md bg-[#F6F7FB] p-4 text-sm text-gray-700 min-h-[110px] space-y-2">
          {controlQuestion.summary.map((item, index) => (
            <p key={item}>
              {index + 1}). {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function RelatedDocs({ docs }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div>
        <p className="text-gray-dark small">Dokumen Terkait</p>
        <p className="text-sm text-gray-dark">{docs.length} dokumen dipilih</p>
      </div>
      <div className="space-y-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="rounded-lg border border-[#2B7FFF] bg-[#F2F6FF] px-4 py-3 flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#2B7FFF]">{doc.id}</p>
              <p className="text-navy font-semibold">{doc.title}</p>
              <p className="text-xs text-gray-dark">{doc.description}</p>
            </div>
            <button type="button" className="text-[#2B7FFF] flex items-center gap-1 text-sm">
              <Eye className="w-5 h-5" />
              Preview
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommentCard({ comment, setComment }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-3">
      <label className="text-sm font-medium text-gray-dark">Berikan Komentar</label>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className="w-full min-h-[120px] rounded-md border bg-[#F6F7FB] p-4 text-sm text-gray-700 outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:border-transparent"
        placeholder="Komentar Reviewer"
      />
      <div className="flex justify-end">
        <Button type="button" disabled={!comment}>
          Simpan Komentar
        </Button>
      </div>
    </div>
  )
}

function QuestionPagination() {
  return (
    <div className="flex justify-between items-center gap-3 bg-white border rounded-lg p-6">
      <Button type="button" variant="outline">
        ← Pertanyaan Sebelumnya
      </Button>
      <Button type="button">Pertanyaan Selanjutnya →</Button>
    </div>
  )
}

function ViewSwitcher({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const options = [
    { label: "Pengisian Jawaban", value: "pengisian" },
    { label: "Tampilan Tabel", value: "tabel" },
  ]

  const selected = options.find((item) => item.value === value) ?? options[0]

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full flex items-center justify-between rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-navy"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-full rounded-lg border bg-white shadow-sm z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-left px-4 py-2 text-sm ${
                option.value === value ? "bg-state text-navy font-medium" : "text-gray-dark"
              }`}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ToolbarCard({ isOpen, onToggle, mode }) {
  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-navy"
        onClick={onToggle}
      >
        Pengisian Jawaban
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t text-sm text-gray-dark space-y-1">
          {mode === "pengisian" ? (
            <>
              <p>Revisi: 03</p>
              <p>Tanggal Revisi: 10 Jan 2025</p>
              <p>Status Pengisian: Lengkap</p>
            </>
          ) : (
            <>
              <p>Menampilkan tampilan tabel jawaban.</p>
              <p>Anda dapat meninjau seluruh kendali dari SoA dalam bentuk tabel.</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function LegendCard() {
  return (
    <div className="border rounded-lg bg-white p-4 space-y-3 text-sm text-gray-dark">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-navy">Keterangan:</h3>
        <p>Y = Ya</p>
        <p>T = Tidak</p>
        <p>S = Sebagian</p>
      </div>
      <div className="border-t border-gray-200 pt-3 space-y-2">
        <p>PL = Persyaratan Legal</p>
        <p>KK = Kewajiban Kontrak</p>
        <p>PK/PB = Persyaratan Kerja / Praktek yang Baik</p>
        <p>HPR = Hasil Penilaian Risiko (Keamanan Informasi)</p>
      </div>
    </div>
  )
}

function Navigator({ sections, activeSection, setActiveSection, activeQuestion, setActiveQuestion }) {
  const toggleSection = (code) => {
    setActiveSection((prev) => (prev === code ? "" : code))
  }

  return (
    <div className="border rounded-lg bg-white p-4 space-y-4">
      <h3 className="text-sm font-semibold">Navigator Pertanyaan</h3>
      <div className="space-y-4">
        {sections.map((section) => {
          const expanded = section.code === activeSection || section.code === "A.5"
          return (
            <div key={section.code} className="space-y-2">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left font-semibold text-navy"
                onClick={() => toggleSection(section.code)}
              >
                <span>{section.code} {section.title}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded && (
                <div className="space-y-2 pl-4">
                  {section.questions.length === 0 && (
                    <p className="text-sm text-gray-400">Belum ada pertanyaan</p>
                  )}
                  {section.questions.map((question) => (
                    <button
                      key={question.id}
                      type="button"
                      className={`w-full flex items-center gap-2 text-sm ${
                        question.id === activeQuestion ? "text-navy font-semibold" : "text-gray-dark"
                      }`}
                      onClick={() => {
                        setActiveSection(section.code)
                        setActiveQuestion(question.id)
                      }}
                    >
                      <span
                        className={`size-2.5 rounded-full ${
                          question.status === "complete"
                            ? "bg-gray-700"
                            : question.status === "active"
                              ? "bg-green-500"
                              : question.status === "in-progress"
                                ? "bg-blue-400"
                                : "bg-gray-300"
                        }`}
                      />
                      {question.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
