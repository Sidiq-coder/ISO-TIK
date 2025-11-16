import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NCRDetailModal({ isOpen, onClose, ncrData }) {
  const navigate = useNavigate();

  const handleViewCases = () => {
    onClose();
    navigate(`/admin/ncr/${ncrData.id}/kasus`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy mb-2">
            Detail Dokumen NCR
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-dark">
            Informasi lengkap mengenai dokumen NCR yang dipilih
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <p className="text-sm text-gray-dark mb-1">Judul Dokumen</p>
            <h3 className="text-lg font-semibold text-navy">{ncrData.title}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-dark mb-1">Tanggal Dibuat</p>
            <p className="text-base text-navy">{ncrData.date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-dark mb-1">Deskripsi</p>
            <p className="text-base text-navy leading-relaxed">
              {ncrData.description}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleViewCases}
            className="h-12 px-6 bg-navy text-white hover:bg-navy-hover"
          >
            Lihat Kasus NCR
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
