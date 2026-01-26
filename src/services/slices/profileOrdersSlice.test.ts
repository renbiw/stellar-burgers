import reducer, {
  fetchUserOrders,
  clearOrders,
  clearError,
  addOrder
} from './profileOrdersSlice';
import { TOrder } from '@utils-types';

const initialState = {
  orders: [],
  isLoading: false,
  error: null
};

describe('profileOrdersSlice reducer', () => {
  it('должен вернуть initialState по умолчанию', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  it('fetchUserOrders.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, fetchUserOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchUserOrders.fulfilled сохраняет заказы', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        ingredients: [],
        status: 'done',
        number: 1,
        createdAt: '',
        updatedAt: '',
        name: 'Заказ 1'
      }
    ];

    const state = reducer(
      { ...initialState, isLoading: true },
      fetchUserOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('fetchUserOrders.rejected сохраняет ошибку', () => {
    const error = new Error('Ошибка загрузки');

    const state = reducer(
      { ...initialState, isLoading: true },
      fetchUserOrders.rejected(error, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('clearOrders очищает список заказов', () => {
    const state = reducer(
      {
        ...initialState,
        orders: [
          {
            _id: '1',
            ingredients: [],
            status: 'done',
            number: 1,
            createdAt: '',
            updatedAt: '',
            name: 'Заказ'
          }
        ]
      },
      clearOrders()
    );

    expect(state.orders).toEqual([]);
  });

  it('clearError сбрасывает ошибку', () => {
    const state = reducer({ ...initialState, error: 'Ошибка' }, clearError());

    expect(state.error).toBeNull();
  });

  it('addOrder добавляет заказ в начало массива', () => {
    const order1: TOrder = {
      _id: '1',
      ingredients: [],
      status: 'done',
      number: 1,
      createdAt: '',
      updatedAt: '',
      name: 'Заказ 1'
    };

    const order2: TOrder = {
      _id: '2',
      ingredients: [],
      status: 'done',
      number: 2,
      createdAt: '',
      updatedAt: '',
      name: 'Заказ 2'
    };

    const state = reducer(
      { ...initialState, orders: [order1] },
      addOrder(order2)
    );

    expect(state.orders[0]).toEqual(order2);
    expect(state.orders[1]).toEqual(order1);
  });
});
