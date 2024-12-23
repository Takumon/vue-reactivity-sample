<script setup lang="ts">
import { VBtn } from 'vuetify/components'

defineProps<{
  onClick: (typeof VBtn)['onClick']
}>()
</script>
<template>
  <v-btn color="secondary" class="justify-start multi-line" @click="onClick"><slot></slot></v-btn>
</template>

<style scoped>
.multi-line {
  text-transform: none; /* テキストの大文字・小文字を変換しない */
  white-space: normal; /* テキストを折り返す */
  line-height: 1.4; /* 行間を調整（好みで変更） */
}
</style>
