// 书籍类型
export interface Book {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
}

// 排序相关类型
export type SortField = 'title' | 'price' | 'category';
export type SortDirection = 'asc' | 'desc';

// Redux状态类型
export interface BookState {
  books: Book[];
  selectedBooks: string[]; // 选中书籍的ID数组
  sortConfig: {
    field: SortField;
    direction: SortDirection;
  };
}

// 表单模式
export type FormMode = 'add' | 'edit';