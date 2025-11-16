import { useState } from "react"
import {tableData} from "@/mocks/tableData.js"; 
import { SearchIcon, ChevronDown, Funnel, Plus, Eye, FilePen, Download, Trash2, FileText, ChevronLeft, ChevronRight} from "lucide-react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ButtonGroup,
} from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export default function DokumenSoA() {
  const [statusFilter, setStatusFilter] = useState("Semua Status")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownClicked, setIsDropdownClicked] = useState(false)
  const [DropdownstatusFilter, setIsDropdownStatusFilter] = useState("Draft")
  const [perPage, setPerpage] = useState(10)
  const [activePage, setActivePage] = useState(1)

  const filteredData =
    statusFilter === "Semua Status"
      ? tableData
      : tableData.filter((item) => item.status === statusFilter)
  const totalData = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / perPage))
  const currentPage = Math.min(activePage, totalPages)
  const startIndex = (currentPage - 1) * perPage
  const pagedData = filteredData.slice(startIndex, startIndex + perPage)
  const filterOptions = [ 
    {value: "Semua Status"},
    {value: "Draft"},
    {value: "In Progress"},
    {value: "Reviewed"},
    {value: "Approved"}
  ]
  const paginateValue = [10, 20, 50, 100];
  return (
    <div className="flex flex-wrap items-center gap-4">
      <InputGroup className="h-14 max-w-[1080px]">
        <InputGroupInput
          placeholder="Cari dokumen berdasarkan nama"
          className="bg-state text-navy placeholder:text-gray-dark"
        />
        <InputGroupAddon>
          <SearchIcon className="text-navy" />
        </InputGroupAddon>
      </InputGroup>

      <Dropdown setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} statusFilter={statusFilter} setStatusFilter={setStatusFilter} filterOptions={filterOptions} classNameButton={`w-[204px]! h-14! `} classNameDropdown={`w-[204px]!`}/>

    <OverlayForm isDropdownClicked={isDropdownClicked} setIsDropdownClicked={setIsDropdownClicked} DropdownstatusFilter={DropdownstatusFilter} setIsDropdownStatusFilter={setIsDropdownStatusFilter}/>

    <TableData data={pagedData}/>
    <Paginate
      perPage={perPage}
      onPaginateChange={(value) => {
        setPerpage(Number(value))
      }}
      paginateValue={paginateValue}
      setActivePage={setActivePage}
      activePage={currentPage}
      onPageChange={setActivePage}
      totalPages={totalPages}
      totalData={totalData}
    />
    </div>
  )
}

