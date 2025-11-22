import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';

export const PDFPreviewDialog = ({
  open,
  onOpenChange,
  title = 'Pratinjau PDF',
  previewBuilder,
  onDownload,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const disposeRef = useRef(null);

  const cleanup = useCallback(() => {
    if (disposeRef.current) {
      disposeRef.current();
      disposeRef.current = null;
    }
    setPreviewUrl(null);
    setError(null);
  }, []);

  const loadPreview = useCallback(async () => {
    if (!previewBuilder) return;
    setIsLoading(true);
    setError(null);
    try {
      cleanup();
      const result = await previewBuilder();
      if (result?.url) {
        setPreviewUrl(result.url);
        disposeRef.current = result.dispose;
      } else {
        setError('Gagal membuat pratinjau.');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat membuat pratinjau.');
    } finally {
      setIsLoading(false);
    }
  }, [previewBuilder, cleanup]);

  useEffect(() => {
    if (open && previewBuilder) {
      loadPreview();
    }
    if (!open) {
      cleanup();
    }
  }, [open, previewBuilder, loadPreview, cleanup]);

  const handleDownload = async () => {
    if (!onDownload) return;
    try {
      await onDownload();
      onOpenChange?.(false);
    } catch (err) {
      setError(err.message || 'Gagal mengunduh PDF.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 border rounded bg-muted overflow-hidden">
          {isLoading && (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Membuat pratinjau...
            </div>
          )}
          {!isLoading && error && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-3 p-6 text-center">
              <p>{error}</p>
              <Button variant="outline" size="sm" onClick={loadPreview}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba lagi
              </Button>
            </div>
          )}
          {!isLoading && !error && previewUrl && (
            <iframe title="PDF Preview" src={previewUrl} className="w-full h-full border-0" />
          )}
          {!isLoading && !error && !previewUrl && (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Tidak ada data untuk ditampilkan.
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 justify-between sm:justify-between">
          <Button variant="outline" onClick={loadPreview} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Muat ulang
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange?.(false)}>
              Tutup
            </Button>
            <Button onClick={handleDownload} disabled={isLoading || !onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Unduh PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
