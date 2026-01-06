import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import clsx from 'clsx';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <main className={styles.main}>
    <div className={clsx(styles.menu, 'mt-30', ' mr-15')}>
      <ProfileMenu />
    </div>
    <div className={clsx(styles.orders, 'mt-10')}>
      <OrdersList orders={orders} />
    </div>
  </main>
);
