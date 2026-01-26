import reducer, {
  checkAuth,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  clearError,
  setAuthChecked
} from '../slices/userSlice';
import { TUser } from '@utils-types';

const initialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

const mockUser: TUser = {
  email: 'test@test.ru',
  name: 'Test User'
};

describe('userSlice reducer', () => {
  it('возвращает initialState', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('checkAuth.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, checkAuth.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('checkAuth.fulfilled сохранение user, установка флага isAuthChecked', () => {
    const state = reducer(
      initialState,
      checkAuth.fulfilled(mockUser, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('checkAuth.rejected устанавливает isAuthChecked = true', () => {
    const state = reducer(
      initialState,
      checkAuth.rejected(null, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('registerUser.pending устанавливает isLoading true, error null', () => {
    const state = reducer(initialState, registerUser.pending('', {} as any));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('registerUser.fulfilled сохраняет user и устанавливает isAuthChecked= true', () => {
    const state = reducer(
      initialState,
      registerUser.fulfilled(mockUser, '', {} as any)
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('registerUser.rejected устанавливает error, если ошибка при регистрации', () => {
    const state = reducer(
      initialState,
      registerUser.rejected(null, '', {} as any, 'Ошибка')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('loginUser.fulfilled сохраняет user и устанавливает isAuthChecked = true', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(mockUser, '', {} as any)
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('logoutUser.fulfilled очищает user', () => {
    const state = reducer(
      { ...initialState, user: mockUser },
      logoutUser.fulfilled(null, '', undefined)
    );

    expect(state.user).toBeNull();
  });

  it('updateUser.fulfilled обновляет user', () => {
    const state = reducer(initialState, updateUser.fulfilled(mockUser, '', {}));

    expect(state.user).toEqual(mockUser);
  });

  it('clearError очищает error', () => {
    const state = reducer({ ...initialState, error: 'Ошибка' }, clearError());

    expect(state.error).toBeNull();
  });

  it('setAuthChecked устанавливает флаг', () => {
    const state = reducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });
});
