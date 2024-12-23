<script setup lang="ts">
import { isReadonly, isRef, ref, watch } from 'vue'
import RefChild from './child.vue'
import MyBtn from '../../MyBtn.vue'
import MyLi from '../../MyLi.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'array 親'
useLifeCycleDitector(title, 0)

const item = { d: 'd' }
let vArray = ['a', 'b', 'c', item]
const countArray1 = ref(0)
watch(vArray, () => countArray1.value++)

const countArray2 = ref(0)
watch(
  () => vArray,
  () => countArray2.value++,
)
const countArray3 = ref(0)
watch(
  () => vArray[0],
  () => countArray3.value++,
)

const log = () => {
  console.log('変更後', 'item = ', item, ', vArray = ', vArray)
}
const swapArray = () => {
  vArray = ['swap-a', 'swap-b', 'swap-c', { d: 'swap-d' }]
  log()
}
const changeArrayProp = () => {
  vArray[0] = vArray[0] + '+'
  log()
}
const changeArrayNestedProp = () => {
  vArray[3].d = vArray[3].d + '+'
  log()
}

const isRefVArray = () => isRef(vArray)
const isReadonlyVArray = () => isReadonly(vArray)
</script>
<template>
  <TabPageContainer :title="title" :summary="['・ 文字列の時と同様']">
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(vArray)">{{ isRefVArray() }}</MyLi>
        <MyLi label="isReadonly(vArray)">{{ isReadonlyVArray() }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="配列の要素：item">
        {{ item }}
      </MyLi>

      <MyLi label="配列：vArray = ['a', 'b', 'c', item]">
        {{ vArray }}
      </MyLi>
    </template>
    <template #watch>
      <MyLi label="vArray">{{ countArray1 }}</MyLi>
      <MyLi label="() => vArray">{{ countArray2 }}</MyLi>
      <MyLi label="() => vArray[0]">{{ countArray3 }}</MyLi>
    </template>
    <template #action>
      <MyBtn @click="swapArray">配列を置換</MyBtn>
      <MyBtn @click="changeArrayProp">配列の最初の要素を置換</MyBtn>
      <MyBtn @click="changeArrayNestedProp">配列の要素のプロパティを置換</MyBtn>
    </template>
    <template #child>
      <RefChild
        v-bind="{
          vArray,
        }"
      />
    </template>
  </TabPageContainer>
</template>
