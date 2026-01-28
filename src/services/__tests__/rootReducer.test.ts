import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer, {
  initialState as constructorInitialState
} from '../slices/constructorSlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import feedReducer from '../slices/feedSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  order: orderReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

describe('rootReducer', () => {
  it('должен корректно инициализировать initialState', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: constructorInitialState,
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      order: {
        order: null,
        isLoading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      }
    });
  });
});
