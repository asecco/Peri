function Pagination({ page, totalPages, setPage }) {
    const handleClick = (pageNumber) => {
        setPage(pageNumber);
    };
    
    const pagesToShow = 5;
    const getPageNumbers = () => {
        const pageNumbers = [];
        // If there is only one page or no pages, return an empty array
        if (totalPages <= 1) {
            return pageNumbers;
        }
        // Calculate the first and last page numbers to show
        let firstPage = Math.max(1, page - Math.floor(pagesToShow / 2));
        let lastPage = Math.min(totalPages, firstPage + pagesToShow - 1);
        // Adjust the first and last page numbers if necessary to show exactly `pagesToShow` pages
        if (lastPage - firstPage + 1 < pagesToShow) {
            if (firstPage === 1) {
                lastPage = Math.min(totalPages, pagesToShow);
            } else {
                firstPage = Math.max(1, lastPage - pagesToShow + 1);
            }
        }
        // Add the page numbers to the array
        for (let i = firstPage; i <= lastPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers();

    const highPageNumber = page > 99 ? 'text-xl px-1 py-2' : 'text-xl px-4 py-2'; // If the page number is greater than 99, make the buttons smaller

    return (
        <div className="flex justify-center space-x-4 mb-6">
            {pageNumbers.map((pageNumber) => (
                <button key={pageNumber} onClick={() => handleClick(pageNumber)} className={`${pageNumber === page ? 'bg-red-500 text-white' : 'bg-white text-black hover:opacity-75'} ${highPageNumber} rounded-lg font-bold`}>{pageNumber}</button>
            ))}
        </div>
    );
}

export default Pagination;