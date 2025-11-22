/**
 * Example: Implementasi PDF Export untuk Modul Audit
 */

import { useState } from 'react';
import { PDFExportButton, PDFExportDialog } from '@/generatePDF/components';
import {
  generateAuditPDF,
  generateChecklistPDF,
} from '@/generatePDF';

// ====================================
// CONTOH 1: Export Detail Audit
// ====================================

function AuditDetailPage({ auditData }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleExport = (options) => {
    generateAuditPDF(auditData, {
      filename: options.filename,
      includeChecklist: options.includeChecklist ?? true,
      includeFindings: options.includeFindings ?? true,
    });
  };

  return (
    <div>
      <h1>Laporan Audit: {auditData.name}</h1>

      <button onClick={() => setShowDialog(true)}>
        Export Laporan
      </button>

      <PDFExportDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onExport={handleExport}
        title="Export Laporan Audit"
        description="Pilih data yang ingin disertakan"
        defaultFilename={`audit-${auditData.id}.pdf`}
      >
        {(options, setOptions) => (
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeChecklist ?? true}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeChecklist: e.target.checked,
                  })
                }
              />
              Sertakan Daftar Checklist
            </label>
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
              Sertakan Temuan Audit
            </label>
          </div>
        )}
      </PDFExportDialog>
    </div>
  );
}

// ====================================
// CONTOH 2: Export Checklist Audit
// ====================================

function ChecklistAuditPage({ checklistData }) {
  const handleExport = () => {
    generateChecklistPDF(checklistData, {
      filename: 'daftar-checklist-audit.pdf',
    });
  };

  return (
    <div>
      <h1>Daftar Checklist Audit</h1>

      <PDFExportButton
        onExport={handleExport}
        label="Export Checklist"
      />

      {/* Checklist table */}
      <table>
        {/* ... */}
      </table>
    </div>
  );
}

// ====================================
// CONTOH 3: Export dengan Filter
// ====================================

function AuditListWithFilter({ audits }) {
  const [showDialog, setShowDialog] = useState(false);
  const [filters, setFilters] = useState({});

  const handleExport = (options) => {
    let filteredAudits = audits;

    // Apply filters
    if (options.kategori) {
      filteredAudits = filteredAudits.filter(
        a => a.kategori === options.kategori
      );
    }

    if (options.status) {
      filteredAudits = filteredAudits.filter(
        a => a.status === options.status
      );
    }

    if (options.dateRange) {
      // Filter by date range
      const [start, end] = options.dateRange.split(' - ');
      filteredAudits = filteredAudits.filter(a => {
        const auditDate = new Date(a.date);
        return auditDate >= new Date(start) && auditDate <= new Date(end);
      });
    }

    // Generate PDF for each audit or combined list
    if (options.exportType === 'individual') {
      filteredAudits.forEach(audit => {
        generateAuditPDF(audit, {
          filename: `audit-${audit.id}.pdf`,
        });
      });
    } else {
      // Create combined report
      // (You'd need to create a generator for this)
      console.log('Combined report not implemented yet');
    }
  };

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>
        Export Audit
      </button>

      <PDFExportDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onExport={handleExport}
        title="Export Data Audit"
        description="Pilih filter dan opsi export"
        defaultFilename="audit-report.pdf"
      >
        {(options, setOptions) => (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Kategori
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.kategori || ''}
                onChange={(e) =>
                  setOptions({ ...options, kategori: e.target.value })
                }
              >
                <option value="">Semua Kategori</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>

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
                <option value="Draft">Draft</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tipe Export
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.exportType || 'individual'}
                onChange={(e) =>
                  setOptions({ ...options, exportType: e.target.value })
                }
              >
                <option value="individual">Individual Files</option>
                <option value="combined">Combined Report</option>
              </select>
            </div>
          </div>
        )}
      </PDFExportDialog>
    </div>
  );
}

export {
  AuditDetailPage,
  ChecklistAuditPage,
  AuditListWithFilter,
};
