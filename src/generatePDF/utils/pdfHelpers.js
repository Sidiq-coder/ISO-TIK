import { jsPDF } from './jspdf-instance';
import autoTable from 'jspdf-autotable';
import { PDF_CONFIG, getPageDimensions, getContentWidth } from './pdfConfig';

/**
 * Add header to PDF
 */
export const addHeader = (doc, title, subtitle = '') => {
  const { width } = getPageDimensions(doc);
  const { margins, colors, fonts, header } = PDF_CONFIG;
  
  let yPos = margins.top;
  
  // Add logo/icon area (placeholder untuk logo)
  doc.setFillColor(...colors.primary);
  doc.rect(margins.left, yPos - 5, 8, 8, 'F');
  
  // Add title
  doc.setFontSize(fonts.title.size);
  doc.setFont('helvetica', fonts.title.style);
  doc.setTextColor(...colors.text.primary);
  doc.text(title, margins.left + 12, yPos);
  
  // Add subtitle if provided
  if (subtitle) {
    yPos += 6;
    doc.setFontSize(fonts.body.size);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.text.secondary);
    doc.text(subtitle, margins.left + 12, yPos);
  }
  
  // Add horizontal line
  yPos += 5;
  doc.setDrawColor(...colors.border);
  doc.setLineWidth(0.5);
  doc.line(margins.left, yPos, width - margins.right, yPos);
  
  return yPos + 5; // Return position after header
};

/**
 * Add footer with page number
 */
