import React from "react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function DokumenAudit() {
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
    </div>
  );
}
