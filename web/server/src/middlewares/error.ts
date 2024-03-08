import { isHttpError, type Middleware, Status, STATUS_TEXT } from "@oakserver/oak";
import consola from "consola";

export default function error(): Middleware {
  return async (ctx, next) => {
    await next().catch((e: Error) => {
      if (!isHttpError(e)) consola.error(e.stack);

      ctx.response.status = isHttpError(e) ? e.status : Status.InternalServerError;
      ctx.response.body = isHttpError(e) ? e.message : "Unknown error, please try again later.";
    });

    if (ctx.response.status === Status.NotFound) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = STATUS_TEXT[Status.NotFound];
    }

    if (ctx.response.status === Status.MethodNotAllowed) {
      ctx.response.status = Status.MethodNotAllowed;
      ctx.response.body = STATUS_TEXT[Status.MethodNotAllowed];
    }
  };
}
