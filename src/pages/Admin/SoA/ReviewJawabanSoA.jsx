import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Plus, Check, X, ChevronDown } from "lucide-react"
import { useReviewSoA } from "./hooks/useReviewSoA"
import {
  getReviewMetaByTitle,
  reviewControlQuestion,
  reviewControlMatrix,
  reviewRelatedDocuments,
  reviewNavigatorConfig,
} from "@/mocks/reviewSoAData"
import { Link } from "react-router-dom"

const CATEGORY_OPTIONS = reviewNavigatorConfig.map((section) => ({
  label: `${section.code} ${section.title}`,
  value: section.code,
}))

export default function ReviewJawabanSoA() {
  const controls = useMemo(() => reviewControlMatrix, [])
  const documentMeta = useMemo(
    () => getReviewMetaByTitle("SOA ISO 27001:2022 - Q1 2025"),
    [],
  )

  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY_OPTIONS[0]?.value ?? "",
  )

  const {
    controlState,
    setControlState,
    activeSection,
    setActiveSection,
    activeQuestion,
    setActiveQuestion,
    comment,
    setComment,
  } = useReviewSoA({
    defaultControlState: "no",
    defaultSection: reviewNavigatorConfig[0].code,
    defaultQuestion: reviewNavigatorConfig[0].questions[0]?.id ?? "",
  })

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex flex-col gap-6">
        <PageHeader
          documentMeta={documentMeta}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main className="space-y-6">
            <QuestionCard
              controls={controls}
              controlState={controlState}
              setControlState={setControlState}
            />
            <RelatedDocs docs={reviewRelatedDocuments} />
            <CommentCard comment={comment} setComment={setComment} />
            <ActionBar />
          </main>

          <aside className="space-y-5">
            <LegendCard documentMeta={documentMeta} />
            <Navigator
              sections={reviewNavigatorConfig}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}