function Paginate({
  perPage,
  onPaginateChange,
  setActivePage,
  paginateValue,
  activePage,
  onPageChange,
  totalPages,
  totalData
}) {
  const canGoPrev = activePage > 1
  const canGoNext = activePage < totalPages

  const buildButtons = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, idx) => ({
        type: "page",
        value: idx + 1,
      }))
    }

    const buttons = [{ type: "page", value: activePage }]
    const nextPage = Math.min(activePage + 1, totalPages)

    if (!buttons.find((btn) => btn.value === nextPage)) {
      buttons.push({ type: "page", value: nextPage })
    }

    if (nextPage + 1 < totalPages) {
      buttons.push({ type: "ellipsis" })
    }

    if (!buttons.find((btn) => btn.value === totalPages)) {
      buttons.push({ type: "page", value: totalPages })
    }

    return buttons
  }
      
    return(
        <div className="flex items-center justify-between w-full  mt-6">
            <DropdownMenu>
            <div className="w-1/5">
            <div className="flex w-full">
                <span className="body text-gray-dark">Baris per halaman</span>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-navy body! w-[73px] h-[40px] flex items-center justify-between px-3 mx-2">
                  {perPage}
                  <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
              </div>
            <div className="w-full body text-gray-dark mt-2">
                Menampilkan 1 - {totalPages} dari {totalData} data
            </div>
            </div>
            <DropdownMenuContent className="text-navy">
                <DropdownMenuRadioGroup value={String(perPage)} onValueChange={onPaginateChange}>
                {paginateValue.map((value) => (
                <DropdownMenuRadioItem key={value} value={String(value)} className={`text-navy bg-gray-light focus:bg-gray-dark2`}>
                {value}
                </DropdownMenuRadioItem>
                ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
            </DropdownMenu>

            <Pagination>
            <PaginationContent>
                <PaginationItem>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[38px] h-[36px] p-0"
                    onClick={() => canGoPrev && onPageChange(activePage - 1)}
                    disabled={!canGoPrev}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                </PaginationItem>
                {buildButtons().map((item, idx) =>
                  item.type === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationLink
                        href="#"
                        className="w-[38px]! h-[36px]! body!"
                        onClick={(event) => event.preventDefault()}
                      >
                        ...
                      </PaginationLink>
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item.value}>
                      <PaginationLink
                        href="#"
                        className={`w-[38px]! h-[36px]! body!`}
                        isActive={item.value === activePage}
                        onClick={(event) => {
                          event.preventDefault()
                          onPageChange(item.value)
                        }}
                      >
                        {item.value}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[38px] h-[36px] p-0"
                    onClick={() => canGoNext && onPageChange(activePage + 1)}
                    disabled={!canGoNext}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </PaginationItem>
            </PaginationContent>
            </Pagination>

            <div className="flex items-center gap-2">
            <span className="body text-gray-dark">
                Halaman
            </span>
            <div className="flex items-center gap-2">
                <input
                id="goto-page"
                type="number"
                min={1}
                max={totalPages}
                value={activePage}
                onChange={(event) => {
                    const next = Number(event.target.value)
                    if (next >= 1 && next <= totalPages) {
                    setActivePage(next)
                    }
                }}
                className="w-16 rounded border px-2 body text-navy border-0"
                />
            </div>
            </div>
        </div>
    )
}


function Dropdown({isMenuOpen, setIsMenuOpen, statusFilter, setStatusFilter, filterOptions, classNameButton, classNameDropdown}){
    return(
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} >
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`flex ${classNameButton} cursor-pointer items-center gap-2 bg-state px-4 body! text-navy ${isMenuOpen? "border-navy shadow" : "bg-state text-navy"}`}
          >
            <Funnel className={`size-4`} />
            {statusFilter}
            <ChevronDown className={`size-4 ${isMenuOpen ? "rotate-180" : ""} transition-transform duration-200 ease-in-out`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`${classNameDropdown}`} side="bottom" align="start">
          <DropdownMenuRadioGroup
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            {filterOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} className={`body text-navy bg-gray-light focus:bg-gray-dark2`}>
              {option.value}
            </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    )
}

function OverlayForm({isDropdownClicked, setIsDropdownClicked, DropdownstatusFilter, setDropdownStatusFilter}){
    const filterOptions = [
    {value: "Draft"},
    {value: "In Progress"},
    {value: "Reviewed"},
    {value: "Approved"}
    ]

    return(
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <ButtonGroup>
            <Button type="button" className={`bg-navy! cursor-pointer text-gray-light hover:bg-navy-hover! rounded-lg! w-[233px]! h-[52px]! gap-4!`} variant="secondary"><Plus className="text-gray-light w-5! h-5!"/>Tambah Dokumen SoA</Button>
          </ButtonGroup>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] sm:max-h-[993px] mx-auto">
          <DialogHeader>
            <DialogTitle className={`text-navy heading-3`}>Tambahkan Dokumen SoA</DialogTitle>
            <DialogDescription className={`text-gray-dark small`}>
              Lengkapi form di bawah ini untuk menambah dokumen SoA baru
            </DialogDescription>
          </DialogHeader >
          <div className="grid gap-4 md:grid-cols-2 w-[536px]!">
            <div className="grid gap-3 ">
              <Label htmlFor="noDokumen">No Dokumen</Label>
              <Input id="noDokumen" name="doDokumen" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="Masukkan No Dokumen" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tanggalTerbit">Username</Label>
              <Input id="tanggalTerbit" name="tanggalTerbit" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="10/09/2005" />
            </div>
          </div>
          {/* grid-col-1 */}
          <div className="grid gap-4 w-[536px]!`">
            <div className="grid gap-3">
              <Label htmlFor="judulDokumen">Judul Dokumen</Label>
              <Input id="judulDokumen" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} name="judulDokumen" placeholder="Masukkan Judul Dokumen" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="revisi">Revisi</Label>
              <Input id="revisi" name="revisi" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="Masukkan Revisi" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="klasifikasi">Klasifikasi</Label>
              <Input id="klasifikasi" name="klasifikasi" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="Masukkan Klasifikasi" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="penyusun">Username</Label>
              <Input id="penyusun" name="penyusun" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="Masukkan Nama Penyusun" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ketuaIso">Ketua ISO</Label>
              <Input id="ketuaIso" name="ketuaIso" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="Masukkan Nama Ketua Iso" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="direktur">Direktur</Label>
              <Input id="direktur" name="direktur" className={`rounded-[4px]! transform transition-all duration-50 cursor-pointer bg-state placeholder:text-gray-dark focus:bg-gray-light focus:border-2 focus:border-navy h-12!`} placeholder="Masukkan Nama Direktur" />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Dropdown isMenuOpen={isDropdownClicked} setIsMenuOpen={setIsDropdownClicked} statusFilter={DropdownstatusFilter} setStatusFilter={setDropdownStatusFilter} filterOptions={filterOptions} classNameButton={`w-[536px]! h-12!`} classNameDropdown={`w-[536px]!`}/>
            </div>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className={`rounded-[4px]`} variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" className={`hover:bg-navy-hover! rounded-[4px]`}>Simpan Dokumen</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    )
}

