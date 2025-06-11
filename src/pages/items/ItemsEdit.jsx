import React from 'react';
import ItemRegister from '../../components/items/itemRegister/ItemRegister';
import { useLocation } from 'react-router-dom';

const ItemsEdit = () => {
  const location = useLocation();
  const { item, isEdit, location } = location.state || {};

  return (
    <>
      <ItemRegister isEdit={isEdit} item={item} location={location} />
    </>
  );
};

export default ItemsEdit;
