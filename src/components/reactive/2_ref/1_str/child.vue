<script setup lang="ts">
import { isReactive, isReadonly, ref, watch } from 'vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'
import MyBtn from '../../MyBtn.vue'

const title = 'ref string 子'
useLifeCycleDitector(title, 1)

const props = defineProps<{
  vStr: string
}>()

const changeVariable = () => {
  props.vStr = 'str1⇔子から'
}

const count1 = ref(0)
watch(
  () => props.vStr,
  () => count1.value++,
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
        <MyLi label="isReactive(props.vStr)">{{ isReactive(props.vStr) }}</MyLi>
        <MyLi label="isReadonly(props.vStr)">{{ isReadonly(props.vStr) }}</MyLi>
      </div>
    </template>
    <template #value>
      <MyLi label="props.vStr">{{ vStr }}</MyLi>
    </template>
    <template #watch>
      <MyLi label="() => props.vStr">{{ count1 }}</MyLi>
    </template>
    <template #action>
      <MyBtn @click="changeVariable">props.vStrを置換 ※readonlyなので変更できない</MyBtn>
    </template>
  </TabPageContainer>
</template>
