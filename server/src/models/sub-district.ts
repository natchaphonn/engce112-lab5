import type { Prisma } from "@prisma/client";
import { BASE_PROVINCE_SELECT } from "./province";
import { BASE_DISTRICT_SELECT } from "./district";

export const BASE_SUB_DISTRICT_SELECT = {
  id: true,
  name: true,
} satisfies Prisma.SubDistrictSelect;

export const SUB_DISTRICT_SELECT = {
  ...BASE_SUB_DISTRICT_SELECT,
  district: {
    select: {
      ...BASE_DISTRICT_SELECT,
      province: {
        select: BASE_PROVINCE_SELECT,
      },
    },
  },
} satisfies Prisma.SubDistrictSelect;
