<script setup lang="ts">
import { isReadonly, isRef, ref, watch } from 'vue'
import RefChild from './child.vue'
import MyBtn from '../../MyBtn.vue'
import MyLi from '../../MyLi.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'string 親'
useLifeCycleDitector(title, 0)

let vStr = 'str1'
const changeVariable = () => {
  vStr = vStr + '+'
  console.log('変更後', 'vStr = ', vStr)
}

const countStr1 = ref(0)
watch(
  () => vStr,
  () => countStr1.value++,
)
const isRefVStr = () => isRef(vStr)
const isReadonlyVStr = () => isReadonly(vStr)
</script>
<template>
  <TabPageContainer
    :title="title"
    :summary="[
      '・ 値更新時、watchはトリガーされない',
      '・ 値更新時、再描画されない',
      '・ 子のpropsはreactiveである。親から子に渡すpropsはVueが内部でReactiveにしている',
      '　・ ただし渡す値がリアクティブではないので、親の値更新時、子に渡した値は更新されない・子でupdateも発火しない',
      '・ ログで確認すると値は更新されている',
    ]"
  >
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(vStr)">{{ isRefVStr() }}</MyLi>
        <MyLi label="isReadonly(vStr)">{{ isReadonlyVStr() }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="文字列：vStr">{{ vStr }}</MyLi>
    </template>
    <template #watch>
      <MyLi label="vStr">{{ countStr1 }}</MyLi>
    </template>
    <template #action>
      <MyBtn @click="changeVariable">文字列を置換</MyBtn>
    </template>
    <template #child>
      <RefChild
        v-bind="{
          vStr,
        }"
      />
    </template>
  </TabPageContainer>
</template>
