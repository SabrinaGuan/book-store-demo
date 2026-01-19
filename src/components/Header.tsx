import React from 'react';
import './Header.scss';

interface HeaderProps {
  onAddBook: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onAddBook, 
  onDeleteSelected, 
  selectedCount 
}) => {
  return (
    <header className="header">
      <h1 className="header__logo">
        📚 在线书店
      </h1>
      
      <div className="header__actions">
        {selectedCount > 0 && (
          <button
            onClick={onDeleteSelected}
            className="btn btn--danger"
          >
            删除选中 ({selectedCount})
          </button>
        )}
        
        <button
          onClick={onAddBook}
          className="btn btn--primary"
        >
          + 添加书籍
        </button>
      </div>
    </header>
  );
};

export default Header;