import React from 'react';
import { SortField } from '../types';
import './SortControls.scss';

interface SortControlsProps {
  sortField: SortField;
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: SortField) => void;
  onSelectAll: () => void;
  selectedCount: number;
  totalCount: number;
}

const SortControls: React.FC<SortControlsProps> = ({ 
  sortField, 
  sortDirection,
  onSortChange,
  onSelectAll,
  selectedCount,
  totalCount
}) => {
  const sortOptions: { field: SortField; label: string }[] = [
    { field: 'title', label: '书名' },
    { field: 'price', label: '价格' },
    { field: 'category', label: '分类' },
  ];

  const isAllSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <div className="sort-controls">
      <div className="sort-controls__left">
        <div className="sort-buttons">
          {sortOptions.map(({ field, label }) => (
            <button
              key={field}
              className={`sort-btn ${sortField === field ? 'sort-btn--active' : ''}`}
              onClick={() => onSortChange(field)}
            >
              {label}
              {sortField === field && (
                <span className="sort-direction">
                  {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="sort-controls__right">
        <div className="selection-controls">
          <label className="select-all-checkbox">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={onSelectAll}
            />
            全选
          </label>
          
          <div className="selection-stats">
            已选中 {selectedCount} / {totalCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;