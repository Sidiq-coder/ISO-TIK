/**
 * Example: Implementasi PDF Export di Manajemen Pengguna
 * 
 * File ini menunjukkan cara mengintegrasikan PDF export
 * ke dalam halaman existing
 */

import { useState } from 'react';
import { PDFExportButton, PDFExportDialog } from '@/generatePDF/components';
import { generateUserPDF, generateUsersListPDF } from '@/generatePDF';

// ====================================
// CONTOH 1: Export Single User
// ====================================

function UserDetailPage({ userData }) {
  const handleExportUser = () => {
    generateUserPDF(userData, {
      includeRoles: true,
      includeDetails: true,
      filename: `user-${userData.username}.pdf`,
    });
  };

  return (
    <div>
      <h1>Detail Pengguna: {userData.fullName}</h1>
      
      {/* Simple export button */}
      <PDFExportButton
        onExport={handleExportUser}
        label="Export ke PDF"
        variant="default"
        size="default"
      />
    </div>
  );
}

// ====================================
// CONTOH 2: Export Users List dengan Dialog
// ====================================

function UsersListPage({ users, filters }) {
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleExportList = (options) => {
    generateUsersListPDF(users, {
      filename: options.filename,
      filters: filters,
    });
  };

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      
      {/* Button to open dialog */}
      <button onClick={() => setShowExportDialog(true)}>
        Export ke PDF
      </button>

      {/* Export dialog */}
      <PDFExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        onExport={handleExportList}
        title="Export Daftar Pengguna"
        description="Masukkan nama file untuk export PDF"
        defaultFilename="daftar-pengguna.pdf"
      />
    </div>
  );
}

// ====================================
// CONTOH 3: Export dengan Custom Options
// ====================================

function UsersPageWithOptions({ users }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleExport = (options) => {
    // Filter users based on options
    let filteredUsers = users;
    
    if (options.statusFilter) {
      filteredUsers = filteredUsers.filter(
        u => u.status === options.statusFilter
      );
    }
    
    if (options.roleFilter) {
      filteredUsers = filteredUsers.filter(
        u => u.roles?.some(r => r.name === options.roleFilter)
      );
    }

    generateUsersListPDF(filteredUsers, {
      filename: options.filename,
      filters: {
        status: options.statusFilter || 'Semua',
        role: options.roleFilter || 'Semua',
      },
    });
  };

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>
        Export ke PDF
      </button>

      <PDFExportDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onExport={handleExport}
        title="Export Daftar Pengguna"
        description="Pilih filter untuk data yang akan diekspor"
        defaultFilename="daftar-pengguna.pdf"
      >
        {(options, setOptions) => (
          <div className="space-y-3">
            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Filter Status
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.statusFilter || ''}
                onChange={(e) =>
                  setOptions({ ...options, statusFilter: e.target.value })
                }
              >
                <option value="">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>

            {/* Role filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Filter Role
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={options.roleFilter || ''}
                onChange={(e) =>
                  setOptions({ ...options, roleFilter: e.target.value })
                }
              >
                <option value="">Semua Role</option>
                <option value="Admin">Admin</option>
                <option value="Auditor">Auditor</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        )}
      </PDFExportDialog>
    </div>
  );
}

// ====================================
// CONTOH 4: Export Button in Table Row
// ====================================

function UsersTable({ users }) {
  const handleExportRow = (user) => {
    generateUserPDF(user, {
      includeRoles: true,
      filename: `user-${user.username}.pdf`,
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>
              <PDFExportButton
                onExport={() => handleExportRow(user)}
                label="PDF"
                variant="outline"
                size="sm"
                showIcon={false}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ====================================
// CONTOH 5: Batch Export (Multiple Users)
// ====================================

function UsersBatchExport({ users }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const handleBatchExport = (options) => {
    const usersToExport = users.filter(u => 
      selectedUsers.includes(u.id)
    );

    generateUsersListPDF(usersToExport, {
      filename: options.filename,
    });
  };

  const toggleUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setShowDialog(true)}
          disabled={selectedUsers.length === 0}
        >
          Export {selectedUsers.length} Pengguna ke PDF
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedUsers(
                    e.target.checked ? users.map(u => u.id) : []
                  )
                }
                checked={selectedUsers.length === users.length}
              />
            </th>
            <th>Username</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PDFExportDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onExport={handleBatchExport}
        title="Export Pengguna Terpilih"
        description={`Mengekspor ${selectedUsers.length} pengguna ke PDF`}
        defaultFilename="pengguna-terpilih.pdf"
      />
    </div>
  );
}

export {
  UserDetailPage,
  UsersListPage,
  UsersPageWithOptions,
  UsersTable,
  UsersBatchExport,
};
