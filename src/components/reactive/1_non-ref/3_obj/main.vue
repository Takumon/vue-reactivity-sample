<script setup lang="ts">
import { isReadonly, isRef, ref, watch } from 'vue'
import RefChild from './child.vue'
import MyBtn from '../../MyBtn.vue'
import MyLi from '../../MyLi.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'object 親'
useLifeCycleDitector(title, 0)

const item = { c: 'c' }
let vObj: { a: string; item: { c: string } } = { a: 'a', item }
const countObj1 = ref(0)
watch(vObj, () => countObj1.value++)

const countObj2 = ref(0)
watch(
  () => vObj,
  () => countObj2.value++,
)

const countObj3 = ref(0)
watch(
  () => vObj.a,
  () => countObj3.value++,
)

const countObj4 = ref(0)
watch(
  () => vObj.item,
  () => countObj4.value++,
)

const countObj5 = ref(0)
watch(
  () => vObj.item.c,
  () => countObj5.value++,
)
const log = () => {
  console.log('変更後', 'item = ', item, ', vObj = ', vObj)
}
const swapObj = () => {
  vObj = { a: 'a⇔', item: { c: 'c⇔' } }
  log()
}
const changeObjProp = () => {
  vObj['a'] = vObj['a'] + '+'
  log()
}
const swapObjNestedProp = () => {
  vObj['item'] = { c: 'c⇔' }
  log()
}
const changeObjNestedProp = () => {
  vObj['item']['c'] = vObj['item']['c'] + '+'
  log()
}

const isRefVObj = () => isRef(vObj)
const isReadonlyVObj = () => isReadonly(vObj)
</script>
<template>
  <TabPageContainer
    :title="title"
    :summary="[
      '・ 文字列の時と同様',
      '・ 子のネストしたプロパティ(vObj、vObj.item)はリアクティブではない',
    ]"
  >
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(vObj)">{{ isRefVObj() }}</MyLi>
        <MyLi label="isReadonly(vObj)">{{ isReadonlyVObj() }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="オブジェクト：item">{{ item }}</MyLi>
      <MyLi label="オブジェクト：vObj = { a: 'a', item }">{{ vObj }}</MyLi>
    </template>

    <template #watch>
      <MyLi label="item">{{ countObj1 }}</MyLi>
      <MyLi label="vObj = { a: 'a', item }">{{ countObj1 }}</MyLi>
      <MyLi label="() => vObj">{{ countObj2 }}</MyLi>
      <MyLi label="() => vObj.a">{{ countObj3 }}</MyLi>
      <MyLi label="() => vObj.item">{{ countObj4 }}</MyLi>
      <MyLi label="() => vObj.item.c">{{ countObj5 }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapObj">オブジェクトを置換</MyBtn>
      <MyBtn @click="changeObjProp">オブジェクトのプロパティ（文字列）を置換</MyBtn>
      <MyBtn @click="swapObjNestedProp">オブジェクトのプロパティ（オブジェクト）を置換</MyBtn>
      <MyBtn @click="changeObjNestedProp"
        >オブジェクトのプロパティ（オブジェクト）のプロパティ（文字列）を置換</MyBtn
      >
    </template>

    <template #child>
      <RefChild
        v-bind="{
          vObj,
        }"
      />
    </template>
  </TabPageContainer>
</template>
