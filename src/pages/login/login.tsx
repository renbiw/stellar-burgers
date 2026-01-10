import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, clearError } from '../../services/slices/userSlice';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Очищаем предыдущую ошибку
    dispatch(clearError());

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // После успешного входа редирек
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
