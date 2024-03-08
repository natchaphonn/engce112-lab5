import type { Prisma } from "@prisma/client";
import { TIMESTAMP_SELECT } from "./timestamp";

export const BASE_COFFEE_SELECT = {
  id: true,
  name: true,
  stock: true,
  maxOrder: true,
  roastedLevel: true,
  price: true,
  type: true,
} satisfies Prisma.CoffeeSelect;

export const COFFEE_SELECT = {
  ...BASE_COFFEE_SELECT,
  ...TIMESTAMP_SELECT,
} satisfies Prisma.CoffeeSelect;
