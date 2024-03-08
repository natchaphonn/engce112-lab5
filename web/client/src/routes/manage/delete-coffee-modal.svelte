<script lang="ts">
  import { fade } from 'svelte/transition';
  import classes from 'svelte-transition-classes';
  import { env } from '$env/dynamic/public';

  let { id, onDelete } = $props<{
    id: string;
    onDelete: Function;
  }>();
  let open = $state<boolean>(false);

  async function submit() {
    // send request to backend to delete data using id
    const res = await fetch( `${env.PUBLIC_BACKEND_URL}/coffee/${id}`, {
      method: 'DELETE',
    })
    console.log('Delete Success');
    open = false;
    onDelete();
  }
</script>

<button onclick={() => (open = true)} class="bg-transparent cursor-pointer p-2">
  <div class="i-mdi:delete-outline h-6 w-6 text-stone-400 hover:text-red" />
</button>

{#if open}
  <!-- Overlay -->
  <div
    style="z-index: 1;"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="relative w-xl max-h-full"
      in:classes={{
        duration: 200,
        base: 'ease-out duration-200',
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
      <div class="relative bg-white rounded-md p-6 flex flex-col">
        <!-- Modal body -->
        <div class="flex flex-row items-center justify-start gap-x-12">
          <div class="i-mdi:alert h-24 w-24 text-red-500" />
          <div class="flex flex-col">
            <span class="text-stone-900 font-bold text-lg">ยืนยันการลบ</span>
            <span>คุณต้องการลบข้อมูลรายการนี้ใช่หรือไม่ กรุณายืนยันการลบ</span>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="mt-4 flex flex-row justify-end gap-x-4">
          <button
            onclick={() => (open = false)}
            class="cursor-pointer rounded-md px-4 py-2 mb-4 flex items-center text-sm text-red-500 border border-red-500 bg-transparent hover:bg-red-100"
          >
            ยกเลิก
          </button>
          <button
            onclick={submit}
            class="cursor-pointer rounded-md px-4 py-2 mb-4 flex items-center text-sm text-white bg-red-500 hover:bg-red-400"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
