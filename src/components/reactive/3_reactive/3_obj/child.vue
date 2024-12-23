<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import MyBtn from '../../MyBtn.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const props = defineProps<{
  vObj: { a: string; b: { bb: string }; c?: string }
  a: string
  b: { bb: string }
  a1: string
  b1: { bb: string }
}>()

const title = 'reactive object 子'
useLifeCycleDitector(title, 1)

const swapObj = () => {
  props.vObj = { a: 'strA⇔子から', b: { bb: 'strB⇔子から' } }
}
const swapObjPropA = () => {
  props.vObj.a = 'strA+子から'
}

const swapObjPropB = () => {
  props.vObj.b = { bb: 'strB⇔⇔子から' }
}

const swapObjPropB_BB = () => {
  props.vObj.b = { bb: 'strB+子から' }
}

const pushObjProp = () => {
  props.vObj['c'] = 'strC子から'
}

const swapA = () => {
  props.a = 'strA+子から'
}

const swapB = () => {
  props.b = { bb: 'strB⇔⇔子から' }
}
const swapB_BB = () => {
  props.b.bb = 'strB⇔⇔子から'
}

const swapA1 = () => {
  props.a1 = 'strA+子から'
}

const swapB1 = () => {
  props.b1 = { bb: 'strB⇔⇔子から' }
}

const swapB1_BB = () => {
  props.b1.bb = 'strB⇔⇔子から'
}

const count1 = ref(0)
watch(props.vObj, () => count1.value++)

const count2 = ref(0)
watch(
  () => props.vObj,
  () => count2.value++,
)

const count3 = ref(0)
watch(
  () => props.vObj.a,
  () => count3.value++,
)

const count4 = ref(0)
watch(
  () => props.vObj.b,
  () => count4.value++,
)

const count5 = ref(0)
watch(
  () => props.a,
  () => count5.value++,
)

const d = isReadonly(props.vObj)
console.log('isReadonly(props.vObj)', d)
console.log('props', props)
console.log('props.vObj', props.vObj)
</script>
<template>
  <TabPageContainer :title="title">
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props)">{{ isReactive(props) }}</MyLi>
        <MyLi label="isReadonly(props)">{{ isReadonly(props) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vObj)">{{ isReactive(vObj) }}</MyLi>
        <MyLi label="isReadonly(props.vObj)">{{ isReadonly(vObj) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.vObj.b)">{{ isReactive(props.vObj.b) }}</MyLi>
        <MyLi label="isReadonly(props.vObj.b)">{{ isReadonly(props.vObj.b) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.a)">{{ isReactive(props.a) }}</MyLi>
        <MyLi label="isReadonly(props.a)">{{ isReadonly(props.a) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.b)">{{ isReactive(props.b) }}</MyLi>
        <MyLi label="isReadonly(props.b)">{{ isReadonly(props.b) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.a1)">{{ isReactive(props.a1) }}</MyLi>
        <MyLi label="isReadonly(props.a1)">{{ isReadonly(props.a1) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(props.b1)">{{ isReactive(props.b1) }}</MyLi>
        <MyLi label="isReadonly(props.b1)">{{ isReadonly(props.b1) }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="props.vObj">{{ vObj }}</MyLi>
      <MyLi label="props.a ※親で再代入">{{ a }}</MyLi>
      <MyLi label="props.a ※親で再代入">{{ b }}</MyLi>
      <MyLi label="props.a1 ※親でtoRefsで再代入">{{ a1 }}</MyLi>
      <MyLi label="props.a1 ※親でtoRefsで再代入">{{ b1 }}</MyLi>
    </template>

    <template #watch>
      <MyLi label="props.vObj">{{ count1 }}</MyLi>
      <MyLi label="() => props.vObj">{{ count2 }}</MyLi>
      <MyLi label="() => props.vObj.a">{{ count3 }}</MyLi>
      <MyLi label="() => props.vObj.b">{{ count4 }}</MyLi>
      <MyLi label="() => props.a ※親で再代入">{{ count5 }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapObj">props.vObjを置換 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapObjPropA">props.vObj.aを置換</MyBtn>
      <MyBtn @click="swapObjPropB">props.vObj.bを置換</MyBtn>
      <MyBtn @click="swapObjPropB_BB">props.vObj.b.bbを置換</MyBtn>
      <MyBtn @click="pushObjProp">props.vObjにcを追加</MyBtn>

      <MyBtn @click="swapA">props.aを置換 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapB">props.bを置換 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapB_BB">props.b.bbを置換</MyBtn>

      <MyBtn @click="swapA1">props.a1を置換 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapB1">props.b1を置換 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapB1_BB">props.b.bb1を置換</MyBtn>
    </template>
  </TabPageContainer>
</template>
