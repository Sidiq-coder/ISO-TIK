import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Plus, Check, X, ChevronDown, ChevronRight } from "lucide-react"
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
  label: `${section.title}`,
  value: section.code,
}))

export default function ReviewJawabanSoA() {
  const controls = useMemo(() => reviewControlMatrix, [])
  const documentMeta = useMemo(
    () => getReviewMetaByTitle("SOA ISO 27001:2022 - Q1 2025"),
    [],
  )

  const [selectedCategory, setSelectedCategory] = useState(
    reviewNavigatorConfig[0]?.code ?? "",
  )

  const selectedCategoryData = useMemo(
    () => reviewNavigatorConfig.find((cat) => cat.code === selectedCategory),
    [selectedCategory],
  )

  const [selectedQuestion, setSelectedQuestion] = useState(
    selectedCategoryData?.questions[0]?.id ?? "",
  )

  // Update selected question when category changes
  useMemo(() => {
    setSelectedQuestion(selectedCategoryData?.questions[0]?.id ?? "")
  }, [selectedCategory, selectedCategoryData])

  const currentQuestion = useMemo(
    () =>
      selectedCategoryData?.questions.find((q) => q.id === selectedQuestion) ??
      selectedCategoryData?.questions[0],
    [selectedQuestion, selectedCategoryData],
  )

  const {
    controlState,
    setControlState,
    comment,
    setComment,
  } = useReviewSoA({
    defaultControlState: "no",
  })

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex flex-col gap-6">
        <PageHeader
          documentMeta={documentMeta}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryOptions={CATEGORY_OPTIONS}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <main className="space-y-6">
            <QuestionCard
              question={currentQuestion}
              categoryCode={selectedCategory}
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
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedQuestion={selectedQuestion}
              onQuestionChange={setSelectedQuestion}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}

