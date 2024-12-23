<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'

const props = defineProps<{
  vObj: { a: string; item: { c: string } }
}>()

const countObj1 = ref(0)
watch(props.vObj, () => countObj1.value++)

const countObj2 = ref(0)
watch(
  () => props.vObj,
  () => countObj2.value++,
)

const countObj3 = ref(0)
watch(
  () => props.vObj.a,
  () => countObj3.value++,
)

const countObj4 = ref(0)
watch(
  () => props.vObj.item,
  () => countObj4.value++,
)

const countObj5 = ref(0)
watch(
  () => props.vObj.item.c,
  () => countObj5.value++,
)
</script>
<template>
  <TabPageContainer title="object 子" :indent="1">
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props)">{{ isReactive(props) }}</MyLi>
        <MyLi label="isReadonly(props)">{{ isReadonly(props) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vObj)">{{ isReactive(props.vObj) }}</MyLi>
        <MyLi label="isReadonly(props.vObj)">{{ isReadonly(props.vObj) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vObj.item)">{{ isReactive(props.vObj.item) }}</MyLi>
        <MyLi label="isReadonly(props.vObj.item)">{{ isReadonly(props.vObj.item) }}</MyLi>
      </div>
    </template>
    <template #value>
      <MyLi label="オブジェクト：props.vObj"> {{ props.vObj }} </MyLi>
    </template>
    <template #watch>
      <MyLi label="props.vObj">{{ countObj1 }}</MyLi>
      <MyLi label="() => props.vObj">{{ countObj2 }}</MyLi>
      <MyLi label="() => props.vObj.a">{{ countObj3 }}</MyLi>
      <MyLi label="() => props.vObj.item">{{ countObj4 }}</MyLi>
      <MyLi label="() => props.vObj.item.c">{{ countObj5 }}</MyLi>
    </template>
  </TabPageContainer>
</template>
