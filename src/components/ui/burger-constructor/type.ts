import { TOrder } from '@utils-types';
import { TConstructorItems } from '../../../services/slices/constructorSlice';

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
