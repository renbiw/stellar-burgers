import { FeedState } from '../../../services/slices/feedSlice';

export type FeedInfoUIProps = {
  feed: FeedState;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
