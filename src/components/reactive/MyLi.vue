<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
<template>
  <li class="mb-4">
    {{ label }} = <span class="text-caption border pa-1 rounded"><slot></slot></span>
  </li>
</template>
