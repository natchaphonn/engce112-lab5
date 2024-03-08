import { env } from '$env/dynamic/public';
import type { Order } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  return {
    order: (await fetch(`${env.PUBLIC_BACKEND_URL}/order`).then((r) => r.json())) as Order[],
  };
}) satisfies PageLoad;
