import { z } from "zod";
import { Router, Status, helpers } from "@oakserver/oak";
import { PrismaClient } from "@prisma/client";
import { VILLAGE_SELECT } from "../models/village";
import { SUB_DISTRICT_SELECT } from "../models/sub-district";
import { DISTRICT_SELECT } from "../models/district";
import { PROVINCE_SELECT } from "../models/province";

const router = new Router();
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

router.get("/village", async (ctx) => {
  const schema = z.object({
    name: z.string().optional(),
    provinceId: z.string().length(2).optional(),
    districtId: z.string().length(4).optional(),
    subDistrictId: z.string().length(6).optional(),
  });

  const validate = await schema.safeParseAsync(helpers.getQuery(ctx));

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Query Parameters");

  const result = await prisma.village.findMany({
    select: VILLAGE_SELECT,
    where: {
      subDistrict: {
        name: validate.data.name,
        id: validate.data.subDistrictId,
        district: {
          id: validate.data.districtId,
          province: {
            id: validate.data.provinceId,
          },
        },
      },
    },
    orderBy: [{ id: "desc" }],
  });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = result;
  }
});

router.get("/sub-district", async (ctx) => {
  const schema = z.object({
    name: z.string().optional(),
    provinceId: z.string().length(2).optional(),
    districtId: z.string().length(4).optional(),
  });

  const validate = await schema.safeParseAsync(helpers.getQuery(ctx));

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Query Parameters");

  const result = await prisma.subDistrict.findMany({
    select: SUB_DISTRICT_SELECT,
    where: {
      name: validate.data.name,
      district: {
        id: validate.data.districtId,
        province: {
          id: validate.data.provinceId,
        },
      },
    },
    orderBy: [{ id: "desc" }],
  });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = result;
  }
});

router.get("/district", async (ctx) => {
  const schema = z.object({
    name: z.string().optional(),
    provinceId: z.string().length(2).optional(),
  });

  const validate = await schema.safeParseAsync(helpers.getQuery(ctx));

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Query Parameters");

  const result = await prisma.district.findMany({
    select: DISTRICT_SELECT,
    where: {
      name: validate.data.name,
      province: {
        id: validate.data.provinceId,
      },
    },
    orderBy: [{ id: "desc" }],
  });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = result;
  }
});

router.get("/province", async (ctx) => {
  const schema = z.object({
    name: z.string().optional(),
    postCode: z.string().length(5).optional(),
  });

  const validate = await schema.safeParseAsync(helpers.getQuery(ctx));

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Query Parameters");

  const result = await prisma.province.findMany({
    select: PROVINCE_SELECT,
    where: {
      id: validate.data.postCode?.substring(0, 2),
    },
    orderBy: [{ id: "desc" }],
  });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = result;
  }
});

export default router;
