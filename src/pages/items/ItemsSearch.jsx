import React, { useEffect, useState } from 'react';
import './ItemsSearch.css';
import { useLocation } from 'react-router-dom';
import Category from '../../components/items/category/Category';
import Item from '../../components/items/item/Item';
import { getSearchItems } from '../../api/itemsApi';
import { getCategories } from '../../api/categoryApi';


const ItemsSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const q = queryParams.get('q');
  const category = queryParams.get('category');

  const [items, setItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (category) params.append("category", category);

    const fetchItemSearchData = async () => {
      try {
        const response = await getSearchItems(q, category);

        setItems(response.data);
        setIsEmpty(response.data.length === 0);
        console.log(response)
      } catch (error) {
        console.error('상품 검색 에러 : ', error);
        setItems([]);
        setIsEmpty(true);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
          console.log('카테고리 목록 조회 에러: ', error);
      }
    };

    fetchItemSearchData();
    fetchCategoryData();
  }, [q, category]);

  return (
    <div className='container'>
      <h1>내 주변 "{q}" 검색 결과</h1>
      <div className='search_container'>
        <Category selectedCategory={category} keyword={q} categories={categories} />

        <div className='items_container'>
          {isEmpty ? (
            <div className="search_empty">
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            items.map((item) => <Item item={item} key={item.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsSearch;
