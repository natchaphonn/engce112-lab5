<script lang="ts">
  import { onMount } from 'svelte';

  let scrollPosition = 0;
  let showButton = $state<boolean>(false);
  const scrollThreshold = 500;

  onMount(() => {
    window.addEventListener('scroll', () => {
      scrollPosition = window.scrollY;
      showButton = scrollPosition > scrollThreshold;
    });
  });

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
</script>

<button
  on:click={goToTop}
  class={`fixed bottom-5 right-5 ${
    showButton ? '' : 'invisible'
  } cursor-pointer animate-bounce fixed bottom-5 right-5 shadow-lg bg-orange-900 opacity-60 hover:opacity-100 text-white font-bold py-2 px-2 rounded-full`}
>
  <div class="i-mdi:arrow-up h-8 w-8 text-white"></div>
</button>
