<script setup>
import { computed } from "vue";
import { useSanityStore } from "@/store/storeIndex";
import MenuItems from "./MenuItems.vue";

const store = useSanityStore();
const menu_is_active = computed(() => store.menu_is_active);
</script>
<template>
  <aside
    :class="`fixed top-0 left-0 min-h-screen pt-16 z-40 w-full max-w-xs transform duration-300 bg-gray-800 ${
      menu_is_active ? 'translate-x-0' : '-translate-x-full'
    }`"
  >
    <div class="p-4">
      <h2 class="text-gray-500 text-sm font-bold uppercase mb-2">Menu</h2>

      <div class="-mx-4">
        <MenuItems to="/">
          <span class="material-symbols-outlined mr-2"> home </span> Home
        </MenuItems>
        <MenuItems to="/authors">
          <span class="material-symbols-outlined mr-2"> group </span> Authors
        </MenuItems>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>
