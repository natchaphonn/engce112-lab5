<script lang="ts">
  import '@unocss/reset/sanitize/sanitize.css';
  import '@unocss/reset/sanitize/assets.css';

  import 'uno.css';

  import '$lib/styles/app.css';

  import AuthModal from '$lib/components/auth-modal.svelte';
  import Cart from '$lib/components/cart.svelte';
  import Logo from '$lib/assets/coffee-beans.png';

  const { children } = $props();

  let cartState = $state(false);
  let authState = $state(false);
</script>

<article class=":uno: font-sans">
  <nav
    class="bg-white shadow-lg flex justify-between px-4 py-2 items-center w-full z-100 sticky top-0"
  >
    <a href="/" class="flex items-center space-x-4 no-underline">
      <img src={Logo} class="h-10" alt="Coffee Logo" />
      <span class="text-3xl font-bold text-stone-800">C O F F E E</span>
    </a>
    <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul class="flex flex-row space-x-8 my-0">
        <li class="flex items-center">
          <a href="/" class="no-underline">
            <span class="h-8 w-8 font-semibold text-stone-800 hover:text-orange-800">
              สินค้าทั้งหมด
            </span>
          </a>
        </li>
        <li class="flex items-center">
          <a href="/status" class="no-underline">
            <span class="h-8 w-8 font-semibold text-stone-800 hover:text-orange-800">
              รายการสั่งซื้อ
            </span>
          </a>
        </li>
        <li class="flex items-center">
          <a href="/manage" class="no-underline">
            <span class="h-8 w-8 font-semibold text-stone-800 hover:text-orange-800">
              จัดการสินค้า
            </span>
          </a>
        </li>
        <li class="flex items-center">
          <button onclick={() => (authState = true)} class="cursor-pointer bg-white">
            <div
              class="i-mdi:account-circle-outline h-8 w-8 hover:text-orange-800 transition duration-100"
            ></div>
          </button>
        </li>
      </ul>
    </div>
  </nav>

  {@render children()}

  <Cart bind:open={cartState} />
  <AuthModal bind:open={authState} />
</article>

<button
  onclick={() => (cartState = true)}
  class="cursor-pointer fixed bottom-2 drop-shadow-2xl right-2 block bg-white rounded-full p-3"
>
  <div class="i-mdi:cart-outline h-8 w-8 text-orange-800 transition duration-100"></div>
</button>
