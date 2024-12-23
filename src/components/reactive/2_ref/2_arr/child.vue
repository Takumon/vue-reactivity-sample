<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'
import MyBtn from '../../MyBtn.vue'

const title = 'ref array 子'
useLifeCycleDitector(title, 1)

const props = defineProps<{
  vArr: string[]
  a: string
}>()

const count1 = ref(0)
watch(
  () => props.vArr,
  () => count1.value++,
)

const count2 = ref(0)
watch(
  () => props.vArr[0],
  () => count2.value++,
)

const count3 = ref(0)
watch(
  () => props.a,
  () => count3.value++,
)
function swapArrayItem() {
  props.vArr = ['str1⇔子から', ['str2⇔子から']]
}

function swapArrayItem0() {
  props.vArr[0] = 'str1+子から'
}

function swapArrayItem1() {
  props.vArr[1] = ['str2++子から']
}

function swapArrayItem1Props() {
  props.vArr[1][0] = 'str2⇔⇔子から'
}
</script>
<template>
  <TabPageContainer :title="title">
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props)">{{ isReactive(props) }}</MyLi>
        <MyLi label="isReadonly(props)">{{ isReadonly(props) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vArr)">{{ isReactive(props.vArr) }}</MyLi>
        <MyLi label="isReadonly(props.vArr)">{{ isReadonly(props.vArr) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vArr[1])">{{ isReactive(props.vArr[1]) }}</MyLi>
        <MyLi label="isReadonly(props.vArr[1])">{{ isReadonly(props.vArr[1]) }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="props.vArr">{{ vArr }}</MyLi>
      <MyLi label="props.a ※親で再代入">{{ a }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapArrayItem">props.vArrを変更 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapArrayItem0">props.vArr[0]を変更</MyBtn>
      <MyBtn @click="swapArrayItem1">props.vArr[1]を変更</MyBtn>
      <MyBtn @click="swapArrayItem1Props">props.vArr[1][0]を変更</MyBtn>
    </template>

    <template #watch>
      <MyLi label="() => props.vArr">{{ count1 }}</MyLi>
      <MyLi label="() => props.vArr[0]">{{ count2 }}</MyLi>
      <MyLi label="() => props.a ※親で再代入">{{ count3 }}</MyLi>
    </template>
  </TabPageContainer>
</template>
