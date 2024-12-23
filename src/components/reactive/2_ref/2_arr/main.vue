<script setup lang="ts">
import { isReadonly, isRef, ref, watch } from 'vue'
import Child from './child.vue'
import MyBtn from '../../MyBtn.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'ref array 親'
useLifeCycleDitector(title)

const source = ['str1', ['str2']]
const vArr = ref(source)
const a = vArr.value[0]

const swapArray = () => {
  vArr.value = ['str1⇔', ['str2⇔']]
}
const swapArrayItem0 = () => {
  vArr.value[0] = 'str1+'
}

const swapArrayItem1 = () => {
  vArr.value[1] = ['str2+']
}

const swapArrayItem1Props = () => {
  vArr.value[1][0] = 'str2⇔⇔'
}

const pushArrayItem = () => {
  vArr.value.push('strNewOne')
}

const count1 = ref(0)
watch(source, () => count1.value++)

const count2 = ref(0)
watch(vArr, () => count2.value++)

const count3 = ref(0)
watch(
  () => vArr,
  () => count3.value++,
)

const count4 = ref(0)
watch(
  () => vArr.value,
  () => count4.value++,
)

const count5 = ref(0)
watch(
  () => vArr.value[0],
  () => count5.value++,
)

const count6 = ref(0)
watch(
  () => vArr.value[1],
  () => count6.value++,
)

const count7 = ref(0)
watch(
  () => vArr.value[1][0],
  () => count7.value++,
)

const count8 = ref(0)
watch(
  () => a,
  () => count8.value++,
)

const isRefVArr = () => isRef(vArr)
const isReadonlyVArr = () => isReadonly(vArr)
</script>
<template>
  <TabPageContainer
    :title="title"
    :summary="[
      '・ refの元となる値 と refの値は連動しない（元の値はrefの初期値）',
      '・ watchにgetter方式でrefを戻り値とすると、refの値を変更してもwatchはトリガーされない',
      '・ watchにgetter方式で配列の要素を指定すると、配列が置換されても、要素の値が変わらない場合watchはトリガーされない',
      '・ 配列の要素を変数に保持するとリアクティブ性が失われる。aの値が変わらない',
      '・ 子のpropsはreactiveである。親から子に渡すpropsはVueが内部でReactiveにしている',
      '　・ 子のpropsのwatchは、親のwatchと同じ挙動',
      '　・ 親で子に渡すプロパティが変更されたら、子でupdate発火し、描画している値が更新される',
      '　・ 親で子に渡すプロパティの要素が変更されたら、子でupdate発火せず、描画している値が更新される',
      '　・ 子のprops直下のプロパティは読み取り専用なので、子で値変更処理を実施しても、値は変わらない',
      '　・ 子のprops直下のプロパティの要素は読み取り専用ではないので、子で値が変更可能だがESLintの警告が出る',
    ]"
  >
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(vArr)">{{ isRefVArr() }}</MyLi>
        <MyLi label="isReadonly(vArr)">{{ isReadonlyVArr() }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="source">{{ source }}</MyLi>
      <MyLi label="vArr = ref(source)">{{ vArr }}</MyLi>
      <MyLi label="a = vArr.value[0] ※再代入">{{ a }}</MyLi>
    </template>

    <template #watch>
      <MyLi label="source">{{ count1 }}</MyLi>
      <MyLi label="vArr">{{ count2 }}</MyLi>
      <MyLi label="() => vArr">{{ count3 }}</MyLi>
      <MyLi label="() => vArr.value">{{ count4 }}</MyLi>
      <MyLi label="() => vArr.value[0]">{{ count5 }}</MyLi>
      <MyLi label="() => vArr.value[1]">{{ count6 }}</MyLi>
      <MyLi label="() => vArr.value[1][0]">{{ count7 }}</MyLi>
      <MyLi label="() => a ※再代入">{{ count8 }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapArray">vArr.valueを置換</MyBtn>
      <MyBtn @click="swapArrayItem0">vArr.value[0]を置換</MyBtn>
      <MyBtn @click="swapArrayItem1">vArr.value[1]を置換</MyBtn>
      <MyBtn @click="swapArrayItem1Props">vArr.value[1][0]を置換</MyBtn>
      <MyBtn @click="pushArrayItem">vArr.valueに要素を追加</MyBtn>
    </template>

    <template #child>
      <Child
        v-bind="{
          vArr,
          a,
        }"
      />
    </template>
  </TabPageContainer>
</template>