function PageHeader({ documentMeta, selectedCategory, onCategoryChange }) {
  return (
    <section>
      <div className="space-y-5 py-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
          to={`/admin/soa/dokumen`}
            className="small text-gray-dark hover:text-blue-dark"
          >
            Dokumen SOA
          </Link>
          <span className="text-gray-dark">&gt;</span>
          <span className="small text-blue-dark">Pengisian Jawaban SOA</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-2">
            <h1 className="heading-2 text-navy">Pengisian Jawaban SoA</h1>
            <div className="space-y-1 grid grid-cols-2">
              <div>
                <p className="small text-gray-dark">Judul Dokumen</p>
              <p className="heading-4 text-blue-dark">{documentMeta.title}</p>
              </div>
              <div>
                <p className="small text-gray-dark">Kategori SoA</p>
              <p className="heading-4 text-blue-dark"><span className="text-white bg-blue-dark px-[14.5px] py-[6px] rounded-[4px] body-medium mr-[16px]">{documentMeta.category.code}</span>{documentMeta.category.name}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-[#D8E2FF] p-4">
            <div className="flex items-center gap-3">
              <span className="rounded bg-[#E8EEFF] px-3 py-1 text-sm font-semibold text-navy">
                {documentMeta.category.code}
              </span>
              <div>
                <p className="small text-gray-dark">Kode SoA</p>
                <p className="text-navy font-semibold">{documentMeta.section}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.value === value) ?? options[0]

  return (
    <div className="relative min-w-[240px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-[#CBD6F5] bg-[#F7F9FF] px-4 py-3 text-left text-sm font-semibold text-navy shadow-inner"
      >
        <span>{selected?.label}</span>
        <ChevronDown className={`h-4 w-4 text-navy transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-full rounded-xl border border-[#E1E6F4] bg-white shadow">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-sm ${
                option.value === value ? "bg-[#EEF2FF] text-navy font-semibold" : "text-gray-dark"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function QuestionCard({ controls, controlState, setControlState }) {
  return (
    <section className="rounded-2xl border border-[#DDE3F5] bg-white p-6 shadow-sm space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded bg-[#233876] px-3 py-1 text-xs font-semibold text-white">
            {reviewControlQuestion.id}
          </span>
          <p className="heading-4 text-navy">{reviewControlQuestion.title}</p>
        </div>
        <p className="text-gray-dark leading-relaxed">{reviewControlQuestion.description}</p>
      </div>

      <div className="space-y-3">
        <p className="body-medium text-navy">Kendali Saat Ini</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { label: "Ya", value: "yes" },
            { label: "Tidak", value: "no" },
            { label: "Sebagian", value: "partial" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-colors ${
                controlState === option.value
                  ? "border-navy bg-[#EAF0FF] text-navy"
                  : "border-gray-300 text-gray-dark"
              }`}
            >
              <input
                type="radio"
                className="accent-navy"
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

      <div className="overflow-hidden rounded-2xl border border-[#E3E9FF]">
        <div className="grid min-w-[680px] grid-cols-4 bg-[#F6F7FB] text-sm font-semibold text-gray-dark">
          <div className="border-r px-4 py-3 text-left">
            Kendali yang Dipilih &amp; Alasan Pemilihan
          </div>
          <div className="border-r px-4 py-3 text-center">Ya</div>
          <div className="border-r px-4 py-3 text-center">Tidak</div>
          <div className="px-4 py-3 text-center">Sebagian</div>
        </div>
        {controls.map((control, index) => (
          <div
            key={control.code}
            className={`grid min-w-[680px] grid-cols-4 text-sm ${
              index % 2 === 0 ? "bg-white" : "bg-[#FBFCFF]"
            }`}
          >
            <div className="flex flex-col gap-1 border-t px-4 py-3 text-left text-gray-dark">
              <p className="font-semibold text-navy">{control.label}</p>
              <p className="text-xs text-gray-500">{control.description}</p>
            </div>
            {["yes", "no", "partial"].map((type) => (
              <div key={type} className="flex items-center justify-center border-t border-l px-4 py-3">
                <span
                  className={`size-4 rounded-full border ${
                    control.value[type] ? "border-navy bg-navy" : "border-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <FormField label="Pembenaran (Justifikasi) terhadap Pengecualian" placeholder="Placeholder" />
      <FormField label="Ringkasan Penerapan / Pelaksanaan" placeholder="Placeholder" />
    </section>
  )
}

function FormField({ label, placeholder }) {
  const [value, setValue] = useState("")
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-dark">{label}</p>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="min-h-[110px] w-full rounded-2xl border border-[#E3E9FF] bg-[#F6F7FB] px-4 py-3 text-sm text-gray-700 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9BB2FF]"
      />
    </div>
  )
}

function RelatedDocs({ docs }) {
  return (
    <section className="rounded-2xl border border-[#2B7FFF] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-2xl bg-[#2B7FFF] px-6 py-4 text-white">
        <div>
          <p className="text-sm font-semibold">Dokumen Terkait</p>
          <p className="text-xs text-white/80">{docs.length} dokumen dipilih</p>
        </div>
        <Button className="bg-white text-[#2B7FFF] hover:bg-gray-100">
          <Plus className="mr-2 h-4 w-4" /> Tambah Dokumen Terkait
        </Button>
      </div>

      <div className="space-y-3 px-6 py-4">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#DCE8FF] bg-[#F6F9FF] px-4 py-3"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#2B7FFF]">{doc.id}</p>
              <p className="font-semibold text-navy">{doc.title}</p>
              <p className="text-xs text-gray-500">{doc.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-[#2B7FFF] hover:bg-white"
                aria-label="Lihat dokumen"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-green-500 hover:bg-white"
                aria-label="Pertahankan"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-red-500 hover:bg-white"
                aria-label="Hapus"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CommentCard({ comment, setComment }) {
  return (
    <section className="space-y-3 rounded-2xl border border-[#D8E2FF] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-navy">Komentar Reviewer</p>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Placeholder"
        className="min-h-[140px] w-full rounded-2xl border border-[#E3E9FF] bg-[#F6F7FB] p-4 text-sm text-gray-dark focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9BB2FF]"
      />
      <div className="flex justify-end">
        <Button disabled={!comment}>Simpan Komentar</Button>
      </div>
    </section>
  )
}

function ActionBar() {
  return (
    <div className="flex flex-col-reverse gap-4 rounded-2xl border border-[#D8E2FF] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <Button variant="outline" className="w-full sm:w-auto">
        ← Pertanyaan Sebelumnya
      </Button>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button className="w-full bg-green-500 text-white hover:bg-green-600 sm:w-auto">
          Simpan Jawaban
        </Button>
        <Button variant="default" className="w-full sm:w-auto">
          Pertanyaan Selanjutnya →
        </Button>
      </div>
    </div>
  )
}

function LegendCard({ documentMeta }) {
  return (
    <section className="rounded-2xl border border-[#2B67FF] bg-white text-sm text-[#1F2D56] shadow-sm">
      <div className="border-b border-[#2B67FF] px-5 py-4 space-y-2">
        <p className="font-semibold">Keterangan:</p>
        <div className="text-xs space-y-1">
          <p>Y = Ya</p>
          <p>T = Tidak</p>
          <p>S = Sebagian</p>
        </div>
      </div>
      <div className="border-b border-[#2B67FF] px-5 py-4 text-xs space-y-1">
        <p>PL = Persyaratan Legal</p>
        <p>KK = Kewajiban Kontrak</p>
        <p>PK/PB = Persyaratan Kerja / Praktek yang Baik</p>
        <p>HPR = Hasil Penilaian Risiko (Keamanan Informasi)</p>
      </div>
      <div className="px-5 py-3 text-xs">
        <p className="text-gray-500">Kategori Aktif</p>
        <p className="font-semibold text-navy">{documentMeta.category.code}</p>
      </div>
    </section>
  )
}

function Navigator({ sections, activeSection, setActiveSection, activeQuestion, setActiveQuestion }) {
  const handleToggle = (code) => {
    setActiveSection((prev) => (prev === code ? "" : code))
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#D8E2FF] bg-white p-5 text-sm shadow-sm">
      <p className="text-sm font-semibold text-navy">Navigator Pertanyaan</p>
      <div className="space-y-3">
        {sections.map((section) => {
          const expanded = section.code === activeSection || section.code === "A.5"
          return (
            <div key={section.code} className="rounded-2xl border border-[#E3E9FF] bg-[#F9FBFF]">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-navy"
                onClick={() => handleToggle(section.code)}
              >
                <span>
                  {section.code}
                  <span className="ml-2 text-sm font-normal text-gray-500">{section.title}</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded && (
                <div className="space-y-2 border-t border-[#E3E9FF] bg-white px-4 py-3">
                  {section.questions.length === 0 && (
                    <p className="text-xs text-gray-400">Belum ada pertanyaan</p>
                  )}
                  {section.questions.map((question) => (
                    <button
                      key={question.id}
                      type="button"
                      className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left text-sm ${
                        question.id === activeQuestion ? "text-navy font-semibold" : "text-gray-400"
                      }`}
                      onClick={() => {
                        setActiveSection(section.code)
                        setActiveQuestion(question.id)
                      }}
                    >
                      <span
                        className={`size-2.5 rounded-full ${
                          question.status === "complete"
                            ? "bg-gray-200"
                            : question.status === "active"
                              ? "bg-green-500"
                              : question.status === "in-progress"
                                ? "bg-gray-200" : ""
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
    </section>
  )
}
