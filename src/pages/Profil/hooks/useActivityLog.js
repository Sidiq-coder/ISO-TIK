import { useState, useMemo } from "react";

export function useActivityLog(data = []) {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, perPage]);

  const totalPages = Math.ceil(data.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePaginateChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return {
    perPage,
    currentPage,
    pagedData,
    totalData: data.length,
    totalPages,
    handlePageChange,
    handlePaginateChange,
  };
}
