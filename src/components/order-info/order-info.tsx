import { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchUserOrders } from '../../services/slices/profileOrdersSlice';

import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient, TOrder } from '../../utils/types';

type TOrderInfo = React.ComponentProps<typeof OrderInfoUI>['orderInfo'];

export const OrderInfo = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();

  const feedOrders = useSelector((store) => store.feed.orders);
  const profileOrders = useSelector((store) => store.profileOrders.orders);
  const ingredients = useSelector((store) => store.ingredients.items);
  const user = useSelector((store) => store.user.user);

  const isProfilePage = location.pathname.startsWith('/profile');

  useEffect(() => {
    if (isProfilePage && user && !profileOrders.length) {
      dispatch(fetchUserOrders());
    }

    if (!isProfilePage && !feedOrders.length) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, isProfilePage, user, feedOrders.length, profileOrders.length]);

  const orders: TOrder[] = isProfilePage ? profileOrders : feedOrders;

  const orderInfo: TOrderInfo | null = useMemo(() => {
    const order = orders.find((o) => o.number === Number(number));

    if (!order || !ingredients.length) return null;

    const ingredientsInfo: {
      [key: string]: TIngredient & { count: number };
    } = {};

    order.ingredients.forEach((id) => {
      const ingredient = ingredients.find((i) => i._id === id);
      if (!ingredient) return;

      if (ingredientsInfo[id]) {
        ingredientsInfo[id].count += 1;
      } else {
        ingredientsInfo[id] = {
          ...ingredient,
          count: 1
        };
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date: new Date(order.createdAt),
      total
    };
  }, [orders, number, ingredients]);

  if (!orders.length || !ingredients.length) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <p className='text text_type_main-medium'>Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
