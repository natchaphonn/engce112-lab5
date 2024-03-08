import type { Middleware } from "@oakserver/oak";

export default function cors(): Middleware {
  return (ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Access-Control-Allow-Methods", "*");
    ctx.response.headers.set("Access-Control-Allow-Headers", "*");
    return next();
  };
}
