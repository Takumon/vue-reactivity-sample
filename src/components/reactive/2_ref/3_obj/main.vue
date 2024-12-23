<script setup lang="ts">
import { isReadonly, isRef, ref, watch } from 'vue'
import Child from './child.vue'
import MyBtn from '../../MyBtn.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'ref object 親'
useLifeCycleDitector(title)

const source = { a: 'strA', b: { bb: 'strB' } }
const vObj = ref<{ a: string; b: { bb: string }; c?: string }>(source)
const swapObject = () => {
  vObj.value = { a: 'strA⇔', b: { bb: 'strB⇔' } }
}
const swapObjectPropertyA = () => {
  vObj.value.a = 'strA+'
}

const swapObjectPropertyB = () => {
  vObj.value.b = { bb: 'strB⇔⇔' }
}

const swapObjectPropertyB_BB = () => {
  vObj.value.b = { bb: 'strB+' }
}

const pushObjectProperty = () => {
  vObj.value['c'] = 'strC'
}

const { a } = vObj.value

const count1 = ref(0)
watch(vObj, () => count1.value++)

const count2 = ref(0)
watch(vObj.value, () => count2.value++)

const count3 = ref(0)
watch(
  () => vObj,
  () => count3.value++,
)

const count4 = ref(0)
watch(
  () => vObj.value,
  () => count4.value++,
)

const count5 = ref(0)
watch(
  () => vObj.value.a,
  () => count5.value++,
)

const count6 = ref(0)
watch(
  () => vObj.value.b,
  () => count6.value++,
)

const count7 = ref(0)
watch(
  () => vObj.value.b.bb,
  () => count7.value++,
)

const count8 = ref(0)
watch(
  () => a,
  () => count8.value++,
)

const isRefVObj = () => isRef(vObj)
const isReadonlyVObj = () => isReadonly(vObj)
</script>
<template>
  <TabPageContainer
    :title="title"
    :summary="[
      '・ refの元となる値 と refの値は連動しない（元の値はrefの初期値）',
      '・ オブジェクトの要素を変数に保持するとリアクティブ性が失われる。aの値が変わらない',
      '・ watchにgetter方式でrefを戻り値とすると、refの値を変更してもwatchはトリガーされない',
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
        <MyLi label="isRef(vObj)">{{ isRefVObj() }}</MyLi>
        <MyLi label="isReadonly(vObj)">{{ isReadonlyVObj() }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="source">{{ source }}</MyLi>
      <MyLi label="vObj = ref(source)">{{ vObj }}</MyLi>
      <MyLi label="a = vObj.value.a ※再代入">{{ a }}</MyLi>
    </template>

    <template #watch>
      <MyLi label="vObj">{{ count1 }}</MyLi>
      <MyLi label="vObj.value">{{ count2 }}</MyLi>
      <MyLi label="() => vObj">{{ count3 }}</MyLi>
      <MyLi label="() => vObj.value">{{ count4 }}</MyLi>
      <MyLi label="() => vObj.value.a">{{ count5 }}</MyLi>
      <MyLi label="() => vObj.value.b">{{ count6 }}</MyLi>
      <MyLi label="() => vObj.value.b.bb">{{ count7 }}</MyLi>
      <MyLi label="() => a ※再代入">{{ count8 }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapObject">vObj.valueを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyA">vObj.value.aを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyB">vObj.value.bを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyB_BB">vObj.value.b.bbを置換</MyBtn>
      <MyBtn @click="pushObjectProperty">vObj.valueにcを追加</MyBtn>
    </template>

    <template #child>
      <Child :vObj="vObj" :a="a" />
    </template>
  </TabPageContainer>
</template>