export const addFooter = (doc, pageNumber, totalPages) => {
  const { width, height } = getPageDimensions(doc);
  const { margins, colors, fonts, footer } = PDF_CONFIG;
  
  const yPos = height - margins.bottom + 5;
  
  // Add horizontal line
  doc.setDrawColor(...colors.border);
  doc.setLineWidth(0.5);
  doc.line(margins.left, yPos, width - margins.right, yPos);
  
  // Add page number
  doc.setFontSize(fonts.small.size);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.text.secondary);
  
  const text = `Halaman ${pageNumber} dari ${totalPages}`;
  const textWidth = doc.getTextWidth(text);
  doc.text(text, width - margins.right - textWidth, yPos + 5);
  
  // Add generated date
  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Dicetak: ${date}`, margins.left, yPos + 5);
};

/**
 * Add section with title
 */
export const addSection = (doc, title, yPos) => {
  const { colors, fonts } = PDF_CONFIG;
  const contentWidth = getContentWidth(doc);
  
  // Add section title
  doc.setFontSize(fonts.heading.size);
  doc.setFont('helvetica', fonts.heading.style);
  doc.setTextColor(...colors.text.primary);
  doc.text(title, PDF_CONFIG.margins.left, yPos);
  
  // Add underline
  const titleWidth = doc.getTextWidth(title);
  yPos += 1;
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.8);
  doc.line(PDF_CONFIG.margins.left, yPos, PDF_CONFIG.margins.left + titleWidth, yPos);
  
  return yPos + 6; // Return position after section title
};

/**
 * Add info box with key-value pairs
 */
export const addInfoBox = (doc, data, yPos, columns = 2) => {
  const { margins, colors, fonts } = PDF_CONFIG;
  const contentWidth = getContentWidth(doc);
  const columnWidth = contentWidth / columns;
  
  // Background box
  const boxHeight = Math.ceil(data.length / columns) * 8 + 6;
  doc.setFillColor(...colors.background.light);
  doc.rect(margins.left, yPos - 3, contentWidth, boxHeight, 'F');
  
  // Border
  doc.setDrawColor(...colors.border);
  doc.setLineWidth(0.1);
  doc.rect(margins.left, yPos - 3, contentWidth, boxHeight);
  
  // Add data
  doc.setFontSize(fonts.body.size);
  let currentX = margins.left + 3;
  let currentY = yPos + 2;
  let itemCount = 0;
  
  data.forEach((item) => {
    // Label
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.text.secondary);
    doc.text(item.label + ':', currentX, currentY);
    
    // Value
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.text.primary);
    const labelWidth = doc.getTextWidth(item.label + ': ');
    doc.text(item.value, currentX + labelWidth, currentY);
    
    itemCount++;
    
    // Move to next column or row
    if (itemCount % columns === 0) {
      currentX = margins.left + 3;
      currentY += 6;
    } else {
      currentX += columnWidth;
    }
  });
  
  return yPos + boxHeight + 5; // Return position after info box
};

/**
 * Add simple text with word wrap
 */
export const addText = (doc, text, yPos, options = {}) => {
  const {
    fontSize = PDF_CONFIG.fonts.body.size,
    fontStyle = 'normal',
    color = PDF_CONFIG.colors.text.primary,
    align = 'left',
    maxWidth = null,
  } = options;
  
  const contentWidth = maxWidth || getContentWidth(doc);
  
  doc.setFontSize(fontSize);
  doc.setFont('helvetica', fontStyle);
  doc.setTextColor(...color);
  
  const lines = doc.splitTextToSize(text, contentWidth);
  doc.text(lines, PDF_CONFIG.margins.left, yPos, { align });
  
  const lineHeight = fontSize * 0.5;
  return yPos + (lines.length * lineHeight) + 5;
};

/**
 * Add badge/status indicator
 */
export const addBadge = (doc, text, x, y, type = 'default') => {
  const { colors, fonts } = PDF_CONFIG;
  
  // Define badge colors
  const badgeColors = {
    default: colors.text.secondary,
    success: colors.success,
    danger: colors.danger,
    warning: colors.warning,
    primary: colors.primary,
  };
  
  const bgColor = badgeColors[type] || badgeColors.default;
  
  doc.setFontSize(fonts.small.size);
  doc.setFont('helvetica', 'bold');
  
  const textWidth = doc.getTextWidth(text);
  const padding = 2;
  const badgeWidth = textWidth + (padding * 2);
  const badgeHeight = 5;
  
  // Background
  doc.setFillColor(...bgColor);
  doc.roundedRect(x, y - 3, badgeWidth, badgeHeight, 1, 1, 'F');
  
  // Text
  doc.setTextColor(255, 255, 255);
  doc.text(text, x + padding, y);
};

/**
 * Check if need new page
 */
export const checkNewPage = (doc, currentY, requiredSpace = 30) => {
  const { height } = getPageDimensions(doc);
  const { margins } = PDF_CONFIG;
  
  if (currentY + requiredSpace > height - margins.bottom - 10) {
    doc.addPage();
    return margins.top + 10; // Return new Y position
  }
  
  return currentY;
};

/**
 * Add image (base64 or URL)
 */
export const addImage = (doc, imageData, x, y, width, height, format = 'PNG') => {
  try {
    doc.addImage(imageData, format, x, y, width, height);
    return true;
  } catch (error) {
    console.error('Error adding image:', error);
    return false;
  }
};

/**
 * Generate table with auto-table
 */
export const generateTable = (doc, columns, data, startY, options = {}) => {
  const { margins, table } = PDF_CONFIG;
  
  autoTable(doc, {
    startY,
    head: [columns],
    body: data,
    margin: { left: margins.left, right: margins.right },
    tableWidth: options.tableWidth ?? 'auto',
    headStyles: {
      ...table.headStyles,
      ...options.headStyles,
    },
    bodyStyles: {
      ...table.bodyStyles,
      overflow: 'linebreak',
      cellWidth: 'auto',
      ...options.bodyStyles,
    },
    alternateRowStyles: {
      ...table.alternateRowStyles,
      ...options.alternateRowStyles,
    },
    styles: {
      ...table.styles,
      overflow: 'linebreak',
      cellWidth: 'auto',
      ...options.styles,
    },
    columnStyles: options.columnStyles || {},
    didDrawPage: (data) => {
      // Add header and footer on each page
      if (options.addHeaderFooter) {
        const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
        addFooter(doc, pageNumber, doc.internal.getNumberOfPages());
      }
    },
    ...options,
  });
  
  return doc.lastAutoTable.finalY + 10; // Return position after table
};
