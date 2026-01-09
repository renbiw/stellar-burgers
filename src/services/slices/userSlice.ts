import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  logoutApi,
  getUserApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

// Определяем интерфейс состояния
interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

// Проверка авторизации
export const checkAuth = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: unknown) {
      return rejectWithValue('Ошибка проверки авторизации');
    }
  }
);

// Регистрация
export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Ошибка регистрации');
  }
});

// Логин
export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(data);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Ошибка авторизации');
  }
});

// Выход
export const logoutUser = createAsyncThunk<null, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');

      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Ошибка выхода');
    }
  }
);
// Обновление данных пользователя
export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(data);
    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Ошибка обновления профиля');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Проверка авторизации
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        // При ошибке проверки не сбрасываем пользователя,
        // возможно токен просто истек и нужен релогин
      })

      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Логин
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Выход
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearError, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