function TableData({ data = tableData }){
    const rows = data && data.length ? data : []
    return(
    <div className="border-2 rounded-t-xl relative w-full overflow-x-auto">
    <Table>
    <TableHeader className={`bg-state`}>
        <TableRow>
        <TableHead className="text-left text-navy py-3 body-medium">No Dokumen</TableHead>
        <TableHead className={`text-left text-navy-hover py-3 body-medium`}>Judul</TableHead>
        <TableHead className={`text-center text-navy-hover py-3 body-medium`}>Tanggal Terbit</TableHead>
        <TableHead className={`text-center text-navy-hover py-3 body-medium`}>Penyusun</TableHead>
        <TableHead className={`text-center text-navy-hover py-3 body-medium`}>Ketua ISO</TableHead>
        <TableHead className={`text-center text-navy-hover py-3 body-medium`}>Direktur</TableHead>
        <TableHead className={`text-center text-navy-hover py-3 body-medium`}>Status</TableHead>
        <TableHead className={`text-center text-navy-hover py-3 body-medium`}>Aksi</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="text-center body text-gray-dark py-6">
            Tidak ada data
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row) => (
            <TableRow key={`${row.noDoc}-${row.revisi}`}>
              <TableCell className="body text-navy text-left">{row.noDoc}</TableCell>
              <TableCell className={`body text-left`}>{row.judul}</TableCell>
              <TableCell className="body text-center">{row.tanggalTerbit}</TableCell>
              <TableCell className="body text-center">{row.penyusun}</TableCell>
              <TableCell className="body text-center">{row.ketuaIso}</TableCell>
              <TableCell className="body text-center">{row.direktur}</TableCell>
              <TableCell className={`body text-center`}>{row.status}</TableCell>
              <TableCell className={`body flex justify-center gap-2`}>
                <Eye className="text-[#121A2E] w-5 h-5 cursor-pointer"/> <FilePen className="text-[#2B7FFF] w-5 h-5 cursor-pointer"/> <FileText className="text-[#00C950] w-5 h-5 cursor-pointer"/> <Download className="text-[#F1C441] w-5 h-5 cursor-pointer"/> <Trash2 className="text-[#FB2C36] w-5 h-5 cursor-pointer"/>
              </TableCell>
            </TableRow>
          ))
      )}1
    </TableBody>
    </Table>
    </div>
    )
}

function AlertIcon({noDoc, judul, tanggalTerbit, penyusun, ketuaIso, direktur, status}){
  return(
    <div>
      alert icon
    </div>
  )
}
