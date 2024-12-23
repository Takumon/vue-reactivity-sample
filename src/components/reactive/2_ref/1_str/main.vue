<script setup lang="ts">
import { isReadonly, isRef, ref, watch } from 'vue'
import Child from './child.vue'
import MyBtn from '../../MyBtn.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'ref string 親'
useLifeCycleDitector(title)

const source = 'str1'
const vStr = ref(source)
const changeVariable = () => {
  vStr.value = vStr.value + '+'
}

const count1 = ref(0)
watch(vStr, () => count1.value++)

const count2 = ref(0)
watch(
  () => vStr,
  () => count2.value++,
)

const count3 = ref(0)
watch(
  () => vStr.value,
  () => count3.value++,
)

const isRefVStr = () => isRef(vStr)
const isReadonlyVStr = () => isReadonly(vStr)
</script>
<template>
  <TabPageContainer
    :title="title"
    show-console
    :summary="[
      '・ refの値 と 元の値 は連動しない（元の値はrefの初期値）',
      '・ watchにてgetter方式でrefを戻り値とすると、refの値を変更してもwatchはトリガーされない',
      '・ 親から子にpropsを渡す時は親のtemplate内で渡すので、自然と .valueの値が渡される',
      '・ 子のpropsはreactiveである。親から子に渡すpropsはVueが内部でReactiveにしている',
      '　・ 子のpropsのwatchは、親のwatchと同じ挙動',
      '　・ 親の値が変更されたら、子でupdate発火し、描画している値が更新される',
      '　・ 子のprops直下のプロパティは読み取り専用なので、値変更処理を実施しても、値は変わらない',
    ]"
  >
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(vStr)">{{ isRefVStr() }}</MyLi>
        <MyLi label="isReadonly(vStr)">{{ isReadonlyVStr() }}</MyLi>
      </div>
    </template>
    <template #value>
      <MyLi label="source">{{ source }}</MyLi>
      <MyLi label="vStr = ref(source)">{{ vStr }}</MyLi>
    </template>
    <template #watch>
      <MyLi label="vStr">{{ count1 }}</MyLi>
      <MyLi label="() => vStr">{{ count2 }}</MyLi>
      <MyLi label="() => vStr.value">{{ count3 }}</MyLi>
    </template>
    <template #action>
      <MyBtn @click="changeVariable">vStr.valueを置換</MyBtn>
    </template>
    <template #child>
      <Child
        v-bind="{
          vStr,
        }"
      />
    </template>
  </TabPageContainer>
</template>
