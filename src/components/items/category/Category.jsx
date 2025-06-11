import React from 'react';
import './Category.css';
import selectedIcon from '../../../assets/ic_selected.svg';
import unselectedIcon from '../../../assets/ic_unselected.svg';
import { useNavigate } from 'react-router-dom';

const Category = ({ selectedCategory, keyword, categories }) => {
  const navigate = useNavigate();

  const handleClickCategory = (categoryId, categoryName) => {
    if (categoryName === '전체') {
      navigate(`/items?q=${keyword}`);
    } else {
      navigate(`/items?q=${keyword}&category=${categoryId}`);
    }
  };

  const allCategories = [{ id: 0, category: '전체' }, ...categories];

  return (
    <div className="category_container">
      <div className="category_line"></div>
      <h3>카테고리</h3>
      {allCategories.map((category) => (
        <div
          className="category"
          key={category.id}
          onClick={() => handleClickCategory(category.id, category.category)}
        >
          {Number(selectedCategory) === category.id ? (
            <>
              <img src={selectedIcon} alt="selected" />
              <p>{category.category}</p>
            </>
          ) : (
            <>
              <img src={unselectedIcon} alt="unselected" />
              <p>{category.category}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
