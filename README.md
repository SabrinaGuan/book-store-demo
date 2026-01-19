# 图书系统demo

## 项目结构
book-store/
├── src/
│   ├── components/          # 组件（每个都有.tsx和.scss文件）
│   │   ├── BookList.tsx
│   │   ├── BookList.scss
│   │   ├── BookForm.tsx
│   │   ├── BookForm.scss
│   │   ├── Header.tsx
│   │   ├── Header.scss
│   │   ├── SortControls.tsx
│   │   └── SortControls.scss
│   ├── redux/              # Redux状态管理
│   │   ├── bookSlice.ts
│   │   └── store.ts
│   ├── types/              # TypeScript类型
│   │   └── index.ts
│   ├── utils/              # 工具函数
│   │   ├── helpers.ts
│   │   └── sortUtils.ts
│   ├── styles/             # 全局样式
│   │   └── main.scss
│   ├── App.tsx
│   └── main.tsx

## 功能

书籍列表显示：书名、价格、分类、描述

添加书籍Popup：带表单验证

编辑书籍Popup：点击书籍行编辑

删除功能：单个删除 + 批量删除

排序功能：按书名、价格、分类排序

多选功能：Checkbox全选/单选

前端数据存储：Redux管理状态
