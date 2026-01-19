import React from 'react';
import { Book } from '../types';
import { formatPrice } from '../utils/helper';
import './BookList.scss';

interface BookListProps {
  books: Book[];
  selectedBooks: string[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ 
  books, 
  selectedBooks,
  onEditBook, 
  onDeleteBook,
  onToggleSelect
}) => {
  if (books.length === 0) {
    return (
      <div className="book-list__empty">
        <p>暂无书籍，请点击"添加书籍"按钮开始添加</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      <div className="table-responsive">
        <table className="book-table">
          <thead>
            <tr>
              <th className="book-table__checkbox"></th>
              <th>书名</th>
              <th>价格</th>
              <th>分类</th>
              <th>描述</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr 
                key={book.id}
                className={`book-row ${selectedBooks.includes(book.id) ? 'book-row--selected' : ''}`}
                onClick={() => onEditBook(book)}
              >
                <td 
                  className="book-table__checkbox"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="book-checkbox"
                    checked={selectedBooks.includes(book.id)}
                    onChange={() => onToggleSelect(book.id)}
                  />
                </td>
                <td>{book.title}</td>
                <td>{formatPrice(book.price)}</td>
                <td>
                  <span className="category-badge">
                    {book.category}
                  </span>
                </td>
                <td className="book-description">
                  {book.description}
                </td>
                <td>
                  <button
                    className="btn btn--danger btn--sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBook(book.id);
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;