function PageHeader({ documentMeta, selectedCategory, onCategoryChange, categoryOptions }) {
  const categoryLabel = categoryOptions.find((opt) => opt.value === selectedCategory)?.label || ""

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
            <h1 className="heading-2 text-navy">Pengisian Jawaban SOA</h1>
            <div className="space-y-1 grid grid-cols-2">
              <div>
                <p className="small text-gray-dark mb-3">Judul Dokumen</p>
                <p className="heading-4 text-blue-dark">{documentMeta.title}</p>
              </div>
              <div>
                <p className="small text-gray-dark mb-3">Kategori SoA</p>
                <p className="heading-4 text-blue-dark">
                  <span className="text-gray-light bg-blue-dark px-[8px] py-[4px] rounded-[4px] body-medium mr-4">
                    {selectedCategory}
                  </span>
                  {categoryLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuestionCard({ question, categoryCode, controls, controlState, setControlState }) {
  const [formData, setFormData] = useState({
    justification: "",
    summary: "",
  })

  if (!question) {
    return (
      <section className="rounded-2xl border border-[#DDE3F5] bg-white p-6 shadow-sm">
        <p className="text-center text-gray-500">Pilih pertanyaan untuk menampilkan detail</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl p-6 space-y-8">
      {/* Question Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-[4px] bg-blue-dark px-[8px] py-[4px] small-medium text-gray-light">
            {question.id}
          </span>
          <p className="body-bold text-navy">{question.label}</p>
        </div>
        <p className="text-navy-hover leading-relaxed body">{question.description}</p>
      </div>

     <div className="w-[811px] grid grid-cols-[117px_566px]">
       {/* Radio Options */}
      <div className="space-y-3">
        <p className="body-medium text-navy">Kendali Saat Ini</p>
        <div className="flex flex-col gap-4 body">
          {[
            { label: "Ya", value: "yes" },
            { label: "Tidak", value: "no" },
            { label: "Sebagian", value: "partial" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                className="accent-navy"
                name="control-state"
                value={option.value}
                checked={controlState === option.value}
                onChange={(event) => setControlState(event.target.value)}
              />
              <span className={controlState === option.value ? "text-navy font-medium" : "text-gray-dark"}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Aspek Kendali Table */}
      <div className="space-y-3">
        <h3 className="body-medium text-navy">Aspek Kendali / Alasan Pemilihan</h3>
        <div className="rounded-lg bg-white shadow-sm border border-[#DDE3F5] overflow-hidden">
          <div className="grid grid-cols-[1fr_60px_60px_80px] bg-blue-light text-blue-dark border-b border-[#DDE3F5]">
            <div className="body-medium border-r border-[#DDE3F5] p-3 text-left">
              Aspek Kendali
            </div>
            <div className="body-medium border-r border-[#DDE3F5] p-3 text-center text-sm">
              Dip &amp; Alasan
            </div>
            <div className="body-medium border-r border-[#DDE3F5] p-3 text-center text-sm">
              Ya
            </div>
            <div className="body-medium p-3 text-center text-sm">Tidak</div>
          </div>
          {controls.map((control, index) => (
            <div
              key={control.code}
              className={`grid grid-cols-[1fr_60px_60px_80px] border-b border-[#DDE3F5] last:border-b-0 ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFC]"
              }`}
            >
              <div className="border-r border-[#DDE3F5] p-3 text-left">
                <p className="body-bold text-navy text-xs">{control.code}</p>
                <p className="text-xs text-gray-dark">{control.label}</p>
              </div>
              <div className="border-r border-[#DDE3F5] p-3 flex justify-center">
                <input
                  type="radio"
                  name={`control-${control.code}`}
                  className="accent-navy"
                  defaultChecked={control.value.yes}
                />
              </div>
              <div className="border-r border-[#DDE3F5] p-3 flex justify-center">
                <input
                  type="radio"
                  name={`control-${control.code}`}
                  className="accent-navy"
                  defaultChecked={control.value.no}
                />
              </div>
              <div className="p-3 flex justify-center">
                <input
                  type="radio"
                  name={`control-${control.code}`}
                  className="accent-navy"
                  defaultChecked={control.value.partial}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
     </div>

      {/* Form Fields */}
      <FormField
        label="Pembenaran (Justifikasi) terhadap Pengecualian"
        placeholder="Jelaskan alasan pemilihan dan pengecualian jika ada"
        value={formData.justification}
        onChange={(value) => setFormData({ ...formData, justification: value })}
      />
      <FormField
        label="Ringkasan Penerapan / Pelaksanaan"
        placeholder="Ringkasan implementasi kontrol keamanan informasi"
        value={formData.summary}
        onChange={(value) => setFormData({ ...formData, summary: value })}
      />
    </section>
  )
}

function FormField({ label, placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="body-medium text-navy">{label}</p>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
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

function Navigator({ sections, selectedCategory, onCategoryChange, selectedQuestion, onQuestionChange }) {
  const [expandedCategory, setExpandedCategory] = useState(selectedCategory)

  // Auto expand when category changes
  useMemo(() => {
    setExpandedCategory(selectedCategory)
  }, [selectedCategory])

  const getQuestionStatus = (status) => {
    const statusStyles = {
      complete: "bg-green-light text-green",
      "in-progress": "bg-yellow-light text-yellow",
      active: "bg-blue-light text-blue",
      pending: "bg-gray-light text-gray",
    }
    return statusStyles[status] || "bg-gray-light text-gray"
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#D8E2FF] bg-white p-5 text-sm shadow-sm">
      <p className="text-sm font-semibold text-navy">Navigator Pertanyaan</p>
      <div className="space-y-2">
        {sections.map((section) => {
          const isExpanded = expandedCategory === section.code

          return (
            <div key={section.code} className="rounded-lg border border-[#E3E9FF] overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setExpandedCategory(isExpanded ? "" : section.code)
                  onCategoryChange(section.code)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 font-medium transition-colors ${
                  selectedCategory === section.code
                    ? "bg-blue-light text-blue"
                    : "bg-[#F9FBFF] text-navy hover:bg-blue-50"
                }`}
              >
                <span className="text-xs">
                  <span className="font-bold">{section.code}</span>
                  <span className="ml-1 text-gray-600 text-xs font-normal">
                    {section.label || section.title}
                  </span>
                </span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isExpanded && section.questions.length > 0 && (
                <div className="bg-white border-t border-[#E3E9FF]">
                  {section.questions.map((question) => (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => onQuestionChange(question.id)}
                      className={`w-full px-4 py-2 text-left text-xs border-b border-[#E3E9FF] last:border-b-0 transition-colors ${
                        selectedQuestion === question.id
                          ? "bg-blue-50 font-semibold text-blue"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono font-bold">{question.id}</span>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getQuestionStatus(
                            question.status,
                          )}`}
                        >
                          {question.status === "complete" && "✓"}
                          {question.status === "in-progress" && "◐"}
                          {question.status === "active" && "●"}
                          {question.status === "pending" && "○"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {isExpanded && section.questions.length === 0 && (
                <div className="bg-white border-t border-[#E3E9FF] px-3 py-2 text-center text-gray-400 text-xs">
                  Belum ada pertanyaan
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
