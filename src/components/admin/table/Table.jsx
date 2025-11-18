import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Reusable table component with configurable headers and cells.
 */
export function Table({
  columns = [],
  data = [],
  className = "",
  tableClassName = "",
  headerClassName = "bg-state",
  headerRowClassName = "",
  emptyMessage = "Tidak ada data",
  getRowKey,
}) {
  const rows = Array.isArray(data) ? data : [];
  const resolvedColumns = Array.isArray(columns) ? columns : [];
  const resolveRowKey =
    typeof getRowKey === "function"
      ? getRowKey
      : (_, index) => `row-${index}`;
  const baseHeaderCellClass = "text-center text-navy-hover py-3 body-medium";
  const baseCellClass = "body";

  return (
    <div className={`border-2 rounded-t-xl relative w-full ${className}`}>
      <div className="w-full overflow-x-auto">
        <UITable className={tableClassName}>
          <TableHeader className={headerClassName}>
            <TableRow className={headerRowClassName}>
              {resolvedColumns.map((column) => (
                <TableHead
                  key={column.key ?? column.accessor ?? column.header}
                  className={`${baseHeaderCellClass} ${
                    column.headerClassName ?? ""
                  }`}
                >
                  {typeof column.header === "function"
                    ? column.header()
                    : column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={resolvedColumns.length || 1}
                  className="text-center body text-gray-dark py-6"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow key={resolveRowKey(row, rowIndex)}>
                  {resolvedColumns.map((column) => (
                    <TableCell
                      key={`cell-${column.key ?? column.accessor ?? column.header}`}
                      className={`${baseCellClass} ${
                        column.cellClassName ?? ""
                      }`}
                    >
                      {column.render
                        ? column.render(row, rowIndex)
                        : column.accessor
                        ? row[column.accessor]
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
}
