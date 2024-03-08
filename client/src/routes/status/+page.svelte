<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { env } from '$env/dynamic/public';
  import { OrderStatus } from '$lib/types.js';
  import { io } from 'socket.io-client';

  let { data } = $props();

  let order = $state(data.order);
  let statusOption = Object.values(OrderStatus);

  $effect(() => {
    const socket = io(`${env.PUBLIC_SOCKET_URL}`);

    socket.on('OrderReceived', invalidateAll);
    socket.on('OrderCanceled', invalidateAll);
    return () => {
      socket.close();
    };
  });

  async function changeStatus(id: string, status: OrderStatus) {
    const res = await fetch(`${env.PUBLIC_BACKEND_URL}/order/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: status,
      }),
    }).catch((e) => console.error('Error: ', e));

    if (!res) return;
    if (!res.ok) return console.error('Failed to change status:', await res.text());

    console.log('Status editted successfully!');
  }

  $effect(() => {
    order = data.order;

    return () => {};
  });
</script>

<section>
  <div class="mx-12 pt-10 px-4">
    <span class="font-bold text-5 text-stone-800">รายการสั่งซื้อ</span>
  </div>

  <div class="px-4 mx-12 mt-6 pb-10">
    <div class="relative overflow-x-auto shadow-md rounded-md">
      <table class="w-full text-sm text-left rtl:text-right text-stone-500">
        <thead class="text-xs text-stone-900 uppercase bg-stone-300">
          <tr>
            <th scope="col" class="px-6 py-3"> ชื่อ </th>
            <th scope="col" class="px-6 py-3"> ที่อยู่ </th>
            <th scope="col" class="px-6 py-3"> สินค้า </th>
            <th scope="col" class="px-6 py-3"> ขนาด (กิโลกรัม) </th>
            <th scope="col" class="px-6 py-3"> สถานะ </th>
          </tr>
        </thead>
        <tbody>
          {#if order.length > 0}
            {#each order as item (item.id)}
              <tr class="bg-white border-t border-stone-200 hover:bg-stone-100">
                <td class="px-6 py-4"> {item.name} </td>
                <td class="px-6 py-4">
                  {`${item.village.name} ต.${item.village.subDistrict.name} อ.${item.village.subDistrict.district.name} จ.${item.village.subDistrict.district.province.name}`}
                </td>
                <td class="px-6 py-4"> {item.coffee.name} </td>
                <td class="px-6 py-4"> {item.qty} </td>
                <td class="px-6 py-4">
                  <!-- {item.status} -->
                  <select
                    bind:value={item.status}
                    on:change={() => changeStatus(item.id, item.status)}
                    name="order-status"
                    class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  >
                    {#each statusOption as status, idx (status)}
                      <option
                        value={status}
                        selected={status === item.status ? true : false}
                        class="disabled:(text-gray-300 bg-gray-100) p-4"
                        disabled={idx < statusOption.indexOf(item.status) ||
                          (status === 'CANCELED' && statusOption.indexOf(item.status) > 0)}
                      >
                        {status}
                      </option>
                    {/each}
                  </select>
                </td>
              </tr>
            {/each}
          {:else}
            <tr class="bg-white border-t border-stone-200 hover:bg-stone-100">
              <td colspan="5" class="px-6 py-4 text-center font-medium whitespace-nowrap">
                ยังไม่มีข้อมูล
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>
