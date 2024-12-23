<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'array 子'
useLifeCycleDitector(title, 1)

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vArray: any[]
}>()

const countArray1 = ref(0)
watch(props.vArray, () => countArray1.value++)

const countArray2 = ref(0)
watch(
  () => props.vArray,
  () => countArray2.value++,
)
const countArray3 = ref(0)
watch(
  () => props.vArray[0],
  () => countArray3.value++,
)
</script>
<template>
  <TabPageContainer :title="title">
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props)">{{ isReactive(props) }}</MyLi>
        <MyLi label="isReadonly(props)">{{ isReadonly(props) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vArray)">{{ isReactive(props.vArray) }}</MyLi>
        <MyLi label="isReadonly(props.vArray)">{{ isReadonly(props.vArray) }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="配列：props.vArray">
        {{ props.vArray }}
      </MyLi>
    </template>
    <template #watch>
      <MyLi label="props.vArray">{{ countArray1 }}</MyLi>
      <MyLi label="() => props.vArray">{{ countArray2 }}</MyLi>
      <MyLi label="() => props.vArray[0]">{{ countArray3 }}</MyLi>
    </template>
  </TabPageContainer>
</template>
