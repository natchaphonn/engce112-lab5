<script lang="ts">
  import { goto } from '$app/navigation';
  import { debounce } from '$lib';
  import useCart from '$lib/stores/product.svelte';
  import ProductImage from '$lib/assets/product.png';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';

  let { data } = $props();
  const cart = useCart();

  onMount(() => {
    console.log(cart.order);
  });

  let orderPrice = Number(cart.order.coffee?.price) * Number(cart.order.qty);
  let shippingPrice = 0;
  let totalPrice = orderPrice + shippingPrice;
  let zip = $state('');
  let provinceSelected = $state('');
  let districtSelected = $state('');
  let subDistrictSelected = $state('');
  let villageSelected = $state('');

  let provinceOption = data.province;

  let villageOption = $derived(
    (async () => {
      if (subDistrictSelected.length > 0) {
        const res = await fetch(
          `${env.PUBLIC_BACKEND_URL}/village?provinceId=${provinceSelected}&districtId=${districtSelected}&subDistrictId=${subDistrictSelected}`,
        );
        return await res.json();
      }
      return [];
    })(),
  );

  let subDistrictOption = $derived(
    (async () => {
      if (districtSelected.length > 0) {
        const res = await fetch(
          `${env.PUBLIC_BACKEND_URL}/sub-district?provinceId=${provinceSelected}&districtId=${districtSelected}`,
        );
        return await res.json();
      }
      return [];
    })(),
  );

  let districtOption = $derived(
    (async () => {
      if (provinceSelected.length > 0) {
        const res = await fetch(
          `${env.PUBLIC_BACKEND_URL}/district?provinceId=${provinceSelected}`,
        );
        return await res.json();
      }
      return [];
    })(),
  );

  async function getProvince(zip: string) {
    if (zip.length === 5) {
      provinceSelected = data.province.find((v) => v.id.slice(0, 2) === zip.slice(0, 2))?.id || '';
      districtSelected = '';
      subDistrictSelected = '';
      villageSelected = '';
    }
  }

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    const res = await fetch(`${env.PUBLIC_BACKEND_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cart.order.name,
        qty: cart.order.qty,
        coffeeId: cart.order.coffee?.id,
        villageId: villageSelected,
      }),
    }).catch((e) => console.error('Error: ', e));

    if (!res) return;
    if (!res.ok) return console.error('Failed to submit order:', await res.text());

    console.log('Order submitted successfully!');
    await goto('/status');
  }
</script>

<section>
  <div class="p-4">
    <span class="font-bold text-10 text-stone-800">สั่งซื้อ</span>
  </div>

  <div class="p-4 flex flex-row items-start gap-8">
    <div class="w-3/6 rounded-md shadow-lg bg-white p-4">
      {#if cart.order.qty}
        <div class="flex flex-row items-center w-full px-4 py-6">
          <div class="h-35 w-35 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
            <img
              class="h-full w-full object-cover object-center"
              src={ProductImage}
              alt={cart.order.coffee?.name}
            />
          </div>
          <div class="flex w-full flex-col ml-4">
            <span class="font-semibold text-xl">{cart.order.coffee?.name}</span>
            <span class="font-semibold">{cart.order.coffee?.type}</span>
            <span class="float-right text-stone-500 text-sm pt-3">
              จำนวน {cart.order.qty} กิโลกรัม
            </span>
            <span class="float-right text-stone-500 text-sm pb-3">
              ราคาต่อหน่วย(กิโลกรัม) ฿{cart.order.coffee?.price}
            </span>
            <span class="text-lg">฿{cart.order.qty ? orderPrice : '0'}</span>
          </div>
          <button onclick={cart.reset} class="flex items-center h-7 w-7 bg-white cursor-pointer">
            <div class="i-mdi:delete-outline h-6 w-6 text-stone-400 hover:text-red"></div>
          </button>
        </div>
      {:else}
        <span class="flex justify-center text-stone-500">ยังไม่มีสินค้า</span>
      {/if}
    </div>

    <div class="bg-white rounded-md shadow-lg px-4 lg:mt-0 w-3/6">
      <p class="text-xl font-medium">รายละเอียดการสั่งซื้อ</p>
      <p class="text-gray-400">ตรวจสอบรายละเอียดการสั่งซื้อให้ครบถ้วน</p>
      <div>
        <form onsubmit={submit}>
          <label for="name" class="mt-4 mb-2 block text-sm font-medium">ชื่อ นามสกุล</label>
          <div class="relative">
            <input
              required
              type="text"
              id="name"
              name="name"
              bind:value={cart.order.name}
              class="w-full rounded-md border border-stone-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="นายกอไก่ ขอไข่"
            />
            <div class="absolute inset-y-0 left-0 inline-flex items-center px-3">
              <div class="i-mdi:account-circle-outline h-4 w-4 text-stone-400"></div>
            </div>
          </div>

          <label for="address" class="mt-4 mb-2 block text-sm font-medium">
            ที่อยู่ในการจัดส่ง
          </label>
          <div class="flex flex-col gap-y-2">
            <div class="flex flex-row gap-x-2">
              <input
                required
                bind:value={zip}
                on:input={debounce(() => getProvince(zip), 500)}
                type="text"
                name="address-zip"
                maxlength="5"
                class="w-2/6 rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="รหัสไปรษณีย์"
              />
              <select
                required
                bind:value={provinceSelected}
                name="address-province"
                class="w-4/6 rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option selected disabled hidden value="">เลือกจังหวัด</option>
                {#each provinceOption as province (province.id)}
                  <option
                    value={province.id}
                    selected={province.id === provinceSelected ? true : false}
                  >
                    {province.name}
                  </option>
                {/each}
              </select>
            </div>

            <div class="flex flex-row gap-x-2">
              <select
                required
                bind:value={districtSelected}
                disabled={provinceSelected.length === 0}
                name="address-district"
                class="w-2/6 rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option selected disabled hidden value="">เลือกอำเภอ</option>
                {#await districtOption then options}
                  {#each options as district (district.id)}
                    <option value={district.id}>{district.name}</option>
                  {/each}
                {/await}
              </select>

              <select
                required
                bind:value={subDistrictSelected}
                disabled={districtSelected.length === 0}
                name="address-sub-district"
                class="w-2/6 rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option selected disabled hidden value="">เลือกตำบล</option>
                {#await subDistrictOption then options}
                  {#each options as subDistrict (subDistrict.id)}
                    <option value={subDistrict.id}>{subDistrict.name}</option>
                  {/each}
                {/await}
              </select>

              <select
                required
                bind:value={villageSelected}
                disabled={subDistrictSelected.length === 0}
                name="address-sub-district"
                class="w-2/6 rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option selected disabled hidden value="">เลือกหมู่บ้าน</option>
                {#await villageOption then options}
                  {#each options as village (village.id)}
                    <option value={village.id}>{village.name}</option>
                  {/each}
                {/await}
              </select>
            </div>

            <!-- Total -->
            <div class="mt-6 border-t border-b border-stone-200 py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-stone-800">ราคารวม</p>
                <p class="font-semibold text-stone-800">
                  ฿{cart.order.qty ? orderPrice : '0'}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-stone-800">ค่าจัดส่ง</p>
                <p class="font-semibold text-stone-800">฿{shippingPrice}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-stone-800">ราคาสุทธิ</p>
              <p class="text-2xl font-semibold text-stone-800">
                ฿{cart.order.qty ? totalPrice : '0'}
              </p>
            </div>
          </div>
          <button
            type="submit"
            class="cursor-pointer no-underline flex justify-center items-center mt-4 mb-8 w-full rounded-md bg-orange-900 hover:bg-orange-950 px-6 py-3 font-medium text-white"
          >
            สั่งซื้อสินค้า
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
