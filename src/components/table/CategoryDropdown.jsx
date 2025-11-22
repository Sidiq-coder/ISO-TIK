import { useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CategoryDropdown({
  value,
  onChange,
  options = [],
  isMenuOpen,
  setIsMenuOpen,
}) {
  const label = useMemo(() => options.find((opt) => opt.value === value)?.value ?? value, [options, value])

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-[56px] w-[260px] items-center justify-between gap-2 rounded-lg border border-[#E3E9FF] bg-state px-4 text-sm font-medium text-navy"
        >
          <span>{label}</span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[260px]">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} className="body text-navy">
              {option.value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
