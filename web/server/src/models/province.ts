import type { Prisma } from "@prisma/client";

export const BASE_PROVINCE_SELECT = {
  id: true,
  name: true,
} satisfies Prisma.ProvinceSelect;

export const PROVINCE_SELECT = {
  ...BASE_PROVINCE_SELECT,
} satisfies Prisma.ProvinceSelect;
