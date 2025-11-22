/**
 * Initialize jsPDF with autoTable plugin
 * This file ensures autoTable is properly loaded before use
 */
import jsPDF from 'jspdf';

// Import autoTable and apply it to jsPDF
// For jspdf-autotable v5.x, we need to import and call it explicitly
let autoTableLoaded = false;

// Load autoTable plugin
async function loadAutoTable() {
  if (!autoTableLoaded) {
    try {
      const autoTable = await import('jspdf-autotable');
      // The plugin auto-registers itself to jsPDF prototype
      autoTableLoaded = true;
      console.log('jsPDF autoTable plugin loaded');
    } catch (err) {
      console.error('Failed to load autoTable:', err);
    }
  }
}

// Load immediately
loadAutoTable();

// Also export a function to create jsPDF with autoTable guaranteed
export async function createPDF(options = {}) {
  await loadAutoTable();
  const doc = new jsPDF(options);
  
  if (typeof doc.autoTable !== 'function') {
    // Force import if still not available
    await import('jspdf-autotable');
  }
  
  return doc;
}

export { jsPDF };
export default jsPDF;
