import { FC } from 'react';

import { Input, Button } from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { PageUIProps } from '../common-type';
import clsx from 'clsx';

export const ForgotPasswordUI: FC<PageUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit
}) => (
  <main className={styles.container}>
    <div className={clsx(styles.wrapCenter, 'pt-6')}>
      <h3 className='pb-6 text text_type_main-medium'>Восстановление пароля</h3>
      <form
        className={clsx(styles.form, 'pb-15')}
        name='login'
        onSubmit={handleSubmit}
      >
        <div className='pb-6'>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name='email'
            error={false}
            errorText=''
            size='default'
          />
        </div>
        <div className={clsx(styles.button, 'pb-6')}>
          <Button type='primary' size='medium' htmlType='submit'>
            Восстановить
          </Button>
        </div>
        {errorText && (
          <p
            className={clsx(
              styles.error,
              'text',
              'text_type_main-default',
              'pb-6'
            )}
          >
            {errorText}
          </p>
        )}
      </form>
      <div
        className={clsx(
          styles.question,
          'text',
          'text_type_main-default',
          ' pb-6'
        )}
      >
        Вспомнили пароль?
        <Link to={'/login'} className={clsx(styles.link, 'pl-2')}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);
