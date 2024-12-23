<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const props = defineProps<{
  vStr: string
}>()

const title = 'string 子'
useLifeCycleDitector(title, 1)

const countStr1 = ref(0)
watch(
  () => props.vStr,
  () => countStr1.value++,
)
</script>
<template>
  <TabPageContainer :title="title">
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <div class="d-flex flex-row ga-10">
          <MyLi label="isReactive(props)">{{ isReactive(props) }}</MyLi>
          <MyLi label="isReadonly(props)">{{ isReadonly(props) }}</MyLi>
        </div>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vStr)">{{ isReactive(props.vStr) }}</MyLi>
        <MyLi label="isReadonly(props.vStr)">{{ isReadonly(props.vStr) }}</MyLi>
      </div>
    </template>
    <template #value>
      <MyLi label="文字列：props.vStr">{{ props.vStr }}</MyLi>
    </template>
    <template #watch>
      <MyLi label="props.vStr">{{ countStr1 }}</MyLi>
    </template>
  </TabPageContainer>
</template>
