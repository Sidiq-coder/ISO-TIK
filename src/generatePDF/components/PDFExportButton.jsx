import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';

/**
 * Reusable PDF Export Button Component
 * 
 * @param {Function} onExport - Function yang menjalankan PDF generation
 * @param {string} label - Label tombol
 * @param {string} variant - Variant button (default, outline, ghost, dll)
 * @param {string} size - Ukuran button (sm, md, lg)
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
export default function PDFExportButton({
  onExport,
  label = 'Export PDF',
  variant = 'default',
  size = 'default',
  disabled = false,
  className = '',
  showIcon = true,
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await onExport();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // TODO: Show error notification
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting}
      variant={variant}
      size={size}
      className={className}
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mengekspor...
        </>
      ) : (
        <>
          {showIcon && <FileDown className="mr-2 h-4 w-4" />}
          {label}
        </>
      )}
    </Button>
  );
}
