<script lang="ts">
  import Card from '$lib/components/card.svelte';
  import BannerImage from '$lib/assets/banner.jpg';

  let { data } = $props();
</script>

<section>
  <div class="max-w-screen">
    <div
      class="py-24 flex flex-col items-center tracking-widest text-white"
      style:background={`url("${BannerImage}")`}
      style:background-size={'cover'}
    >
      <span class="text-5xl drop-shadow-2xl">COFFEE BEANS</span>
      <span class="text-5 drop-shadow-2xl">ขายส่งเมล็ดกาแฟ</span>
    </div>
  </div>
</section>

<section>
  <div class="p-4">
    <span class="font-bold text-10 text-stone-800">เมล็ดกาแฟ</span>
  </div>
  <div class="p-4 pt-0 gap-8 grid grid-cols-2 lg:grid-cols-4">
    {#each data.coffee as coffee}
      <Card {...coffee} />
    {/each}
  </div>
</section>
