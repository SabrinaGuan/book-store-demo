import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book, BookState, SortField } from '../types';

// 初始状态
const initialState: BookState = {
  books: [
    {
      id: '1',
      title: '深入理解TypeScript',
      price: 89,
      category: '编程',
      description: 'TypeScript高级编程指南',
    },
    {
      id: '2',
      title: 'React设计模式',
      price: 69,
      category: '前端',
      description: 'React最佳实践和设计模式',
    },
  ],
  selectedBooks: [],
  sortConfig: {
    field: 'title',
    direction: 'asc',
  },
};

// 创建slice
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // 添加书籍
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    // 更新书籍
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    // 删除单个书籍
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    // 切换书籍选中状态
    toggleBookSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedBooks.includes(id)) {
        state.selectedBooks = state.selectedBooks.filter(bookId => bookId !== id);
      } else {
        state.selectedBooks.push(id);
      }
    },
    // 全选/取消全选
    selectAllBooks: (state) => {
      if (state.selectedBooks.length === state.books.length) {
        state.selectedBooks = [];
      } else {
        state.selectedBooks = state.books.map(book => book.id);
      }
    },
    // 删除选中的书籍
    deleteSelectedBooks: (state) => {
      state.books = state.books.filter(
        book => !state.selectedBooks.includes(book.id)
      );
      state.selectedBooks = [];
    },
    // 设置排序配置
    setSortConfig: (state, action: PayloadAction<{ field: SortField }>) => {
      const { field } = action.payload;
      const isSameField = state.sortConfig.field === field;
      
      if (isSameField) {
        // 相同字段：切换排序方向
        state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        // 不同字段：设置新字段，默认升序
        state.sortConfig.field = field;
        state.sortConfig.direction = 'asc';
      }
    },
  },
});

// 导出actions
export const {
  addBook,
  updateBook,
  deleteBook,
  toggleBookSelection,
  selectAllBooks,
  deleteSelectedBooks,
  setSortConfig,
} = bookSlice.actions;

// 导出reducer
export default bookSlice.reducer;