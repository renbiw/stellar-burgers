import reducer, {
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor,
  setOrderRequest,
  setOrderModalData,
  moveIngredient,
  initialState
} from '../slices/constructorSlice';
import { TConstructorIngredient, TOrder } from '@utils-types';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'mock-id'
}));

const getStateWithIngredients = () => ({
  constructorItems: {
    bun: null,
    ingredients: [
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
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
      }
    ]
  },
  orderRequest: false,
  orderModalData: null
});

describe('feedSlice reducer', () => {
  it('должен возвращать initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('moveIngredient reducer', () => {
    it('должен корректно менять элементы местами', () => {
      const newState = reducer(
        getStateWithIngredients(),
        moveIngredient({ from: 0, to: 2 })
      );

      expect(newState.constructorItems.ingredients.map((i) => i.id)).toEqual([
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ]);
    });
  });

  describe('addIngredient reducer', () => {
    it('корректное добавление ингредиента', () => {
      const newState = reducer(
        getStateWithIngredients(),
        addIngredient({
          _id: '643d69a5c3f7b9001cfa0942',
          id: 'mock-id',
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
        })
      );

      expect(newState.constructorItems.ingredients).toHaveLength(4);
      expect(newState.constructorItems.ingredients[3]).toMatchObject({
        _id: '643d69a5c3f7b9001cfa0942',
        type: 'main',
        id: 'mock-id'
      });
    });
  });

  describe('removeIngredient reducer', () => {
    it('корректное удаление ингредиента', () => {
      const newState = reducer(
        getStateWithIngredients(),
        removeIngredient('643d69a5c3f7b9001cfa0941')
      );

      expect(newState.constructorItems.ingredients).toHaveLength(2);
      expect(newState.constructorItems.ingredients[1].id).toBe(
        '643d69a5c3f7b9001cfa0945'
      );
    });
  });

  describe('setBun reducer', () => {
    it('setBun устанавливает булку', () => {
      const bun = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      } as TConstructorIngredient;

      const state = reducer(initialState, setBun(bun));

      expect(state.constructorItems.bun).toEqual(bun);
    });
  });

  describe('clearConstructor reducer', () => {
    it('очищает конструктор', () => {
      const newState = reducer(getStateWithIngredients(), clearConstructor());
      expect(newState).toEqual(initialState);
    });
  });

  describe('setOrderRequest', () => {
    it('устанавливает флаг', () => {
      const state = reducer(initialState, setOrderRequest(true));
      expect(state.orderRequest).toBe(true);
    });
  });

  describe('setOrderModalData', () => {
    it('устанавливает данные заказа', () => {
      const order = {
        _id: '233'
      } as TOrder;
      const state = reducer(initialState, setOrderModalData(order));

      expect(state.orderModalData).toEqual(order);
    });
  });
});
