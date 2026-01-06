import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const items = state.constructorItems.ingredients;
      const [moved] = items.splice(from, 1);
      items.splice(to, 0, moved);
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    },
    clearConstructor(state) {
      state.constructorItems = { bun: null, ingredients: [] };
      state.orderModalData = null;
      state.orderRequest = false;
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  setOrderRequest,
  setOrderModalData,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
