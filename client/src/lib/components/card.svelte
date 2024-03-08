<script lang="ts">
  import classes from 'svelte-transition-classes';
  import useCart from '$lib/stores/product.svelte';
  import ProductImage from '$lib/assets/product.png';
  import type { Coffee } from '$lib/types';

  let { ...coffee } = $props<Coffee>();

  const cart = useCart();

  let empty = $state(false);
  let change = $state(false);
  let qty = $state(0);

  function toCart() {
    empty = qty === 0;
    change = qty !== 0;

    if (change) {
      cart.order.qty = qty;
      cart.order.coffee = coffee;
    }

    setTimeout(() => {
      empty = false;
      change = false;
    }, 1000);
  }

  function chQty(opt: 'inc' | 'dec') {
    if (opt === 'inc' && coffee.stock === 0) return;
    if (opt === 'inc' && qty === coffee.maxOrder) return;

    qty = qty + (opt === 'inc' ? 1 : -1);

    if (opt === 'inc' && qty >= coffee.stock) qty = coffee.stock;
    if (opt === 'dec' && qty <= 0) qty = 0;
  }

  function handleInputChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const value = parseFloat(element.value) || 0;
    qty = value > coffee.maxOrder ? coffee.maxOrder : value;
  }
</script>

<div class="bg-white rounded-md shadow-lg min-w-70">
  <div class="flex justify-center">
    <img
      class="rounded-t-lg object-contain h-70 w-70 justify-center"
      class:grayscale={coffee.stock === 0}
      src={ProductImage}
      alt="product name"
    />
  </div>
  <div class="px-5 pb-8">
    <div class="flex items-center justify-between">
      <span class="text-xl font-semibold tracking-tight text-stone-800">
        {coffee.name}
      </span>
      <span class="text-lg font-bold text-orange-900">฿{coffee.price}</span>
    </div>

    <span class="text-stone-800 font-bold">
      {coffee.type}
    </span>

    <div>
      <span class="text-sm text-stone-500 pb-10">คงเหลือ: {coffee.stock} กิโลกรัม</span>
      <form class="max-w-full mx-auto mt-3">
        <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900">
          ระบุขนาด (กิโลกรัม):
        </label>
        <div class="relative flex items-center w-full">
          <button
            type="button"
            id="decrement-button"
            onclick={() => chQty('dec')}
            class="bg-stone-100 border border-stone-300 rounded-s-lg p-3 h-11 hover:bg-stone-200 cursor-pointer"
          >
            <div class="i-mdi:minus h-3 w-3"></div>
          </button>
          <input
            id="quantity-input"
            type="text"
            max={coffee.maxOrder}
            oninput={(e) => handleInputChange(e)}
            class="bg-stone-50 border-x-0 border border-stone-300 h-11 text-center text-stone-900 text-sm w-full block py-2.5"
            bind:value={qty}
            required
          />
          <button
            type="button"
            id="increment-button"
            class="bg-stone-100 border border-stone-300 rounded-e-lg p-3 h-11 hover:bg-stone-200 cursor-pointer"
            onclick={() => chQty('inc')}
          >
            <div class="i-mdi:plus h-3 w-3"></div>
          </button>
        </div>
        <p
          class="mt-2 text-xs font-medium transtion duration-300"
          class:text-stone-500={!empty}
          class:text-red={empty}
          class:shake={empty}
        >
          ระบุขนาดที่ต้องการก่อนกด เพิ่มลงในรถเข็น
        </p>
      </form>
    </div>

    <div class="flex items-center justify-center mt-5">
      <button
        disabled={coffee.stock === 0 ? true : false}
        onclick={toCart}
        class="w-full text-white bg-orange-900 hover:bg-orange-950 font-medium rounded-md text-sm py-2.5 text-center cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed"
      >
        <span>{coffee.stock === 0 ? 'สินค้าหมด' : 'เพิ่มลงในรถเข็น'}</span>
      </button>
    </div>
  </div>
</div>

<!-- Toast -->
{#if change}
  <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2" style="z-index: 1;">
    <div
      class="flex items-center w-full max-w-xs p-4 mb-4 text-stone-500 bg-white rounded-lg shadow-lg"
      role="alert"
      in:classes={{
        duration: 300,
        base: 'ease-out duration-300',
        from: 'translate-y-full',
        to: 'translate-y-0',
      }}
      out:classes={{
        duration: 200,
        base: 'ease-in duration-200',
        from: 'opacity-100',
        to: 'opacity-0',
      }}
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
      >
        <div class="i-mdi:cart-outline h-5 w-5 text-green-800"></div>
      </div>
      <div class="ms-3 text-sm font-normal">เพิ่มสินค้าลงในรถเข็นแล้ว</div>
      <button
        onclick={() => (change = false)}
        type="button"
        class="cursor-pointer text-stone-400 bg-transparent hover:bg-gray-200 hover:text-stone-800 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        data-modal-hide="default-modal"
      >
        <div class="i-mdi:close h-6 w-6"></div>
      </button>
    </div>
  </div>
{/if}

<style>
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(3px);
    }
    40% {
      transform: translateX(-3px);
    }
    60% {
      transform: translateX(3px);
    }
    80% {
      transform: translateX(-3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  .shake {
    animation: shake 0.3s ease-in-out forwards;
  }
</style>
