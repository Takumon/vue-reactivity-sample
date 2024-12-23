<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import MyBtn from '../../MyBtn.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const props = defineProps<{
  vObj: { a: string; b: { bb: string }; c?: string }
  a: string
}>()

const title = 'ref object 子'
useLifeCycleDitector(title, 1)

const swapObject = () => {
  props.vObj = { a: 'strA⇔子から', b: { bb: 'strB⇔子から' } }
}
const swapObjectPropertyA = () => {
  props.vObj.a = 'strA+子から'
}

const swapObjectPropertyB = () => {
  props.vObj.b = { bb: 'strB⇔⇔子から' }
}

const swapObjectPropertyB_BB = () => {
  props.vObj.b = { bb: 'strB+子から' }
}

const pushObjectProperty = () => {
  props.vObj['c'] = 'strC子から'
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
</script>
<template>
  <TabPageContainer :title="title">
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
        <MyLi label="isReactive(props.vObj.b)">{{ isReactive(props.vObj.b) }}</MyLi>
        <MyLi label="isReadonly(props.vObj.b)">{{ isReadonly(props.vObj.b) }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="props.vObj">{{ vObj }}</MyLi>
      <MyLi label="props.a ※親で再代入">{{ a }}</MyLi>
    </template>

    <template #watch>
      <MyLi label="props.vObj">{{ count1 }}</MyLi>
      <MyLi label="() => props.vObj">{{ count2 }}</MyLi>
      <MyLi label="() => props.vObj.a">{{ count3 }}</MyLi>
      <MyLi label="() => props.vObj.b">{{ count4 }}</MyLi>
      <MyLi label="() => props.a ※親で再代入">{{ count5 }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapObject">props.vObjを置換 ※readonlyなので変更できない</MyBtn>
      <MyBtn @click="swapObjectPropertyA">props.vObj.aを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyB">props.vObj.bを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyB_BB">props.vObj.b.bbを置換</MyBtn>
      <MyBtn @click="pushObjectProperty">props.vObjにcを追加</MyBtn>
    </template>
  </TabPageContainer>
</template>
