import reducer, { fetchFeeds } from '../slices/feedSlice';
import { TOrder } from '@utils-types';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

describe('feedSlice reducer', () => {
  it('fetchFeeds.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, fetchFeeds.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchFeeds.fulfilled сохраняет данные ленты', () => {
    const mockPayload = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['643d69a5c3f7b9001cfa093c'],
          status: 'done',
          number: 123,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
          name: 'Заказ №1'
        }
      ] as TOrder[],
      total: 100,
      totalToday: 10
    };

    const state = reducer(
      { ...initialState, isLoading: true },
      fetchFeeds.fulfilled(mockPayload, '', undefined)
    );

    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.isLoading).toBe(false);
  });

  it('fetchFeeds.rejected сохраняет ошибку и выключает isLoading', () => {
    const error = new Error('Ошибка');

    const state = reducer(
      { orders: [], total: 0, totalToday: 0, isLoading: true, error: null },
      fetchFeeds.rejected(error, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
