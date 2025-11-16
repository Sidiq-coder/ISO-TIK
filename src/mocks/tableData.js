
const tableData = [
  {
    "noDoc": "DOC-IT-01",
    "judul": "SOA ISO 27001:2022 - Q1 2025",
    "revisi": "Rev. 05",
    "direktur": "Robert Johnson",
    "status": "In Progresss",
    "tanggalTerbit": "15/1/20251"
  },
  {
    "noDoc": "DOC-IT-05",
    "judul": "SoA Risiko Infrastruktur 2025",
    "revisi": "Rev. 01",
    "klasifikasi": "Rahasia",
    "penyusun": "Divisi Infrastruktur",
    "ketuaIso": "Nadia Putri",
    "direktur": "Robert Johnson",
    "status": "Draft",
    "tanggalTerbit": "02/02/2025"
  },
  {
    "noDoc": "DOC-IT-06",
    "judul": "SoA Layanan Digital Semester 1",
    "revisi": "Rev. 02",
    "klasifikasi": "Internal",
    "penyusun": "Tim Layanan Digital",
    "ketuaIso": "Nadia Putri",
    "direktur": "Robert Johnson",
    "status": "In Progress",
    "tanggalTerbit": "10/02/2025"
  },
  {
    "noDoc": "DOC-IT-07",
    "judul": "SoA Proyek ERP",
    "revisi": "Rev. 04",
    "klasifikasi": "Publik",
    "penyusun": "Divisi Proyek Khusus",
    "ketuaIso": "Nadia Putri",
    "direktur": "Linda Pratama",
    "status": "Reviewed",
    "tanggalTerbit": "18/02/2025"
  },
  {
    "noDoc": "DOC-IT-08",
    "judul": "SoA Integrasi Data Center",
    "revisi": "Rev. 01",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim Infrastruktur",
    "ketuaIso": "Nadia Putri",
    "direktur": "Linda Pratama",
    "status": "Approved",
    "tanggalTerbit": "24/02/2025"
  },
  {
    "noDoc": "DOC-IT-09",
    "judul": "SoA Audit Keamanan 2024",
    "revisi": "Rev. 05",
    "klasifikasi": "Rahasia",
    "penyusun": "John Doe",
    "ketuaIso": "Jane Smith",
    "direktur": "Robert Johnson",
    "status": "Approved",
    "tanggalTerbit": "14/12/2024"
  },
  {
    "noDoc": "DOC-IT-10",
    "judul": "SoA Pengembangan Aplikasi Mobile",
    "revisi": "Rev. 02",
    "klasifikasi": "Internal",
    "penyusun": "Tim Mobile",
    "ketuaIso": "Jane Smith",
    "direktur": "Robert Johnson",
    "status": "Reviewed",
    "tanggalTerbit": "03/01/2025"
  },
  {
    "noDoc": "DOC-IT-11",
    "judul": "SoA Pengadaan Perangkat",
    "revisi": "Rev. 03",
    "klasifikasi": "Publik",
    "penyusun": "Divisi Pengadaan",
    "ketuaIso": "Jane Smith",
    "direktur": "Robert Johnson",
    "status": "Draft",
    "tanggalTerbit": "05/01/2025"
  },
  {
    "noDoc": "DOC-IT-12",
    "judul": "SoA Disaster Recovery Plan",
    "revisi": "Rev. 02",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim Keamanan Informasi",
    "ketuaIso": "Jane Smith",
    "direktur": "Linda Pratama",
    "status": "In Progress",
    "tanggalTerbit": "09/01/2025"
  },
  {
    "noDoc": "DOC-IT-13",
    "judul": "SoA Pengelolaan Vendor 2025",
    "revisi": "Rev. 01",
    "klasifikasi": "Publik",
    "penyusun": "Divisi Vendor",
    "ketuaIso": "Arif Rahman",
    "direktur": "Linda Pratama",
    "status": "Reviewed",
    "tanggalTerbit": "15/01/2025"
  },
  {
    "noDoc": "DOC-IT-14",
    "judul": "SoA Kebijakan Akses",
    "revisi": "Rev. 06",
    "klasifikasi": "Internal",
    "penyusun": "Divisi Kebijakan",
    "ketuaIso": "Arif Rahman",
    "direktur": "Linda Pratama",
    "status": "Approved",
    "tanggalTerbit": "20/01/2025"
  },
  {
    "noDoc": "DOC-IT-15",
    "judul": "SoA Monitoring Jaringan",
    "revisi": "Rev. 03",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim NOC",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Draft",
    "tanggalTerbit": "22/01/2025"
  },
  {
    "noDoc": "DOC-IT-16",
    "judul": "SoA Implementasi SSO",
    "revisi": "Rev. 02",
    "klasifikasi": "Internal",
    "penyusun": "Tim Identity",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "In Progress",
    "tanggalTerbit": "25/01/2025"
  },
  {
    "noDoc": "DOC-IT-17",
    "judul": "SoA Audit Infrastruktur Cloud",
    "revisi": "Rev. 01",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim Cloud",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Reviewed",
    "tanggalTerbit": "28/01/2025"
  },
  {
    "noDoc": "DOC-IT-18",
    "judul": "SoA Project Phoenix",
    "revisi": "Rev. 04",
    "klasifikasi": "Publik",
    "penyusun": "PMO",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Approved",
    "tanggalTerbit": "30/01/2025"
  },
  {
    "noDoc": "DOC-IT-19",
    "judul": "SoA Peninjauan Kebijakan 2025",
    "revisi": "Rev. 03",
    "klasifikasi": "Internal",
    "penyusun": "Divisi Kebijakan",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Reviewed",
    "tanggalTerbit": "05/02/2025"
  },
  {
    "noDoc": "DOC-IT-05",
    "judul": "SoA Risiko Infrastruktur 2025",
    "revisi": "Rev. 01",
    "klasifikasi": "Rahasia",
    "penyusun": "Divisi Infrastruktur",
    "ketuaIso": "Nadia Putri",
    "direktur": "Robert Johnson",
    "status": "Draft",
    "tanggalTerbit": "02/02/2025"
  },
  {
    "noDoc": "DOC-IT-06",
    "judul": "SoA Layanan Digital Semester 1",
    "revisi": "Rev. 02",
    "klasifikasi": "Internal",
    "penyusun": "Tim Layanan Digital",
    "ketuaIso": "Nadia Putri",
    "direktur": "Robert Johnson",
    "status": "In Progress",
    "tanggalTerbit": "10/02/2025"
  },
  {
    "noDoc": "DOC-IT-07",
    "judul": "SoA Proyek ERP",
    "revisi": "Rev. 04",
    "klasifikasi": "Publik",
    "penyusun": "Divisi Proyek Khusus",
    "ketuaIso": "Nadia Putri",
    "direktur": "Linda Pratama",
    "status": "Reviewed",
    "tanggalTerbit": "18/02/2025"
  },
  {
    "noDoc": "DOC-IT-08",
    "judul": "SoA Integrasi Data Center",
    "revisi": "Rev. 01",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim Infrastruktur",
    "ketuaIso": "Nadia Putri",
    "direktur": "Linda Pratama",
    "status": "Approved",
    "tanggalTerbit": "24/02/2025"
  },
  {
    "noDoc": "DOC-IT-09",
    "judul": "SoA Audit Keamanan 2024",
    "revisi": "Rev. 05",
    "klasifikasi": "Rahasia",
    "penyusun": "John Doe",
    "ketuaIso": "Jane Smith",
    "direktur": "Robert Johnson",
    "status": "Approved",
    "tanggalTerbit": "14/12/2024"
  },
  {
    "noDoc": "DOC-IT-10",
    "judul": "SoA Pengembangan Aplikasi Mobile",
    "revisi": "Rev. 02",
    "klasifikasi": "Internal",
    "penyusun": "Tim Mobile",
    "ketuaIso": "Jane Smith",
    "direktur": "Robert Johnson",
    "status": "Reviewed",
    "tanggalTerbit": "03/01/2025"
  },
  {
    "noDoc": "DOC-IT-11",
    "judul": "SoA Pengadaan Perangkat",
    "revisi": "Rev. 03",
    "klasifikasi": "Publik",
    "penyusun": "Divisi Pengadaan",
    "ketuaIso": "Jane Smith",
    "direktur": "Robert Johnson",
    "status": "Draft",
    "tanggalTerbit": "05/01/2025"
  },
  {
    "noDoc": "DOC-IT-12",
    "judul": "SoA Disaster Recovery Plan",
    "revisi": "Rev. 02",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim Keamanan Informasi",
    "ketuaIso": "Jane Smith",
    "direktur": "Linda Pratama",
    "status": "In Progress",
    "tanggalTerbit": "09/01/2025"
  },
  {
    "noDoc": "DOC-IT-13",
    "judul": "SoA Pengelolaan Vendor 2025",
    "revisi": "Rev. 01",
    "klasifikasi": "Publik",
    "penyusun": "Divisi Vendor",
    "ketuaIso": "Arif Rahman",
    "direktur": "Linda Pratama",
    "status": "Reviewed",
    "tanggalTerbit": "15/01/2025"
  },
  {
    "noDoc": "DOC-IT-14",
    "judul": "SoA Kebijakan Akses",
    "revisi": "Rev. 06",
    "klasifikasi": "Internal",
    "penyusun": "Divisi Kebijakan",
    "ketuaIso": "Arif Rahman",
    "direktur": "Linda Pratama",
    "status": "Approved",
    "tanggalTerbit": "20/01/2025"
  },
  {
    "noDoc": "DOC-IT-15",
    "judul": "SoA Monitoring Jaringan",
    "revisi": "Rev. 03",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim NOC",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Draft",
    "tanggalTerbit": "22/01/2025"
  },
  {
    "noDoc": "DOC-IT-16",
    "judul": "SoA Implementasi SSO",
    "revisi": "Rev. 02",
    "klasifikasi": "Internal",
    "penyusun": "Tim Identity",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "In Progress",
    "tanggalTerbit": "25/01/2025"
  },
  {
    "noDoc": "DOC-IT-17",
    "judul": "SoA Audit Infrastruktur Cloud",
    "revisi": "Rev. 01",
    "klasifikasi": "Rahasia",
    "penyusun": "Tim Cloud",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Reviewed",
    "tanggalTerbit": "28/01/2025"
  },
  {
    "noDoc": "DOC-IT-18",
    "judul": "SoA Project Phoenix",
    "revisi": "Rev. 04",
    "klasifikasi": "Publik",
    "penyusun": "PMO",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Approved",
    "tanggalTerbit": "30/01/2025"
  },
  {
    "noDoc": "DOC-IT-19",
    "judul": "SoA Peninjauan Kebijakan 2025",
    "revisi": "Rev. 03",
    "klasifikasi": "Internal",
    "penyusun": "Divisi Kebijakan",
    "ketuaIso": "Arif Rahman",
    "direktur": "Dewi Larasati",
    "status": "Reviewed",
    "tanggalTerbit": "05/02/2025"
  }
]

export {tableData};