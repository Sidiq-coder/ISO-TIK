import { jsPDF } from '../utils/jspdf-instance';
import {
  addHeader,
  addFooter,
  addSection,
  addInfoBox,
  generateTable,
  checkNewPage,
  addText,
} from '../utils/pdfHelpers';
import { PDF_CONFIG } from '../utils/pdfConfig';

/**
 * Generate PDF untuk Data Audit
 */
export const generateAuditPDF = (auditData, options = {}) => {
  const {
    includeChecklist = true,
    includeFindings = true,
    filename = 'laporan-audit.pdf',
  } = options;

  const doc = new jsPDF({
    orientation: PDF_CONFIG.orientation,
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  // Add header
  let yPos = addHeader(
    doc,
    'Laporan Audit',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // Audit information
  yPos = addSection(doc, 'Informasi Audit', yPos);

  const auditInfo = [
    { label: 'ID Audit', value: auditData.id || '-' },
    { label: 'Nama Audit', value: auditData.name || '-' },
    { label: 'Kategori', value: auditData.kategori || '-' },
    { label: 'Aspek', value: auditData.aspek || '-' },
    {
      label: 'Tanggal Audit',
      value: auditData.date
        ? new Date(auditData.date).toLocaleDateString('id-ID')
        : '-',
    },
    { label: 'Status', value: auditData.status || '-' },
  ];

  yPos = addInfoBox(doc, auditInfo, yPos, 2);

  // Description if exists
  if (auditData.description) {
    yPos = checkNewPage(doc, yPos, 30);
    yPos += 5;
    yPos = addSection(doc, 'Deskripsi', yPos);
    yPos = addText(doc, auditData.description, yPos);
  }

  // Checklist table if included
  if (includeChecklist && auditData.checklist && auditData.checklist.length > 0) {
    yPos = checkNewPage(doc, yPos, 50);
    yPos = addSection(doc, 'Daftar Checklist', yPos);

    const columns = ['No', 'Item Checklist', 'Status', 'Keterangan'];
    const tableData = auditData.checklist.map((item, index) => [
      index + 1,
      item.item || '-',
      item.status || '-',
      item.notes || '-',
    ]);

    yPos = generateTable(doc, columns, tableData, yPos, {
      addHeaderFooter: true,
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 60 },
      },
    });
  }

  // Findings if included
  if (includeFindings && auditData.findings && auditData.findings.length > 0) {
    yPos = checkNewPage(doc, yPos, 50);
    yPos = addSection(doc, 'Temuan Audit', yPos);

    const columns = ['No', 'Temuan', 'Tingkat', 'Rekomendasi'];
    const tableData = auditData.findings.map((finding, index) => [
      index + 1,
      finding.description || '-',
      finding.severity || '-',
      finding.recommendation || '-',
    ]);

    yPos = generateTable(doc, columns, tableData, yPos, {
      addHeaderFooter: true,
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 70 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 75 },
      },
    });
  }

  // Summary
  yPos = checkNewPage(doc, yPos, 30);
  yPos += 5;
  yPos = addSection(doc, 'Ringkasan', yPos);

  const summary = [
    {
      label: 'Total Checklist',
      value: auditData.checklist?.length.toString() || '0',
    },
    {
      label: 'Checklist Selesai',
      value:
        auditData.checklist
          ?.filter(c => c.status === 'Selesai')
          .length.toString() || '0',
    },
    {
      label: 'Total Temuan',
      value: auditData.findings?.length.toString() || '0',
    },
    {
      label: 'Temuan Kritis',
      value:
        auditData.findings
          ?.filter(f => f.severity === 'Kritis')
          .length.toString() || '0',
    },
  ];

  yPos = addInfoBox(doc, summary, yPos, 2);

  // Add footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save(filename);

  return doc;
};

/**
 * Generate PDF untuk Daftar Checklist Audit
 */
export const generateChecklistPDF = (checklistData, options = {}) => {
  const { filename = 'daftar-checklist.pdf' } = options;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  let yPos = addHeader(
    doc,
    'Daftar Checklist Audit',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // Checklist table
  const columns = [
    'No',
    'Kategori',
    'Aspek',
    'Item Checklist',
    'Pertanyaan',
    'Status',
  ];

  const tableData = checklistData.map((item, index) => [
    index + 1,
    item.kategori || '-',
    item.aspek || '-',
    item.item || '-',
    item.pertanyaan || '-',
    item.status || '-',
  ]);

  yPos = generateTable(doc, columns, tableData, yPos, {
    addHeaderFooter: true,
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 60 },
      4: { cellWidth: 90 },
      5: { cellWidth: 25, halign: 'center' },
    },
  });

  // Add footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save(filename);

  return doc;
};
