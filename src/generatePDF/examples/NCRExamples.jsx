/**
 * Example: Implementasi PDF Export untuk Modul NCR
 */

import { useState } from 'react';
import { PDFExportButton, PDFExportDialog } from '@/generatePDF/components';
import { generateNCRPDF, generateNCRListPDF } from '@/generatePDF';

// ====================================
// CONTOH 1: Export Detail NCR
// ====================================

function NCRDetailPage({ ncrData }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleExport = (options) => {
    generateNCRPDF(ncrData, {
      filename: options.filename,
      includeFindings: options.includeFindings ?? true,
      includeResponse: options.includeResponse ?? true,
    });
  };

  return (
    <div>
      <h1>NCR: {ncrData.ncrNumber}</h1>

      <button onClick={() => setShowDialog(true)}>
        Export NCR
      </button>

      <PDFExportDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onExport={handleExport}
        title="Export NCR Report"
        description="Pilih data yang ingin disertakan"
        defaultFilename={`ncr-${ncrData.ncrNumber}.pdf`}
      >
        {(options, setOptions) => (
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeFindings ?? true}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeFindings: e.target.checked,
                  })
                }
              />
              Sertakan Daftar Temuan
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeResponse ?? true}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeResponse: e.target.checked,
                  })
                }
              />
              Sertakan Riwayat Respons
            </label>
          </div>
        )}
      </PDFExportDialog>
    </div>
  );
}

// ====================================
// CONTOH 2: Export NCR List
// ====================================

function NCRListPage({ ncrList, currentFilters }) {
  const handleExport = () => {
    generateNCRListPDF(ncrList, {
      filename: 'daftar-ncr.pdf',
      filters: currentFilters,
    });
  };

  return (
    <div>
      <h1>Daftar NCR</h1>

      <PDFExportButton
        onExport={handleExport}
        label="Export Daftar NCR"
      />

      {/* NCR table */}
      <table>
        {/* ... */}
      </table>
    </div>
  );
}

// ====================================
// CONTOH 3: Export dengan Advanced Filter
// ====================================

function NCRAdvancedExport({ ncrList }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleExport = (options) => {
    let filteredNCR = ncrList;

    // Filter by severity
    if (options.severity) {
      filteredNCR = filteredNCR.filter(
        ncr => ncr.severity === options.severity
      );
    }

    // Filter by status
    if (options.status) {
      filteredNCR = filteredNCR.filter(
        ncr => ncr.status === options.status
      );
    }

    // Filter by date range
    if (options.startDate && options.endDate) {
      filteredNCR = filteredNCR.filter(ncr => {
        const ncrDate = new Date(ncr.createdAt);
        return (
          ncrDate >= new Date(options.startDate) &&
          ncrDate <= new Date(options.endDate)
        );
      });
    }

    // Sort
    if (options.sortBy) {
      filteredNCR = [...filteredNCR].sort((a, b) => {
        if (options.sortBy === 'date') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (options.sortBy === 'severity') {
          const severityOrder = { Kritis: 1, Tinggi: 2, Sedang: 3, Rendah: 4 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return 0;
      });
    }

    generateNCRListPDF(filteredNCR, {
      filename: options.filename,
      filters: {
        severity: options.severity || 'Semua',
        status: options.status || 'Semua',
        dateRange: options.startDate && options.endDate
          ? `${options.startDate} - ${options.endDate}`
          : 'Semua',
      },
    });
  };

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>
        Export NCR dengan Filter
      </button>

      <PDFExportDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onExport={handleExport}
        title="Export Daftar NCR"
        description="Pilih filter untuk data yang akan diekspor"
        defaultFilename="ncr-filtered.pdf"
      >
        {(options, setOptions) => (
          <div className="space-y-3">
            {/* Severity filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tingkat Keparahan
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.severity || ''}
                onChange={(e) =>
                  setOptions({ ...options, severity: e.target.value })
                }
              >
                <option value="">Semua Tingkat</option>
                <option value="Kritis">Kritis</option>
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>

            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.status || ''}
                onChange={(e) =>
                  setOptions({ ...options, status: e.target.value })
                }
              >
                <option value="">Semua Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Date range */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tanggal Mulai
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={options.startDate || ''}
                onChange={(e) =>
                  setOptions({ ...options, startDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tanggal Akhir
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={options.endDate || ''}
                onChange={(e) =>
                  setOptions({ ...options, endDate: e.target.value })
                }
              />
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Urutkan Berdasarkan
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.sortBy || ''}
                onChange={(e) =>
                  setOptions({ ...options, sortBy: e.target.value })
                }
              >
                <option value="">Default</option>
                <option value="date">Tanggal (Terbaru)</option>
                <option value="severity">Tingkat Keparahan</option>
              </select>
            </div>
          </div>
        )}
      </PDFExportDialog>
    </div>
  );
}

export {
  NCRDetailPage,
  NCRListPage,
  NCRAdvancedExport,
};
