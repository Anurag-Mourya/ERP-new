// PaginationUtils.js

export const generatePagination = (currentPage, itemsPerPage, totalItems, handlePageChange) => {
    const pagination = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const visiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (currentPage - startPage < Math.floor(visiblePages / 2)) {
        endPage = Math.min(totalPages, startPage + visiblePages - 1);
    }

    if (endPage === totalPages && totalPages > visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (startPage > 1) {
        pagination.push(
            <button key={1} onClick={() => handlePageChange(1)}>
                1
            </button>
        );
        if (startPage > 2) {
            pagination.push(<span key={-1}>...</span>);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagination.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                disabled={i === currentPage}
            >
                {i}
            </button>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagination.push(<span key={-2}>...</span>);
        }
        pagination.push(
            <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </button>
        );
    }

    return pagination;
};
