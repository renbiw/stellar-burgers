import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={clsx(styles.menu, 'p-4')}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={
              location.pathname === '/' ? styles.link_active : styles.link
            }
          >
            <BurgerIcon type={'primary'} />
            <span className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </span>
          </Link>
          <Link
            to='/feed'
            className={
              location.pathname.includes('feed')
                ? styles.link_active
                : styles.link
            }
          >
            <ListIcon type={'primary'} />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </Link>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <Link
            to='/profile'
            className={
              location.pathname.includes('profile')
                ? styles.link_active
                : styles.link
            }
          >
            <ProfileIcon type={'primary'} />
            <span className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
