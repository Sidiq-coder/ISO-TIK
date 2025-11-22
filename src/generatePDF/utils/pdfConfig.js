/**
 * PDF Configuration
 * Global settings untuk PDF generation
 */

export const PDF_CONFIG = {
  // Page settings
  format: 'a4',
  orientation: 'portrait', // 'portrait' atau 'landscape'
  unit: 'mm',
  
  // Margins
  margins: {
    top: 20,
    right: 15,
    bottom: 20,
    left: 15,
  },
  
  // Colors (RGB format)
  colors: {
    primary: [37, 99, 235], // blue-600
    secondary: [15, 23, 42], // navy
    success: [34, 197, 94], // green-500
    danger: [239, 68, 68], // red-500
    warning: [234, 179, 8], // yellow-500
    text: {
      primary: [15, 23, 42], // navy
      secondary: [100, 116, 139], // slate-500
      light: [148, 163, 184], // slate-400
    },
    background: {
      light: [248, 250, 252], // slate-50
      medium: [241, 245, 249], // slate-100
    },
    border: [226, 232, 240], // slate-200
  },
  
  // Fonts
  fonts: {
    title: {
      size: 18,
      style: 'bold',
    },
    heading: {
      size: 14,
      style: 'bold',
    },
    subheading: {
      size: 12,
      style: 'bold',
    },
    body: {
      size: 10,
      style: 'normal',
    },
    small: {
      size: 8,
      style: 'normal',
    },
  },
  
  // Table settings
  table: {
    headStyles: {
      fillColor: [37, 99, 235], // primary blue
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [15, 23, 42],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // slate-50
    },
    styles: {
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
  },
  
  // Logo/Header settings
  header: {
    height: 25,
    logoWidth: 40,
    logoHeight: 15,
  },
  
  // Footer settings
  footer: {
    height: 15,
    fontSize: 8,
  },
};

/**
 * Helper function untuk convert hex color ke RGB
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

/**
 * Get page dimensions
 */
export const getPageDimensions = (doc) => {
  return {
    width: doc.internal.pageSize.getWidth(),
    height: doc.internal.pageSize.getHeight(),
  };
};

/**
 * Calculate content width based on margins
 */
export const getContentWidth = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  return pageWidth - PDF_CONFIG.margins.left - PDF_CONFIG.margins.right;
};
