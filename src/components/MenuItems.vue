<script setup>
import { defineProps, toRefs } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(["to"]);

const { to } = toRefs(props);
</script>

<template>
  <RouterLink
    :to="to"
    class="flex items-center p-4 border-r-4 border-transparent text-gray-100 hover:text-white hover:bg-gray-900"
  >
    <slot />
  </RouterLink>
</template>

<style scoped>
.router-link-exact-active {
  @apply border-green-500 bg-gray-900;
}
</style>
