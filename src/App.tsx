import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { 
  deleteBook, 
  deleteSelectedBooks,
  toggleBookSelection,
  selectAllBooks,
  setSortConfig 
} from './redux/bookSlice';
import Header from './components/Header';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SortControls from './components/SortControls';
import { Book, FormMode } from './types';
import { sortBooks } from './utils/sortUtils';

function App() {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formMode, setFormMode] = useState<FormMode>('add');
  
  const { books, selectedBooks, sortConfig } = useSelector(
    (state: RootState) => state.books
  );

  const sortedBooks = useMemo(() => {
    return sortBooks(books, sortConfig.field, sortConfig.direction);
  }, [books, sortConfig.field, sortConfig.direction]);

  const handleAddBook = () => {
    setFormMode('add');
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setFormMode('edit');
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('确定要删除这本书吗？')) {
      dispatch(deleteBook(id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedBooks.length === 0) {
      alert('请先选择要删除的书籍');
      return;
    }
    
    if (window.confirm(`确定要删除选中的 ${selectedBooks.length} 本书吗？`)) {
      dispatch(deleteSelectedBooks());
    }
  };

  const handleToggleSelect = (id: string) => {
    dispatch(toggleBookSelection(id));
  };

  const handleSelectAll = () => {
    dispatch(selectAllBooks());
  };

  const handleSortChange = (field: 'title' | 'price' | 'category') => {
    dispatch(setSortConfig({ field }));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="app-container">
      <Header 
        onAddBook={handleAddBook}
        onDeleteSelected={handleDeleteSelected}
        selectedCount={selectedBooks.length}
      />
      
      <main className="main-content">
        <SortControls 
          sortField={sortConfig.field}
          sortDirection={sortConfig.direction}
          onSortChange={handleSortChange}
          onSelectAll={handleSelectAll}
          selectedCount={selectedBooks.length}
          totalCount={books.length}
        />
        
        <BookList 
          books={sortedBooks}
          selectedBooks={selectedBooks}
          onEditBook={handleEditBook}
          onDeleteBook={handleDeleteBook}
          onToggleSelect={handleToggleSelect}
        />
      </main>
      
      {isFormOpen && (
        <BookForm 
          mode={formMode}
          book={editingBook}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;