<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import BackToTop from '$lib/components/back-to-top.svelte';
  import CoffeeModal from './coffee-modal.svelte';
  import DeleteCoffeeModal from './delete-coffee-modal.svelte';

  const { data } = $props();

  let coffee = $state(data.coffee);

  $effect(() => {
    coffee = data.coffee;

    return () => {};
  });
</script>

<section>
  <div class="mx-12 pt-10 px-4 flex-row flex justify-between">
    <span class="font-bold text-5 text-stone-800">จัดการสินค้า</span>
    <CoffeeModal action="add" onAction={() => invalidateAll()} />
  </div>

  <div class="px-4 mx-12 pb-10">
    <div class="relative overflow-x-auto shadow-md rounded-md">
      <table class="w-full text-sm text-left rtl:text-right text-stone-500">
        <thead class="text-xs text-stone-900 uppercase bg-stone-300">
          <tr>
            <th scope="col" class="px-6 py-3"> ชื่อ </th>
            <th scope="col" class="px-6 py-3"> ประเภท </th>
            <th scope="col" class="px-6 py-3"> ระดับของการคั่ว </th>
            <th scope="col" class="px-6 py-3"> ขนาดคงเหลือ (กิโลกรัม) </th>
            <th scope="col" class="px-6 py-3"> ยอดสูงสุดที่สั่งได้ </th>
            <th scope="col" class="px-6 py-3"> ราคา </th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {#if coffee.length > 0}
            {#each coffee as item (item.id)}
              <tr class="bg-white border-t border-stone-200 hover:bg-stone-100">
                <td class="px-6 py-4"> {item.name} </td>
                <td class="px-6 py-4"> {item.type} </td>
                <td class="px-6 py-4"> {item.roastedLevel} </td>
                <td class="px-6 py-4"> {item.stock} </td>
                <td class="px-6 py-4"> {item.maxOrder} </td>
                <td class="px-6 py-4"> {item.price} </td>
                <td class="px-6 py-4">
                  <CoffeeModal action="edit" {...item} onAction={() => invalidateAll()} />
                  <DeleteCoffeeModal id={item.id} onDelete={() => invalidateAll()} />
                </td>
              </tr>
            {/each}
          {:else}
            <tr class="bg-white border-t border-stone-200 hover:bg-stone-100">
              <td colspan="5" class="px-6 py-4 text-center font-medium whitespace-nowrap"
                >ยังไม่มีข้อมูล</td
              >
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>

<BackToTop />
