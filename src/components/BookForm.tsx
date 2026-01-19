import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook, deleteBook } from '../redux/bookSlice';
import { Book, FormMode } from '../types';
import { generateId } from '../utils/helper';
import './BookForm.scss';

interface BookFormProps {
  mode: FormMode;
  book?: Book | null;
  onClose: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ mode, book, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && book) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: book.title,
        price: book.price.toString(),
        category: book.category,
        description: book.description,
      });
    }
    setErrors({});
  }, [mode, book]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '书名不能为空';
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = '请输入有效的价格';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = '分类不能为空';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const bookData: Book = {
      id: mode === 'add' ? generateId() : book!.id,
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      category: formData.category.trim(),
      description: formData.description.trim(),
    };

    if (mode === 'add') {
      dispatch(addBook(bookData));
    } else {
      dispatch(updateBook(bookData));
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (book && mode === 'edit') {
      if (window.confirm(`确定要删除《${book.title}》吗？`)) {
        dispatch(deleteBook(book.id));
        onClose();
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{mode === 'add' ? '添加新书' : '编辑书籍'}</h2>
          <button 
            className="modal__close" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            <div className="form-group">
              <label className="form-label">
                书名 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${errors.title ? 'form-input--error' : ''}`}
                placeholder="请输入书名"
                disabled={isSubmitting}
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                价格 *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-input ${errors.price ? 'form-input--error' : ''}`}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={isSubmitting}
              />
              {errors.price && (
                <div className="error-message">{errors.price}</div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                分类 *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-input ${errors.category ? 'form-input--error' : ''}`}
                placeholder="请输入分类"
                disabled={isSubmitting}
              />
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                描述
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="请输入书籍描述"
                rows={4}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="modal__footer">
            {mode === 'edit' && (
              <button
                type="button"
                className="btn btn--danger"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                删除书籍
              </button>
            )}
            
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '处理中...' : (mode === 'add' ? '添加书籍' : '保存更改')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;