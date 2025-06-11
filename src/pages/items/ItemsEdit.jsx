import React from 'react';
import ItemRegister from '../../components/items/itemRegister/ItemRegister';
import { useLocation } from 'react-router-dom';

const ItemsEdit = () => {
  const location = useLocation();
  const { item, isEdit } = location.state || {};

  return (
    <>
      <ItemRegister isEdit={isEdit} item={item} />
    </>
  );
};

export default ItemsEdit;
