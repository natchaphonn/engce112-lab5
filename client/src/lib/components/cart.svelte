<script lang="ts">
  import useCart from '$lib/stores/product.svelte';
  import classes from 'svelte-transition-classes';
  import ProductImage from '$lib/assets/product.png';
  import { goto } from '$app/navigation';

  const cart = useCart();

  type Props = {
    open: boolean;
  };

  let { open } = $props<Props>();
</script>

{#if open}
  <!-- Overlay -->
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-200"
    role="button"
    tabindex="-1"
    onclick={() => (open = false)}
    onkeydown={() => void 0}
    in:classes={{
      duration: 300,
      base: 'ease-out duration-300',
      from: 'opacity-0',
      to: 'opacity-100',
    }}
    out:classes={{
      duration: 300,
      base: 'ease-in duration-200',
      from: 'opacity-100',
      to: 'opacity-0',
    }}
  >
    <div
      class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
      role="button"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={() => void 0}
    >
      <!-- Modal -->
      <div
        class="pointer-events-auto w-screen max-w-md"
        in:classes={{
          duration: 300,
          base: 'transition ease-in-out duration-300',
          from: 'translate-x-full',
          to: 'translate-x-0',
        }}
        out:classes={{
          duration: 150,
          base: 'transition ease-in-out duration-150',
          from: 'translate-x-0',
          to: 'translate-x-full',
        }}
      >
        <div class="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
          <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-medium text-stone-800" id="slide-over-title">รถเข็นสินค้า</h2>
              <div class="ml-3 flex h-7 items-center">
                <button
                  onclick={() => (open = false)}
                  type="button"
                  class="cursor-pointer text-stone-400 bg-transparent hover:bg-gray-200 hover:text-stone-800 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                >
                  <div class="i-mdi:close h-6 w-6"></div>
                </button>
              </div>
            </div>

            <div class="mt-8">
              <div class="flow-root">
                <ul role="list" class="-my-6 divide-y divide-stone-200">
                  <!-- Item -->
                  {#if cart.order.qty}
                    <li class="flex py-6">
                      <div
                        class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-stone-200"
                      >
                        <img
                          src={ProductImage}
                          alt={cart.order.coffee?.name}
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-stone-800">
                            <div>
                              <span>{cart.order.coffee?.name}</span>
                            </div>
                            <span class="ml-4">฿{cart.order.coffee?.price}</span>
                          </div>
                          <span class="mt-1 text-stone-800">
                            {cart.order.coffee?.type}
                          </span>
                        </div>
                        <div class="flex flex-1 justify-between items-center text-sm pt-3">
                          <p class="text-stone-500">
                            ขนาด {cart.order.qty} กิโลกรัม
                          </p>

                          <div class="flex">
                            <button
                              onclick={cart.reset}
                              type="button"
                              class="cursor-pointer bg-white font-medium text-blue-700 hover:underline"
                            >
                              ลบ
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  {:else}
                    <span class="flex justify-center text-stone-500">ยังไม่มีสินค้า</span>
                  {/if}
                </ul>
              </div>
            </div>
          </div>

          <div class="border-t border-stone-200 px-4 py-6 sm:px-6">
            <div class="flex justify-between text-base font-medium text-stone-800">
              <p>ราคารวม</p>
              <p>
                ฿{Number(cart.order.coffee?.price || 0) * Number(cart.order.qty ?? 0)}
              </p>
            </div>
            <p class="mt-0.5 text-sm text-stone-500">ค่าจัดส่งจะคำนวณหลังสั่งซื้อ</p>
            <div class="mt-6">
              <button
                onclick={async () => {
                  cart.order.qty ? (open = false) : '';
                  await goto('/checkout', {
                    state: true,
                  });
                }}
                class="flex w-full no-underline cursor-pointer items-center justify-center rounded-md bg-orange-900 hover:bg-orange-950 px-6 py-3 text-base font-medium text-white"
              >
                สั่งซื้อ
              </button>
            </div>
            <div class="mt-6 flex justify-center text-center text-sm text-stone-500">
              <p>
                หรือ
                <button
                  class="cursor-pointer font-medium bg-white text-blue-700"
                  onclick={() => (open = false)}
                >
                  เลือกสินค้าต่อ &rarr;
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
