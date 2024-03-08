import type { PageLoad } from './$types';
import type { Province } from '$lib/types';
import { env } from '$env/dynamic/public';

export const load = (async ({ fetch }) => {
  return {
    province: (await fetch(`${env.PUBLIC_BACKEND_URL}/province`).then((r) =>
      r.json(),
    )) as Province[],
  };
}) satisfies PageLoad;
