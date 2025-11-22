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
 * Generate PDF untuk Data SoA (Statement of Applicability)
 */
export const generateSoAPDF = (soaData, options = {}) => {
  const {
    includeQuestions = true,
    includeAnswers = true,
    filename = 'laporan-soa.pdf',
  } = options;

  const doc = new jsPDF({
    orientation: PDF_CONFIG.orientation,
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  // Add header
  let yPos = addHeader(
    doc,
    'Statement of Applicability (SoA)',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // SoA information
  yPos = addSection(doc, 'Informasi SoA', yPos);

  const soaInfo = [
    { label: 'ID SoA', value: soaData.id || '-' },
    { label: 'Kategori', value: soaData.kategori || '-' },
    { label: 'Status', value: soaData.status || '-' },
    {
      label: 'Tanggal Dibuat',
      value: soaData.createdAt
        ? new Date(soaData.createdAt).toLocaleDateString('id-ID')
        : '-',
    },
    {
      label: 'Terakhir Diperbarui',
      value: soaData.updatedAt
        ? new Date(soaData.updatedAt).toLocaleDateString('id-ID')
        : '-',
    },
  ];

  yPos = addInfoBox(doc, soaInfo, yPos, 2);

  // Questions and answers
  if (
    includeQuestions &&
    soaData.questions &&
    soaData.questions.length > 0
  ) {
    yPos = checkNewPage(doc, yPos, 50);
    yPos = addSection(doc, 'Daftar Pertanyaan', yPos);

    const columns = ['No', 'Pertanyaan', 'Jawaban', 'Status'];
    const tableData = soaData.questions.map((q, index) => [
      index + 1,
      q.question || '-',
      includeAnswers ? (q.answer || 'Belum dijawab') : '-',
      q.status || '-',
    ]);

    yPos = generateTable(doc, columns, tableData, yPos, {
      addHeaderFooter: true,
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 60 },
        3: { cellWidth: 30, halign: 'center' },
      },
    });
  }

  // Summary
  yPos = checkNewPage(doc, yPos, 30);
  yPos += 5;
  yPos = addSection(doc, 'Ringkasan', yPos);

  const summary = [
    {
      label: 'Total Pertanyaan',
      value: soaData.questions?.length.toString() || '0',
    },
    {
      label: 'Sudah Dijawab',
      value:
        soaData.questions
          ?.filter(q => q.answer)
          .length.toString() || '0',
    },
    {
      label: 'Belum Dijawab',
      value:
        soaData.questions
          ?.filter(q => !q.answer)
          .length.toString() || '0',
    },
    {
      label: 'Progress',
      value: soaData.questions?.length
        ? `${Math.round((soaData.questions.filter(q => q.answer).length / soaData.questions.length) * 100)}%`
        : '0%',
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
 * Generate PDF untuk Daftar Kategori SoA
 */
export const generateSoACategoryPDF = (categories, options = {}) => {
  const { filename = 'kategori-soa.pdf' } = options;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  let yPos = addHeader(
    doc,
    'Daftar Kategori SoA',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // Category table
  const columns = [
    'No',
    'Kode',
    'Nama Kategori',
    'Jumlah Pertanyaan',
    'Status',
  ];

  const tableData = categories.map((cat, index) => [
    index + 1,
    cat.code || '-',
    cat.name || '-',
    cat.questionCount?.toString() || '0',
    cat.status || '-',
  ]);

  yPos = generateTable(doc, columns, tableData, yPos, {
    addHeaderFooter: true,
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 30 },
      2: { cellWidth: 120 },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 30, halign: 'center' },
    },
  });

  // Summary
  yPos = checkNewPage(doc, yPos, 30);
  yPos += 5;
  yPos = addSection(doc, 'Ringkasan', yPos);

  const totalQuestions = categories.reduce(
    (sum, cat) => sum + (cat.questionCount || 0),
    0
  );

  const summary = [
    { label: 'Total Kategori', value: categories.length.toString() },
    { label: 'Total Pertanyaan', value: totalQuestions.toString() },
    {
      label: 'Kategori Aktif',
      value: categories.filter(c => c.status === 'Aktif').length.toString(),
    },
  ];

  yPos = addInfoBox(doc, summary, yPos, 3);

  // Add footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save(filename);

  return doc;
};
