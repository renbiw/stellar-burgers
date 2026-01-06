import { FC, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { constructorItems } = useSelector((state) => state.burgerConstructor);

  const user = useSelector((state) => state.user.user);
  const { order, isLoading: orderLoading } = useSelector(
    (state) => state.order
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!constructorItems.bun) {
      return;
    }

    if (constructorItems.ingredients.length === 0) {
      return;
    }

    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ids));
  };

  useEffect(() => {
    if (!orderLoading && order) {
      navigate(`/order/${order.number}`, {
        state: { background: location }
      });
      dispatch(clearConstructor());
    }
  }, [orderLoading, order, navigate, location, dispatch]);

  const closeOrderModal = () => {
    navigate(-1);
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderLoading}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
