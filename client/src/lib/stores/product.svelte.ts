import { OrderStatus, type Order } from '$lib/types';

let order = $state<Partial<Order>>({
  status: OrderStatus.PENDING,
  qty: 0,
});

export default function useCart() {
  return {
    get order() {
      return order;
    },
    set order(v: typeof order) {
      order = v;
    },
    reset() {
      order = {
        status: OrderStatus.PENDING,
        qty: 0,
      };
    },
  };
}
