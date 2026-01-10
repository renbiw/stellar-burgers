import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, clearError } from '../../services/slices/userSlice';
import { Preloader } from '../../components/ui/preloader/preloader';
import { useNavigate, useLocation } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { user, isLoading, error, isAuthChecked } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user && isAuthChecked) {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [user, isAuthChecked, navigate, location]);

  // Очистка ошибок при размонтировании
  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', email: '', password: '' };

    if (!userName.trim()) {
      errors.name = 'Введите имя';
      isValid = false;
    } else if (userName.length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Введите email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Введите пароль';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Очищаем предыдущие ошибки
    dispatch(clearError());
    setFormErrors({ name: '', email: '', password: '' });

    if (validateForm()) {
      dispatch(
        registerUser({
          name: userName,
          email: email,
          password: password
        })
      );
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Обновляем соответствующее состояние
    switch (field) {
      case 'name':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }

    // Очищаем ошибку поля при вводе
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  // Показываем лоадер при регистрации
  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
