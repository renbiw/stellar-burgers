import reducer, { fetchIngredients } from '../slices/ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: null
    });
  });
  it('fetchIngredients.pending устанавливает isLoading = true', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled сохраняет ингредиенты и выключает isLoading', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        id: '643d69a5c3f7b9001cfa093c',
        name: 'Биокотлета из лосося',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];

    const state = reducer(
      { items: [], isLoading: true, error: null },
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.items).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  it('fetchIngredients.rejected сохраняет ошибку и выключает isLoading', () => {
    const error = new Error('Ошибка');

    const state = reducer(
      { items: [], isLoading: true, error: null },
      fetchIngredients.rejected(error, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
