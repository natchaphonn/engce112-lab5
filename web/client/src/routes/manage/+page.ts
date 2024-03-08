import { env } from '$env/dynamic/public';
import type { Coffee } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  return {
    coffee: (await fetch(`${env.PUBLIC_BACKEND_URL}/coffee`).then((r) => r.json())) as Coffee[],
  };
}) satisfies PageLoad;
