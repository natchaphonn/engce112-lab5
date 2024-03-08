import "./utils/websocket";
import { Application } from "@oakserver/oak";
import consola from "consola";
import cors from "./middlewares/cors.js";
import error from "./middlewares/error.js";
import coffeeRoute from "./routes/coffee.js";
import orderRoute from "./routes/order.js";
import villageRoute from "./routes/village.js";

// ESM Import don't need .ts extension as it will lookup .ts file automatically

const app = new Application();

app.use(cors());
app.use(error());
app.use(coffeeRoute.routes());
app.use(coffeeRoute.allowedMethods());
app.use(orderRoute.routes());
app.use(orderRoute.allowedMethods());
app.use(villageRoute.routes());
app.use(villageRoute.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  consola.start(`Listening on: ${secure ? "https://" : "http://"}${hostname}:${port}`);
});

await app.listen({ hostname: "0.0.0.0", port: 3000 });
