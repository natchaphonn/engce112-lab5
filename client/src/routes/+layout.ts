import type { LayoutLoad } from './$types';

export let ssr = false;
export let prerender = true;

export const load = (() => {
  return {};
}) satisfies LayoutLoad;
