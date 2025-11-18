import { NCR_STATUS, CASE_STATUS, PAGINATE_OPTIONS as PAGINATE_OPTS } from "../constants";

// Mock data NCR
export const ncrMockData = [
  {
    id: 1,
    title: "NCR Dokumen 1",
    description: "To provide management direction and support for information security in accordance with business requirements and relevant laws and regulations",
    date: "27/4/2025",
    status: NCR_STATUS.DRAFT,
  },
  {
    id: 2,
    title: "NCR Dokumen 2",
    description: "Security requirements for the management of information security",
    date: "15/5/2025",
    status: NCR_STATUS.IN_PROGRESS,
  },
  {
    id: 3,
    title: "NCR Dokumen 3",
    description: "Information security controls implementation guidelines",
    date: "10/6/2025",
    status: NCR_STATUS.REVIEWED,
  },
  {
    id: 4,
    title: "NCR Dokumen 4",
    description: "Risk assessment and treatment procedures",
    date: "5/7/2025",
    status: NCR_STATUS.APPROVED,
  },
  {
    id: 5,
    title: "NCR Dokumen 5",
    description: "Incident management and response plan",
    date: "12/8/2025",
    status: NCR_STATUS.DRAFT,
  },
];

// Mock data kasus NCR
export const casesMockData = [
  {
    id: "010101",
    bagianTerkait: "Ruang Server",
    tanggal: "27/7/2025",
    standarReferensi: "STANDAR ISO - 27001:2022",
    klasifikasi: "-",
    namaAuditor: "Cakrawerdaya",
    namaAuditee: "Rasiban",
    status: CASE_STATUS.APPROVED,
  },
  {
    id: "010101",
    bagianTerkait: "Ruang Server",
    tanggal: "27/7/2025",
    standarReferensi: "STANDAR ISO - 27001:2022",
    klasifikasi: "-",
    namaAuditor: "Cakrawerdaya",
    namaAuditee: "Rasiban",
    status: CASE_STATUS.APPROVED,
  },
  {
    id: "010101",
    bagianTerkait: "Ruang Server",
    tanggal: "27/7/2025",
    standarReferensi: "STANDAR ISO - 27001:2022",
    klasifikasi: "-",
    namaAuditor: "Cakrawerdaya",
    namaAuditee: "Rasiban",
    status: CASE_STATUS.APPROVED,
  },
];

// Re-export pagination options from constants
export { PAGINATE_OPTS as PAGINATE_OPTIONS };
