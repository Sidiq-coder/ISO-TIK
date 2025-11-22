import { createPDF } from '../utils/jspdf-instance';
import {
  addHeader,
  addFooter,
  addSection,
  addInfoBox,
  generateTable,
  checkNewPage,
} from '../utils/pdfHelpers';
import { PDF_CONFIG } from '../utils/pdfConfig';

/**
 * Generate PDF untuk Data Pengguna
 */
export const generateUserPDF = async (userData, options = {}) => {
  const {
    includeRoles = true,
    includeDetails = true,
    filename = 'data-pengguna.pdf',
  } = options;

  // Create new PDF document with autoTable guaranteed
  const doc = await createPDF({
    orientation: PDF_CONFIG.orientation,
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  // Add header
  let yPos = addHeader(
    doc,
    'Data Pengguna',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // User information
  yPos = addSection(doc, 'Informasi Pengguna', yPos);

  const userInfo = [
    { label: 'ID Pengguna', value: userData.id || '-' },
    { label: 'Username', value: userData.username || '-' },
    { label: 'Nama Lengkap', value: userData.fullName || '-' },
    { label: 'Email', value: userData.email || '-' },
    { label: 'Status', value: userData.status || '-' },
    {
      label: 'Tanggal Terdaftar',
      value: userData.createdAt
        ? new Date(userData.createdAt).toLocaleDateString('id-ID')
        : '-',
    },
  ];

  yPos = addInfoBox(doc, userInfo, yPos, 2);

  // Roles table if included
  if (includeRoles && userData.roles && userData.roles.length > 0) {
    yPos = checkNewPage(doc, yPos, 40);
    yPos = addSection(doc, 'Daftar Role', yPos);

    const columns = ['No', 'Nama Role', 'Status', 'Tanggal Ditambahkan'];
    const tableData = userData.roles.map((role, index) => [
      index + 1,
      role.name || '-',
      role.status || 'Aktif',
      role.assignedAt
        ? new Date(role.assignedAt).toLocaleDateString('id-ID')
        : '-',
    ]);

    yPos = generateTable(doc, columns, tableData, yPos, {
      addHeaderFooter: true,
    });
  }

  // Add footer to last page
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  // Save PDF
  doc.save(filename);

  return doc;
};

/**
 * Generate PDF untuk Multiple Users (Tabel)
 */
export const generateUsersListPDF = async (users, options = {}) => {
  const { filename = 'daftar-pengguna.pdf', filters = {} } = options;

  const doc = await createPDF({
    orientation: 'landscape', // Landscape untuk tabel lebar
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  // Add header
  let yPos = addHeader(
    doc,
    'Daftar Pengguna',
    'Sistem Informasi Manajemen ISO-TIK'
  );

  yPos += 5;

  // Filter info if exists
  if (Object.keys(filters).length > 0) {
    const filterInfo = [];
    if (filters.status) filterInfo.push({ label: 'Status', value: filters.status });
    if (filters.role) filterInfo.push({ label: 'Role', value: filters.role });
    if (filters.search) filterInfo.push({ label: 'Pencarian', value: filters.search });

    if (filterInfo.length > 0) {
      yPos = addSection(doc, 'Filter', yPos);
      yPos = addInfoBox(doc, filterInfo, yPos, 3);
      yPos += 5;
    }
  }

  // Users table
  yPos = addSection(doc, 'Data Pengguna', yPos);

  const columns = ['No', 'Username', 'Nama Lengkap', 'Email', 'Role', 'Status'];
  const tableData = users.map((user, index) => [
    index + 1,
    user.username || '-',
    user.fullName || '-',
    user.email || '-',
    user.roles?.map(r => r.name).join(', ') || '-',
    user.status || '-',
  ]);

  yPos = generateTable(doc, columns, tableData, yPos, {
    addHeaderFooter: true,
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 30 },
      2: { cellWidth: 50 },
      3: { cellWidth: 60 },
      4: { cellWidth: 40 },
      5: { cellWidth: 20, halign: 'center' },
    },
  });

  // Summary
  yPos = checkNewPage(doc, yPos, 30);
  yPos += 5;
  yPos = addSection(doc, 'Ringkasan', yPos);

  const summary = [
    { label: 'Total Pengguna', value: users.length.toString() },
    {
      label: 'Pengguna Aktif',
      value: users.filter(u => u.status === 'Aktif').length.toString(),
    },
    {
      label: 'Pengguna Tidak Aktif',
      value: users.filter(u => u.status === 'Tidak Aktif').length.toString(),
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
