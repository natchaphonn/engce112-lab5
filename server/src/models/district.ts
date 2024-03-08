import type { Prisma } from "@prisma/client";
import { BASE_PROVINCE_SELECT } from "./province";

export const BASE_DISTRICT_SELECT = {
  id: true,
  name: true,
} satisfies Prisma.DistrictSelect;

export const DISTRICT_SELECT = {
  ...BASE_DISTRICT_SELECT,
  province: { select: BASE_PROVINCE_SELECT },
} satisfies Prisma.DistrictSelect;
