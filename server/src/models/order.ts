import type { Prisma } from "@prisma/client";
import { TIMESTAMP_SELECT } from "./timestamp";
import { BASE_COFFEE_SELECT } from "./coffee";
import { BASE_VILLAGE_SELECT } from "./village";
import { BASE_SUB_DISTRICT_SELECT } from "./sub-district";
import { BASE_DISTRICT_SELECT } from "./district";
import { BASE_PROVINCE_SELECT } from "./province";

export const BASE_ORDER_SELECT = {
  id: true,
  name: true,
  status: true,
  qty: true,
} satisfies Prisma.OrderSelect;

export const ORDER_SELECT = {
  ...BASE_ORDER_SELECT,
  ...TIMESTAMP_SELECT,
  coffee: { select: BASE_COFFEE_SELECT },
  village: {
    select: {
      ...BASE_VILLAGE_SELECT,
      subDistrict: {
        select: {
          ...BASE_SUB_DISTRICT_SELECT,
          district: {
            select: {
              ...BASE_DISTRICT_SELECT,
              province: {
                select: BASE_PROVINCE_SELECT,
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.OrderSelect;
