import type { Prisma } from "@prisma/client";
import { BASE_PROVINCE_SELECT } from "./province";
import { BASE_DISTRICT_SELECT } from "./district";
import { BASE_SUB_DISTRICT_SELECT } from "./sub-district";

export const BASE_VILLAGE_SELECT = {
  id: true,
  name: true,
  no: true,
} satisfies Prisma.VillageSelect;

export const VILLAGE_SELECT = {
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
} satisfies Prisma.VillageSelect;
