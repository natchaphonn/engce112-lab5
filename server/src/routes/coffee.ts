import z from "zod";
import consola from "consola";
import { Router, Status } from "@oakserver/oak";
import { PrismaClient } from "@prisma/client";
import { COFFEE_SELECT } from "../models/coffee";

const router = new Router();
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

router.get("/coffee", async (ctx) => {
  const result = await prisma.coffee.findMany({
    select: COFFEE_SELECT,
    orderBy: [{ createdAt: "desc" }],
  });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = result;
  }
});

router.get("/coffee/:id", async (ctx) => {
  const schema = z.object({ id: z.string().length(12) });
  const validate = await schema.safeParseAsync({ id: ctx.params.id });

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Body");

  const found = await prisma.coffee.findUnique({ select: COFFEE_SELECT, where: validate.data });

  if (found) {
    ctx.response.status = 200;
    ctx.response.body = found;
  }
});

router.post("/coffee", async (ctx) => {
  const coffee = z.object({
    name: z.string(),
    price: z.number(),
    stock: z.number().optional(),
    maxOrder: z.number().optional(),
    roastedLevel: z.number().optional(),
    type: z.string(),
  });
  const schema = z.union([coffee, coffee.array()]);

  const payload = await ctx.request.body().value;
  const validate = await schema.safeParseAsync(payload);

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Body");
  //------------------------------------------------------
  // check if input is array or not
  if (!Array.isArray( validate.data )) {
    await prisma.coffee.create({
      data: validate.data,
    });
  } else {
    // Add multiple data to database
    await prisma.coffee.createMany({
      data: validate.data,
    });
  }
  //------------------------------------------------------
  consola.success("Insert Success");
  ctx.response.status = 204;
});

router.patch("/coffee/:id", async (ctx) => {
  const schema = z.object({
    id: z.string().length(12),
    name: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    maxOrder: z.number().optional(),
    roastedLevel: z.number().optional(),
    type: z.string().optional(),
  });

  const payload = await ctx.request.body().value;
  const validate = await schema.safeParseAsync({ id: ctx.params.id, ...payload });

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Body");

  const { id, ...data } = validate.data;

  const updated = await prisma.coffee.updateMany({ data, where: { id } });

  if (!updated.count) ctx.throw(Status.NotFound);

  consola.success("Update Success");
  ctx.response.status = 204;
});

router.delete("/coffee/:id", async (ctx) => {
  const schema = z.object({ id: z.string().length(12) });
  const validate = await schema.safeParseAsync({ id: ctx.params.id });

  if (!validate.success) return ctx.throw(Status.UnprocessableEntity, "Invalid Body");

  const deleted = await prisma.coffee.deleteMany({ where: validate.data });

  if (!deleted.count) ctx.throw(Status.NotFound);

  consola.success("Delete Success");
  ctx.response.status = 204;
});

export default router;
