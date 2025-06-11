import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import style from './pagination.module.css';

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const pagesPerGroup = 5;
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const goToPrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - 1);
    }
  };

  const goToNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1);
    }
  };

  return (
    <div className={style.pageContainer}>
      <button
        className={style.arrows}
        onClick={goToPrevGroup}
        disabled={startPage === 1}
      >
        <FiChevronLeft />
      </button>
      {pageNumbers.map((page) => (
        <button
          className={page === currentPage ? style.activePage : style.buttons}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={style.arrows}
        onClick={goToNextGroup}
        disabled={endPage === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
