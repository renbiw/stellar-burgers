import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type OrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/createOrder',
  async (ingredients) => {
    const res = await orderBurgerApi(ingredients);
    return res.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
