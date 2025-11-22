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
 * Generate PDF untuk Data NCR (Non-Conformance Report)
 */
export const generateNCRPDF = (ncrData, options = {}) => {
  const {
    includeFindings = true,
    includeResponse = true,
    filename = 'laporan-ncr.pdf',
  } = options;

  const doc = new jsPDF({
    orientation: PDF_CONFIG.orientation,
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  // Add header
  let yPos = addHeader(
    doc,
    'Non-Conformance Report (NCR)',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // NCR information
  yPos = addSection(doc, 'Informasi NCR', yPos);

  const ncrInfo = [
    { label: 'No. NCR', value: ncrData.ncrNumber || '-' },
    { label: 'Judul', value: ncrData.title || '-' },
    { label: 'Status', value: ncrData.status || '-' },
    { label: 'Tingkat', value: ncrData.severity || '-' },
    {
      label: 'Tanggal Dibuat',
      value: ncrData.createdAt
        ? new Date(ncrData.createdAt).toLocaleDateString('id-ID')
        : '-',
    },
    {
      label: 'Target Selesai',
      value: ncrData.dueDate
        ? new Date(ncrData.dueDate).toLocaleDateString('id-ID')
        : '-',
    },
  ];

  yPos = addInfoBox(doc, ncrInfo, yPos, 2);

  // Description
  if (ncrData.description) {
    yPos = checkNewPage(doc, yPos, 30);
    yPos += 5;
    yPos = addSection(doc, 'Deskripsi', yPos);
    yPos = addText(doc, ncrData.description, yPos);
  }

  // Findings if included
  if (includeFindings && ncrData.findings && ncrData.findings.length > 0) {
    yPos = checkNewPage(doc, yPos, 50);
    yPos = addSection(doc, 'Daftar Temuan', yPos);

    const columns = ['No', 'Temuan', 'Kategori', 'Tanggal'];
    const tableData = ncrData.findings.map((finding, index) => [
      index + 1,
      finding.description || '-',
      finding.category || '-',
      finding.date
        ? new Date(finding.date).toLocaleDateString('id-ID')
        : '-',
    ]);

    yPos = generateTable(doc, columns, tableData, yPos, {
      addHeaderFooter: true,
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 100 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30, halign: 'center' },
      },
    });
  }

  // Root cause analysis
  if (ncrData.rootCause) {
    yPos = checkNewPage(doc, yPos, 30);
    yPos += 5;
    yPos = addSection(doc, 'Analisis Akar Masalah', yPos);
    yPos = addText(doc, ncrData.rootCause, yPos);
  }

  // Corrective action
  if (ncrData.correctiveAction) {
    yPos = checkNewPage(doc, yPos, 30);
    yPos += 5;
    yPos = addSection(doc, 'Tindakan Korektif', yPos);
    yPos = addText(doc, ncrData.correctiveAction, yPos);
  }

  // Response if included
  if (includeResponse && ncrData.responses && ncrData.responses.length > 0) {
    yPos = checkNewPage(doc, yPos, 50);
    yPos = addSection(doc, 'Riwayat Respons', yPos);

    const columns = ['Tanggal', 'Responden', 'Tindakan', 'Status'];
    const tableData = ncrData.responses.map((response) => [
      response.date
        ? new Date(response.date).toLocaleDateString('id-ID')
        : '-',
      response.responder || '-',
      response.action || '-',
      response.status || '-',
    ]);

    yPos = generateTable(doc, columns, tableData, yPos, {
      addHeaderFooter: true,
      columnStyles: {
        0: { cellWidth: 30, halign: 'center' },
        1: { cellWidth: 40 },
        2: { cellWidth: 80 },
        3: { cellWidth: 30, halign: 'center' },
      },
    });
  }

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
 * Generate PDF untuk Daftar NCR
 */
export const generateNCRListPDF = (ncrList, options = {}) => {
  const { filename = 'daftar-ncr.pdf', filters = {} } = options;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  let yPos = addHeader(
    doc,
    'Daftar Non-Conformance Report',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // Filter info if exists
  if (Object.keys(filters).length > 0) {
    const filterInfo = [];
    if (filters.status) filterInfo.push({ label: 'Status', value: filters.status });
    if (filters.severity) filterInfo.push({ label: 'Tingkat', value: filters.severity });
    if (filters.dateRange) filterInfo.push({ label: 'Periode', value: filters.dateRange });

    if (filterInfo.length > 0) {
      yPos = addSection(doc, 'Filter', yPos);
      yPos = addInfoBox(doc, filterInfo, yPos, 3);
      yPos += 5;
    }
  }

  // NCR table
  yPos = addSection(doc, 'Data NCR', yPos);

  const columns = [
    'No',
    'No. NCR',
    'Judul',
    'Tingkat',
    'Status',
    'Tanggal',
    'Target',
  ];

  const tableData = ncrList.map((ncr, index) => [
    index + 1,
    ncr.ncrNumber || '-',
    ncr.title || '-',
    ncr.severity || '-',
    ncr.status || '-',
    ncr.createdAt
      ? new Date(ncr.createdAt).toLocaleDateString('id-ID')
      : '-',
    ncr.dueDate ? new Date(ncr.dueDate).toLocaleDateString('id-ID') : '-',
  ]);

  yPos = generateTable(doc, columns, tableData, yPos, {
    addHeaderFooter: true,
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 30 },
      2: { cellWidth: 80 },
      3: { cellWidth: 25, halign: 'center' },
      4: { cellWidth: 25, halign: 'center' },
      5: { cellWidth: 30, halign: 'center' },
      6: { cellWidth: 30, halign: 'center' },
    },
  });

  // Summary
  yPos = checkNewPage(doc, yPos, 30);
  yPos += 5;
  yPos = addSection(doc, 'Ringkasan', yPos);

  const summary = [
    { label: 'Total NCR', value: ncrList.length.toString() },
    {
      label: 'NCR Terbuka',
      value: ncrList.filter(n => n.status === 'Open').length.toString(),
    },
    {
      label: 'NCR Selesai',
      value: ncrList.filter(n => n.status === 'Closed').length.toString(),
    },
    {
      label: 'NCR Kritis',
      value: ncrList.filter(n => n.severity === 'Kritis').length.toString(),
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

const formatDate = (date) => {
  if (!date) return '-';
  try {
    if (date instanceof Date) {
      return date.toLocaleDateString('id-ID');
    }
    if (typeof date === 'string') {
      const slashPattern = /^(\d{1,2})[\/](\d{1,2})[\/](\d{2,4})$/;
      const match = date.match(slashPattern);
      if (match) {
        const [, day, month, year] = match;
        const parsedYear = Number(year.length === 2 ? `20${year}` : year);
        const parsedDate = new Date(parsedYear, Number(month) - 1, Number(day));
        return parsedDate.toLocaleDateString('id-ID');
      }
    }
    return new Date(date).toLocaleDateString('id-ID');
  } catch (error) {
    return date;
  }
};

const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value];
};

const formatListContent = (value, { numbered = true, fallback = '-' } = {}) => {
  const entries = normalizeArray(value);
  if (!entries.length) return fallback;
  if (!numbered) {
    return entries.join('\n');
  }
  return entries.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
};

export const buildNCRDocumentPDF = async (ncrData, options = {}) => {
  const {
    filename = `laporan-ncr-${ncrData?.ncrNumber || ncrData?.id || 'dokumen'}.pdf`,
    autoSave = false,
  } = options;

  const prepared = {
    ncrNumber: ncrData?.ncrNumber || ncrData?.id || '-',
    pageNumber: ncrData?.pageNumber || '1',
    pageTotal: ncrData?.pageTotal || '1',
    tanggal: formatDate(ncrData?.date || ncrData?.createdAt),
    bagianLokasi: ncrData?.bagianLokasi || ncrData?.bagianTerkait || '-',
    standarReferensi: ncrData?.standarReferensi || 'STANDAR ISO : 27001:2022',
    klausul: ncrData?.klausul || '-',
    uraianKetidaksesuaian: formatListContent(
      ncrData?.uraianKetidaksesuaian || ncrData?.description,
      { fallback: 'Belum ada uraian ketidaksesuaian.' }
    ),
    kategoriTemuan: ncrData?.kategoriTemuan || ncrData?.klasifikasi || '-',
    auditor: ncrData?.auditor || ncrData?.namaAuditor || '-',
    auditee: ncrData?.auditee || ncrData?.namaAuditee || '-',
    targetPerbaikan: formatDate(ncrData?.targetPerbaikan || ncrData?.dueDate),
    analisaPenyebab: formatListContent(ncrData?.analisaPenyebab, {
      fallback: 'Belum ada analisa penyebab.',
    }),
    koreksi: formatListContent(ncrData?.koreksi, {
      fallback: 'Belum ada rencana koreksi.',
    }),
    tindakanKoreksi: formatListContent(ncrData?.tindakanKoreksi, {
      fallback: 'Belum ada tindakan koreksi.',
    }),
    verifikasiTindakan: formatListContent(ncrData?.verifikasiTindakan, {
      numbered: false,
      fallback: 'Belum ada catatan verifikasi.',
    }),
    auditorVerifier: ncrData?.auditorVerifier || ncrData?.auditor || '-',
    tglPenyelesaian: formatDate(ncrData?.tglPenyelesaian),
  };

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  const { margins } = PDF_CONFIG;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margins.left - margins.right;
  let y = margins.top;
  const startX = margins.left;

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);

  const drawInfoRow = (cells, minHeight = 12) => {
    const widths = cells.map((cell) => cell.width || contentWidth / cells.length);
    const linesPerCell = cells.map((cell, index) =>
      doc.splitTextToSize(cell.value || '-', widths[index] - 4)
    );
    const maxLines = Math.max(
      minHeight,
      ...linesPerCell.map((lines) => lines.length * 4 + 6)
    );
    const rowHeight = Math.max(minHeight, maxLines);
    let cellX = startX;

    cells.forEach((cell, index) => {
      const cellWidth = widths[index];
      doc.rect(cellX, y, cellWidth, rowHeight);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.text(cell.label, cellX + 2, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.text(linesPerCell[index], cellX + 2, y + 9);
      cellX += cellWidth;
    });

    y += rowHeight;
  };

  const drawParagraphSection = (title, content) => {
    const lines = doc.splitTextToSize(content || '-', contentWidth - 6);
    const sectionHeight = Math.max(22, lines.length * 5 + 8);
    doc.rect(startX, y, contentWidth, sectionHeight);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title, startX + 2, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(lines, startX + 2, y + 10);
    y += sectionHeight;
  };

  const drawSignatureRow = () => {
    const leftWidth = contentWidth * 0.6;
    const rightWidth = contentWidth - leftWidth;
    const rowHeight = 18;

    doc.rect(startX, y, leftWidth, rowHeight);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Nama Auditor :', startX + 2, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(prepared.auditorVerifier || '-', startX + 2, y + 11);
    doc.text('TTD', startX + leftWidth - 15, y + rowHeight - 4);

    doc.rect(startX + leftWidth, y, rightWidth, rowHeight);
    doc.setFont('helvetica', 'bold');
    doc.text('TGL. PENYELESAIAN', startX + leftWidth + 2, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(prepared.tglPenyelesaian || '-', startX + leftWidth + 2, y + 11);

    y += rowHeight;
  };

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('LAPORAN KETIDAKSESUAIAN', startX + contentWidth / 2, y, {
    align: 'center',
  });
  y += 8;

  const leftHeaderWidth = 60;
  const rightHeaderWidth = contentWidth - leftHeaderWidth;
  const headerRowHeight = 10;
  doc.rect(startX, y, leftHeaderWidth, headerRowHeight * 2);
  doc.setFontSize(11);
  doc.text('NON CONFORMITY', startX + leftHeaderWidth / 2, y + 7, {
    align: 'center',
  });
  doc.text('REPORT (NCR)', startX + leftHeaderWidth / 2, y + 16, {
    align: 'center',
  });

  const topHeaderCells = [
    { label: 'NO. NCR', value: prepared.ncrNumber },
    { label: 'HALAMAN', value: prepared.pageNumber },
    { label: 'DARI', value: prepared.pageTotal },
  ];
  const headerColWidth = rightHeaderWidth / topHeaderCells.length;
  topHeaderCells.forEach((cell, index) => {
    const cellX = startX + leftHeaderWidth + index * headerColWidth;
    doc.rect(cellX, y, headerColWidth, headerRowHeight);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(cell.label, cellX + 2, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text(`: ${cell.value || '-'}`, cellX + 2, y + 8);
  });

  const secondRowY = y + headerRowHeight;
  doc.rect(startX + leftHeaderWidth, secondRowY, rightHeaderWidth, headerRowHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('TANGGAL', startX + leftHeaderWidth + 2, secondRowY + 4);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${prepared.tanggal || '-'}`, startX + leftHeaderWidth + 2, secondRowY + 8);

  y += headerRowHeight * 2 + 4;

  drawInfoRow([
    { label: 'BAGIAN / LOKASI', value: prepared.bagianLokasi, width: contentWidth * 0.4 },
    { label: 'STANDAR REFERENSI', value: prepared.standarReferensi, width: contentWidth * 0.4 },
    { label: 'Klausul', value: prepared.klausul, width: contentWidth * 0.2 },
  ]);

  y += 4;
  drawParagraphSection('URAIAN KETIDAKSESUAIAN (diisi Auditor)', prepared.uraianKetidaksesuaian);
  y += 4;

  drawInfoRow([
    { label: 'Kategori Temuan Audit', value: prepared.kategoriTemuan, width: contentWidth },
  ], 14);

  const personnelHeight = 14;
  const halfWidth = contentWidth / 2;
  doc.rect(startX, y, halfWidth, personnelHeight);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('AUDITOR / PELAPOR', startX + 2, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nama : ${prepared.auditor}`, startX + 2, y + 9);
  doc.text('TTD', startX + halfWidth - 15, y + personnelHeight - 3);

  doc.rect(startX + halfWidth, y, halfWidth, personnelHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('AUDITEE / TERLAPOR', startX + halfWidth + 2, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nama : ${prepared.auditee}`, startX + halfWidth + 2, y + 9);
  doc.text('TTD', startX + contentWidth - 15, y + personnelHeight - 3);

  y += personnelHeight;
  doc.rect(startX, y, contentWidth, 10);
  doc.setFont('helvetica', 'bold');
  doc.text('TGL. TARGET PERBAIKAN (diisi Auditee)', startX + 2, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.text(prepared.targetPerbaikan || '-', startX + 2, y + 8);
  y += 14;

  drawParagraphSection('ANALISA PENYEBAB KETIDAKSESUAIAN (diisi Auditee)', prepared.analisaPenyebab);
  y += 4;
  drawParagraphSection('KOREKSI (diisi Auditee)', prepared.koreksi);
  y += 4;
  drawParagraphSection('TINDAKAN KOREKSI (diisi Auditee)', prepared.tindakanKoreksi);
  y += 4;

  drawSignatureRow();
  y += 4;
  drawParagraphSection('VERIFIKASI TINDAKAN PERBAIKAN (diisi Auditor)', prepared.verifikasiTindakan);
  y += 4;

  const finalRowHeight = 12;
  const colA = contentWidth * 0.3;
  const colB = contentWidth * 0.4;
  const colC = contentWidth - colA - colB;

  doc.rect(startX, y, colA, finalRowHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('AUDITOR', startX + 2, y + 7);

  doc.rect(startX + colA, y, colB, finalRowHeight);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nama : ${prepared.auditorVerifier}`, startX + colA + 2, y + 7);
  doc.text('TTD', startX + colA + colB - 15, y + 10);

  doc.rect(startX + colA + colB, y, colC, finalRowHeight);
  doc.text(`Tanggal : ${prepared.tglPenyelesaian || '-'}`, startX + colA + colB + 2, y + 7);

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, {
      align: 'center',
    });
  }

  if (autoSave) {
    doc.save(filename);
  }

  return doc;
};

export const downloadNCRDocumentPDF = async (ncrData, options = {}) => {
  const doc = await buildNCRDocumentPDF(ncrData, { ...options, autoSave: false });
  const filename = options.filename || `laporan-ncr-${ncrData?.ncrNumber || ncrData?.id || 'dokumen'}.pdf`;
  doc.save(filename);
  return doc;
};

export const getNCRDocumentPDFPreview = async (ncrData, options = {}) => {
  const doc = await buildNCRDocumentPDF(ncrData, { ...options, autoSave: false });
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const dispose = () => URL.revokeObjectURL(url);
  return { url, dispose, doc };
};

export const buildNCRCasePDFDocument = async (caseData, options = {}) => {
  const {
    autoSave = false,
    filename = `ncr-${caseData?.id || 'kasus'}.pdf`,
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  const subtitleParts = [caseData?.bagianTerkait, formatDate(caseData?.tanggal)].filter(Boolean);
  let yPos = addHeader(
    doc,
    'Formulir Laporan Ketidaksesuaian',
    subtitleParts.join(' • ')
  );

  yPos += 5;

  yPos = addSection(doc, 'Informasi Utama', yPos);

  const primaryInfo = [
    { label: 'Nomor NCR', value: caseData?.id || '-' },
    { label: 'Tanggal', value: formatDate(caseData?.tanggal) },
    { label: 'Bagian Terkait', value: caseData?.bagianTerkait || '-' },
    { label: 'Standar Referensi', value: caseData?.standarReferensi || '-' },
    { label: 'Klasifikasi', value: caseData?.klasifikasi || '-' },
    { label: 'Status', value: caseData?.status || '-' },
    { label: 'Auditor', value: caseData?.namaAuditor || '-' },
    { label: 'Auditee', value: caseData?.namaAuditee || '-' },
  ];

  yPos = addInfoBox(doc, primaryInfo, yPos, 2);

  yPos = addSection(doc, 'Uraian Ketidaksesuaian', yPos);
  yPos = addText(doc, caseData?.deskripsi || caseData?.description || 'Belum ada uraian ketidaksesuaian.', yPos);

  if (caseData?.akarMasalah || caseData?.rootCause) {
    yPos = checkNewPage(doc, yPos, 25);
    yPos = addSection(doc, 'Analisis Akar Masalah', yPos);
    yPos = addText(doc, caseData?.akarMasalah || caseData?.rootCause, yPos);
  }

  if (caseData?.tindakanKoreksi || caseData?.correctiveAction) {
    yPos = checkNewPage(doc, yPos, 25);
    yPos = addSection(doc, 'Tindakan Koreksi', yPos);
    yPos = addText(doc, caseData?.tindakanKoreksi || caseData?.correctiveAction, yPos);
  }

  if (caseData?.catatanVerifikasi) {
    yPos = checkNewPage(doc, yPos, 25);
    yPos = addSection(doc, 'Verifikasi Penutupan', yPos);
    yPos = addText(doc, caseData?.catatanVerifikasi, yPos);
  }

  if (caseData?.photoEvidence) {
    yPos = checkNewPage(doc, yPos, 70);
    yPos = addSection(doc, 'Bukti Foto', yPos);
    const contentWidth = doc.internal.pageSize.getWidth() - PDF_CONFIG.margins.left - PDF_CONFIG.margins.right;
    const imageHeight = 60;
    try {
      doc.addImage(caseData.photoEvidence, 'JPEG', PDF_CONFIG.margins.left, yPos, contentWidth, imageHeight);
      yPos += imageHeight + 8;
    } catch (error) {
      yPos = addText(doc, 'Gagal memuat foto bukti.', yPos);
    }
  }

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  if (autoSave) {
    doc.save(filename);
  }

  return doc;
};

export const downloadNCRCasePDF = async (caseData, options = {}) => {
  const { filename = `ncr-${caseData?.id || 'kasus'}.pdf` } = options;
  const doc = await buildNCRCasePDFDocument(caseData, { ...options, autoSave: false });
  doc.save(filename);
  return doc;
};

export const getNCRCasePDFPreview = async (caseData, options = {}) => {
  const doc = await buildNCRCasePDFDocument(caseData, { ...options, autoSave: false });
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const dispose = () => URL.revokeObjectURL(url);
  return { url, dispose, doc };
};
