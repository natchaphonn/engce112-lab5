<script lang="ts">
  import { fade } from 'svelte/transition';
  import classes from 'svelte-transition-classes';

  let { open } = $props<{ open: boolean }>();

  let register = $state(false);
</script>

{#if open}
  <!-- Overlay -->
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-100"
    transition:fade={{ duration: 300 }}
  >
    <div
      class="relative p-4 w-full max-w-md max-h-full"
      in:classes={{
        duration: 300,
        base: 'ease-out duration-300',
        from: 'opacity-0 translate-y-4',
        to: 'opacity-100 translate-y-0',
      }}
      out:classes={{
        duration: 200,
        base: 'ease-in duration-200',
        from: 'opacity-100 translate-y-0',
        to: 'opacity-0 translate-y-4',
      }}
    >
      <div class="relative bg-white rounded-md flex flex-col">
        <!-- Modal header -->
        <div class="p-2 flex justify-end">
          <button
            onclick={() => (open = false)}
            type="button"
            class="cursor-pointer text-stone-400 bg-transparent hover:bg-gray-200 hover:text-stone-800 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <div class="i-mdi:close h-6 w-6"></div>
          </button>
        </div>
        <div class="px-4 pb-4 flex flex-row justify-center">
          <span class="text-xl font-semibold text-stone-900">
            {#if register}
              ลงทะเบียน
            {:else}
              ลงชื่อเข้าใช้
            {/if}
          </span>
        </div>
        <!-- Modal body -->
        <div class="px-4 py-6 flex flex-col gap-4">
          <button
            type="button"
            class="cursor-pointer w-full text-stone-900 bg-white hover:bg-stone-200 border border-stone-200 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
          >
            <div class="i-logos:facebook h-6 w-6 me-2"></div>
            Facebook
          </button>
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-70 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
            <span
              class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
            >
              or
            </span>
          </div>
          <button
            type="button"
            class="cursor-pointer w-full text-stone-900 bg-white hover:bg-stone-200 border border-stone-200 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
          >
            <div class="i-logos:google-icon h-6 w-6 me-2"></div>
            Google
          </button>
        </div>
        <!-- Modal footer -->
        <div class="p-4 flex justify-center">
          <div class="text-sm font-medium text-stone-500 dark:text-gray-300">
            {#if register}
              มีบัญชีแล้ว?
              <button
                onclick={() => (register = false)}
                class="bg-white cursor-pointer text-blue-700 hover:underline"
              >
                ลงชื่อเข้าใช
              </button>
            {:else}
              ไม่มีบัญชีใช่ไหม?
              <button
                onclick={() => (register = true)}
                class="bg-white cursor-pointer text-blue-700 hover:underline"
              >
                ลงทะเบียน
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
