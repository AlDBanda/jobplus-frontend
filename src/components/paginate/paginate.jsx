import React from 'react';
import './paginate.scss';

export default function Paginate({ meta, onPageChange }) {
  return (
    <ul className="paginate">
      <li
      className={meta?.hasPrevPage ? '' : 'disabled'}
      onClick={() => meta?.hasPrevPage && onPageChange(meta?.currentPage -1)}
      >&lt; PREVIOUS</li>

      <div className='page-numbers'>
        {Array.from({ length: meta?.totalPages })}
      </div>

      <li
      className={meta?.hasNextPage ? '' : 'disabled'}
      onClick={() => meta?.hasNextPage && onPageChange(meta?.currentPage + 1)}
      >NEXT &gt;</li>
    </ul>
  );
}
