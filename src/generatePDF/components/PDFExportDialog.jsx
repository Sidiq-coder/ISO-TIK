import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileDown, Loader2 } from 'lucide-react';

/**
 * Dialog untuk export PDF dengan opsi kustomisasi
 * 
 * @param {boolean} open - Dialog open state
 * @param {Function} onOpenChange - Function untuk mengubah state
 * @param {Function} onExport - Function yang menjalankan PDF generation dengan options
 * @param {string} title - Judul dialog
 * @param {string} description - Deskripsi dialog
 * @param {Array} options - Array opsi checkbox/input untuk customize export
 */
export default function PDFExportDialog({
  open,
  onOpenChange,
  onExport,
  title = 'Export PDF',
  description = 'Pilih opsi untuk mengekspor data ke PDF',
  defaultFilename = 'dokumen.pdf',
  children,
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [filename, setFilename] = useState(defaultFilename);
  const [exportOptions, setExportOptions] = useState({});

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await onExport({
        filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
        ...exportOptions,
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // TODO: Show error notification
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Filename input */}
          <div className="space-y-2">
            <Label htmlFor="filename">Nama File</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="nama-file.pdf"
            />
          </div>

          {/* Custom options (passed as children) */}
          {children && (
            <div className="space-y-3">
              <Label>Opsi Export</Label>
              {typeof children === 'function'
                ? children(exportOptions, setExportOptions)
                : children}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
          >
            Batal
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengekspor...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
