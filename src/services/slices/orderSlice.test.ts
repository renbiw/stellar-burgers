import reducer, { createOrder, clearOrder } from '../slices/orderSlice';
import { TOrder } from '@utils-types';

const initialState = {
  order: null,
  isLoading: false,
  error: null
};

describe('orderSlice reducer', () => {
  it('должен вернуть initialState по умолчанию', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  it('createOrder.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, createOrder.pending('', []));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled сохраняет заказ и выключает isLoading', () => {
    const mockOrder: TOrder = {
      _id: '1',
      ingredients: ['643d69a5c3f7b9001cfa093c'],
      status: 'done',
      number: 123,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      name: 'Заказ 1'
    };

    const state = reducer(
      { ...initialState, isLoading: true },
      createOrder.fulfilled(mockOrder, '', [])
    );

    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it('createOrder.rejected сохраняет ошибку и выключает isLoading', () => {
    const error = new Error('Ошибка заказа');

    const state = reducer(
      { ...initialState, isLoading: true },
      createOrder.rejected(error, '', [])
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка заказа');
  });

  it('clearOrder очищает заказ', () => {
    const mockOrder: TOrder = {
      _id: '1',
      ingredients: [],
      status: 'done',
      number: 1,
      createdAt: '',
      updatedAt: '',
      name: 'Заказ'
    };

    const state = reducer({ ...initialState, order: mockOrder }, clearOrder());

    expect(state.order).toBeNull();
  });
});
