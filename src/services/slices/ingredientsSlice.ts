import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getIngredientsApi} from '../../utils/burger-api';
import {TIngredient} from '../../utils/types';

type TinitialState = {
  items: TIngredient[],
  isLoading: boolean,
  error: string|null
}

const initialState: TinitialState = {
  items: [],
  isLoading: false,
  error: null as string | null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
   async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

export const ingredientsSlice  = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    clearIngredients(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});



// экспорт обычных action'ов
export const { clearIngredients } = ingredientsSlice.actions;

// экспорт reducer’а
export default ingredientsSlice.reducer;
