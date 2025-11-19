import { useMemo, useState } from "react"
import { NavLink } from "react-router-dom"
import { SearchIcon, Plus, ChevronDown } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { ChecklistCard } from "@/components/admin/audit/ChecklistCard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext"
import { reviewNavigatorConfig } from "@/mocks/reviewSoAData"
import { PaginateControls } from "@/components/admin/table"

const PAGINATE_OPTIONS = [10, 20, 50]

function buildItems() {
  const fallbackDescription =
    "Has management defined and approved a set of policies for information security?"
  return reviewNavigatorConfig.flatMap((section, sectionIndex) =>
    section.questions.map((question, index) => ({
      id: question.id ?? `${section.code}-${index + 1}`,
      code: question.id ?? `${section.code}.${index + 1}`,
      title: question.label,
      description: question.description ?? fallbackDescription,
      sectionCode: section.code,
      sectionLabel: section.label ?? section.title ?? `Kategori ${sectionIndex + 1}`,
    })),
  )
}

export default function KategoriSoA() {
  const { setHeader } = useAdminLayout()
  const allItems = useMemo(() => buildItems(), [])
  const [searchValue, setSearchValue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [perPage, setPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || item.sectionCode === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [allItems, searchValue, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage))
  const pagedItems = useMemo(() => {
    const startIndex = (activePage - 1) * perPage
    return filteredItems.slice(startIndex, startIndex + perPage)
  }, [filteredItems, activePage, perPage])

  const handlePaginateChange = (value) => {
    setPerPage(Number(value))
    setActivePage(1)
  }

  const categoryOptions = [
    { label: "Semua Kategori", value: "all" },
    ...reviewNavigatorConfig.map((section) => ({
      label: `${section.code} - ${section.label ?? section.title ?? "Kategori"}`,
      value: section.code,
    })),
  ]

  return (
    <div className="space-y-6">
    
      <div className="flex flex-wrap items-center gap-4 rounded-2xl p-4">
        <InputGroup className="h-12 flex-1">
          <InputGroupInput
            placeholder="Cari kategori berdasarkan nama"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value)
              setActivePage(1)
            }}
            className="bg-state text-navy placeholder:text-gray-dark"
          />
          <InputGroupAddon>
            <SearchIcon className="text-navy" />
          </InputGroupAddon>
        </InputGroup>

        
        <Button className="h-12 gap-2 bg-navy text-white hover:bg-navy-hover">
          <Plus className="h-5 w-5" /> Tambah Pertanyaan
        </Button>
      </div>

      <div className="space-y-4">
        {pagedItems.map((item) => (
          <ChecklistCard
            key={item.id}
            badge={item.code}
            title={item.title}
            description={item.description}
            
            onView={() => console.log("Lihat", item)}
            onDelete={() => console.log("Hapus", item)}
          />
        ))}
        {pagedItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            Tidak ada kategori sesuai pencarian
          </div>
        )}
      </div>

      <PaginateControls
        perPage={perPage}
        onPaginateChange={handlePaginateChange}
        paginateValue={PAGINATE_OPTIONS}
        setActivePage={setActivePage}
        activePage={activePage}
        onPageChange={setActivePage}
        totalPages={totalPages}
        totalData={filteredItems.length}
      />
    </div>
  )
}

function TabNavigation() {
  const tabs = [
    { label: "Dokumen SoA", to: "/admin/soa/dokumen" },
    { label: "Kategori SOA", to: "/admin/soa/kategori" },
    { label: "Pertanyaan SOA", to: "/admin/soa/pertanyaan" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `rounded-xl px-5 py-2 text-sm font-semibold ${
              isActive ? "bg-white text-navy shadow-sm border border-[#E1E6F4]" : "text-gray-500"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}
