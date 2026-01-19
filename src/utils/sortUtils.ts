import { Book, SortField, SortDirection } from '../types';

export const sortBooks = (
  books: Book[],
  sortField: SortField,
  sortDirection: SortDirection
): Book[] => {
  const sortedBooks = [...books];
  
  sortedBooks.sort((a, b) => {
    if (sortField === 'price') {
      return sortDirection === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    } else {
      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });
  
  return sortedBooks;
};