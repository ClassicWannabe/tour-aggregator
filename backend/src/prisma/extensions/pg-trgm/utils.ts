import {
  Comparator,
  comparators,
  Operation,
  operations,
  Order,
  orders,
} from './types';

export const isOperation = (x: any): x is Operation => operations.includes(x);

export const isComparator = (x: any): x is Comparator =>
  comparators.includes(x);

export const isOrder = (x: any): x is Order => orders.includes(x);
