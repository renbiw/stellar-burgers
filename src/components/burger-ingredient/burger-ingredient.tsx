import { FC, memo } from 'react';
import { useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addIngredient, setBun } from '../../services/slices/constructorSlice';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun({ ...ingredient, id: nanoid() }));
      } else {
        dispatch(addIngredient({ ...ingredient, id: nanoid() }));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
