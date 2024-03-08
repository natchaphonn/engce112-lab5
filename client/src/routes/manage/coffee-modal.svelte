<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { fade } from 'svelte/transition';
  import classes from 'svelte-transition-classes';

  type ActionAdd = {
    action: 'add';
    onAction: Function;
  };

  type ActionEdit = {
    action: 'edit';
    onAction: Function;
    id: string;
    name?: string;
    stock?: number;
    maxOrder?: number;
    roastedLevel?: number;
    price?: number;
    type?: string;
  };

  let { ...props } = $props<ActionAdd | ActionEdit>();
    //------------------------------------------------------------------------
  let name = $state((props.action === 'edit' && props.name) || '');
  let stock = $state((props.action === 'edit' && props.stock) || 0);
  let maxOrder = $state((props.action === 'edit' && props.maxOrder) || 1);
  let roastedLevel = $state((props.action === 'edit' && props.roastedLevel) || 0);
  let price = $state((props.action === 'edit' && props.price) || 0);
  let type = $state((props.action === 'edit' && props.type) || '');
  let open = $state<boolean>(false);
  //------------------------------------------------------------------------

  $inspect(stock);

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    console.log(
      `name: ${name}\n`,
      `stock: ${stock}\n`,
      `maxOrder: ${maxOrder}\n`,
      `roastedLevel: ${roastedLevel}\n`,
      `price: ${price}\n`,
      `type: ${type}\n`,
      `open: ${open}\n`,
    );
    //---------------------------------------------------------------------
    switch (props.action) {
      case 'add': {
        // send request to backend to add data
        const res = await fetch( `${env.PUBLIC_BACKEND_URL}/coffee`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            stock,
            maxOrder,
            roastedLevel,
            price,
            type,
            open,
          }),
        }).catch((e) => console.error( 'Error:', e ));

        if( !res ) return;
        if ( !res.ok ) return console.error( 'Failed to add coffee: ', await res.text() );

        console.log('Coffee added successfully!');
        props.onAction();
        open = false;
        break;
      }
      case 'edit': {
        console.log( `${env.PUBLIC_BACKEND_URL}/coffee/${props.id}` )
        const res = await fetch(`${env.PUBLIC_BACKEND_URL}/coffee/${props.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            stock,
            maxOrder,
            roastedLevel,
            price,
            type,
            open,
          }),
        }).catch((e) => console.error('Error: ', e));

        if (!res) return;
        if (!res.ok) return console.error('Failed to edit coffee: ', await res.text());

        // send request to backend to update data
        console.log('Coffee editted successfully!');
        props.onAction();
        open = false;
        break;
      }
    }//---------------------------------------------------------------------
  }
</script>
{#if props.action === 'add'}
  <button
    onclick={() => (open = true)}
    class="cursor-pointer rounded-md px-4 py-2 mb-4 flex items-center shadow-md text-sm text-white bg-blue-500 hover:bg-blue-400"
    ><div class="i-mdi:plus h-4 w-4 mr-2" />
    เพิ่มสินค้า
  </button>
{/if}

{#if props.action === 'edit'}
  <button onclick={() => (open = true)} class="bg-transparent cursor-pointer p-2"
    ><div class="i-mdi:pencil-outline h-6 w-6 text-stone-400 hover:text-blue" /></button
  >
{/if}

{#if open}
  <!-- Overlay -->
  <div
    style="z-index: 1;"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="relative p-4 w-auto max-h-full"
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
            {props.action === 'add' ? 'เพิ่มสินค้า' : 'แก้ไขสินค้า'}
          </span>
        </div>
        <!-- Modal body -->
        <form class="px-4 py-4 flex flex-col gap-6" onsubmit={submit}>
          <div>
            <label for="name" class="block mb-2 text-sm font-medium">ชื่อ</label>
            <div class="relative">
              <input
                required
                bind:value={name}
                type="text"
                id="name"
                name="name"
                class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ชื่อสินค้า"
              />
            </div>
          </div>

          <div>
            <label for="type" class="block mb-2 text-sm font-medium">ประเภท</label>
            <div class="relative">
              <input
                required
                bind:value={type}
                type="text"
                id="type"
                name="type"
                class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ประเภทสินค้า"
              />
            </div>
          </div>

          <div class="flex flex-row gap-x-4">
            <div>
              <label for="roastedLevel" class="block mb-2 text-sm font-medium">ระดับการคั่ว</label>
              <div class="relative">
                <input
                  required
                  bind:value={roastedLevel}
                  type="number"
                  id="roastedLevel"
                  name="roastedLevel"
                  class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ระดับการคั่ว (ตัวเลข)"
                />
              </div>
            </div>

            <div>
              <label for="stock" class="block mb-2 text-sm font-medium">ขนาดคงเหลือ</label>
              <div class="relative">
                <input
                  required
                  bind:value={stock}
                  type="number"
                  id="stock"
                  name="stock"
                  class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ขนาดคงเหลือ (กิโลกรัม)"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row gap-x-4">
            <div>
              <label for="maxOrder" class="block mb-2 text-sm font-medium"
                >ยอดสูงสุดที่สั่งได้</label
              >
              <div class="relative">
                <input
                  required
                  bind:value={maxOrder}
                  type="number"
                  id="maxOrder"
                  name="maxOrder"
                  class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ยอดสูงสุดที่สั่งได้"
                />
              </div>
            </div>

            <div>
              <label for="price" class="block mb-2 text-sm font-medium">ราคา</label>
              <div class="relative">
                <input
                  required
                  bind:value={price}
                  type="number"
                  id="price"
                  name="price"
                  class="w-full rounded-md border border-stone-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ราคาต่อกิโลกรัม"
                />
              </div>
            </div>
          </div>
          <div class="p-4 mt-4 flex flex-row justify-end gap-x-4">
            <button
              type="button"
              onclick={() => (open = false)}
              class="cursor-pointer rounded-md px-4 py-2 mb-4 flex items-center text-sm text-blue-500 border border-blue-500 bg-transparent hover:bg-blue-100"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              class="cursor-pointer rounded-md px-4 py-2 mb-4 flex items-center text-sm text-white bg-blue-500 hover:bg-blue-400"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
