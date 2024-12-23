<script setup lang="ts">
const props = defineProps<{
  title: string
  summary?: string[]
}>()
</script>
<template>
  <v-card class="pa-4">
    <h2 class="mb-2">{{ title }}</h2>
    <div class="d-flex flex-wrap flex-column ga-3">
      <template v-if="props.summary">
        <v-alert type="info" variant="outlined" title="ポイント">
          <ul>
            <li v-for="(text, index) in props.summary" :key="index">{{ text }}</li>
          </ul>
        </v-alert>
      </template>
      <ul>
        <slot name="summary"></slot>
      </ul>

      <template v-if="$slots.reactivity">
        <div><strong>値の性質</strong></div>
        <div class="pl-6">
          <ul>
            <slot name="reactivity"></slot>
          </ul>
        </div>
      </template>

      <template v-if="$slots.value">
        <div><strong>値</strong></div>
        <div class="pl-6">
          <ul>
            <slot name="value"></slot>
          </ul>
        </div>
      </template>

      <template v-if="$slots.watch">
        <div><strong>watchの実行回数</strong></div>
        <div class="pl-6">
          <ul>
            <slot name="watch"></slot>
          </ul>
        </div>
      </template>

      <slot name="action"> </slot>
      <template v-if="$slots.child">
        <div class="mt-12">
          <slot name="child"> </slot>
        </div>
      </template>
    </div>
  </v-card>
</template>
