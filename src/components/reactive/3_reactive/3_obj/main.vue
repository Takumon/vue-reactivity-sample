<script setup lang="ts">
import { isReactive, isReadonly, isRef, reactive, ref, toRefs, watch } from 'vue'
import Child from './child.vue'
import MyBtn from '../../MyBtn.vue'
import TabPageContainer from '../../MyTabPageContainer.vue'
import MyLi from '../../MyLi.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'reactive object 親'
useLifeCycleDitector(title)

const source: { a: string; b: { bb: string }; c?: string } = { a: 'strA', b: { bb: 'strB' } }
const vObj = reactive(source)

const swapObject = () => {
  // vObj = { a: 'strA⇔', b: { bb: 'strB⇔' } }
}
const swapObjectPropertyA = () => {
  vObj.a = 'strA+'
}

const swapObjectPropertyB = () => {
  vObj.b = { bb: 'strB⇔⇔' }
}

const swapObjectPropertyB_BB = () => {
  vObj.b = { bb: 'strB+' }
}

const pushObjectProperty = () => {
  vObj['c'] = 'strC'
}

let { a, b } = vObj

const { a: a1, b: b1 } = toRefs(vObj)

const swapB_BB = () => {
  b.bb = 'strB▲'
}
const swapA = () => {
  a = 'strA▲'
}

const swapB1_BB = () => {
  b1.value.bb = 'strB1▲'
}
const swapA1 = () => {
  a1.value = 'strA1▲'
}

const count1 = ref(0)
watch(vObj, () => count1.value++)

const count2 = ref(0)
watch(vObj, () => count2.value++)

const count3 = ref(0)
watch(
  () => vObj,
  () => count3.value++,
)

const count4 = ref(0)
watch(
  () => vObj,
  () => count4.value++,
)

const count5 = ref(0)
watch(
  () => vObj.a,
  () => count5.value++,
)

const count6 = ref(0)
watch(
  () => vObj.b,
  () => count6.value++,
)

const count7 = ref(0)
watch(
  () => vObj.b.bb,
  () => count7.value++,
)

const count8 = ref(0)
watch(
  () => a,
  () => count8.value++,
)

const count9 = ref(0)
watch(
  () => b,
  () => count9.value++,
)

const isRefA1 = () => isRef(a1)
const isReadonlyA1 = () => isReadonly(a1)
const isRefB1 = () => isRef(b1)
const isReadonlyB1 = () => isReadonly(b1)
</script>
<template>
  <TabPageContainer
    :title="title"
    :summary="[
      '・ reactiveの元となる値 と reactiveの値は連動しない（元の値はreactiveの初期値）',
      '・ watchにgetter方式でreactiveを戻り値とすると、reactiveの値を変更してもwatchはトリガーされない',
      '・ reactiveオブジェクトの要素を変数に保持するとリアクティブ性が失われる。vObjの値を変更してもa・bの値が変わらない',
      '・ 上記はtoRefまたはtoRefsを使えば、リアクティブ性を保てる',
      '・ reactiveの変数にreactiveを再代入しても何も起きない',
      '・ 子のpropsはreactiveである。親から子に渡すpropsはVueが内部でReactiveにしている',
      '　・ 子のpropsのwatchは、親のwatchと同じ挙動',
      '　・ 親で子に渡すプロパティの要素が変更されたら、子でupdate発火せず、描画している値が更新される',
      '　・ 子のprops直下のプロパティは読み取り専用なので、子で値変更処理を実施しても、値は変わらない',
      '　・ 子のprops直下のプロパティの要素は読み取り専用ではないので、子で値が変更可能だがESLintの警告が出る',
    ]"
  >
    <template #reactivity>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(vObj)">{{ isReactive(vObj) }}</MyLi>
        <MyLi label="isReadonly(vObj)">{{ isReadonly(vObj) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(vObj.b)">{{ isReactive(vObj.b) }}</MyLi>
        <MyLi label="isReadonly(vObj.b)">{{ isReadonly(vObj.b) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(b) ※再代入">{{ isReactive(b) }}</MyLi>
        <MyLi label="isReadonly(b) ※再代入">{{ isReadonly(b) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(b1) ※toRefsで再代入">{{ isRefB1() }}</MyLi>
        <MyLi label="isReadonly(b1) ※toRefsで再代入">{{ isReadonlyB1() }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(vObj.a)">{{ isReactive(vObj.a) }}</MyLi>
        <MyLi label="isReadonly(vObj.a)">{{ isReadonly(vObj.a) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isReactive(a) ※再代入">{{ isReactive(a) }}</MyLi>
        <MyLi label="isReadonly(a) ※再代入">{{ isReadonly(a) }}</MyLi>
      </div>
      <div class="d-flex flex-row ga-10">
        <MyLi label="isRef(a1) ※toRefsで再代入">{{ isRefA1() }}</MyLi>
        <MyLi label="isReadonly(a1) ※toRefsで再代入">{{ isReadonlyA1() }}</MyLi>
      </div>
    </template>

    <template #value>
      <MyLi label="source">{{ source }}</MyLi>
      <MyLi label="vObj = reactive(source)">{{ vObj }}</MyLi>
      <MyLi label="a = vObj.a ※再代入">{{ a }}</MyLi>
      <MyLi label="b = vObj.b ※再代入">{{ b }}</MyLi>
      <MyLi label="a1 = vObj.a ※toRefsで再代入">{{ a1 }}</MyLi>
      <MyLi label="b1 = vObj.b ※再toRefsで代入">{{ b1 }}</MyLi>
    </template>

    <template #watch>
      <MyLi label="vObj">{{ count1 }}</MyLi>
      <MyLi label="vObj">{{ count2 }}</MyLi>
      <MyLi label="() => vObj">{{ count3 }}</MyLi>
      <MyLi label="() => vObj">{{ count4 }}</MyLi>
      <MyLi label="() => vObj.a">{{ count5 }}</MyLi>
      <MyLi label="() => vObj.b">{{ count6 }}</MyLi>
      <MyLi label="() => vObj.b.bb">{{ count7 }}</MyLi>
      <MyLi label="() => a ※再代入">{{ count8 }}</MyLi>
      <MyLi label="() => b ※再代入">{{ count9 }}</MyLi>
    </template>

    <template #action>
      <MyBtn @click="swapObject">vObjを置換 ※何も起きない</MyBtn>
      <MyBtn @click="swapObjectPropertyA">vObj.aを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyB">vObj.bを置換</MyBtn>
      <MyBtn @click="swapObjectPropertyB_BB">vObj.b.bbを置換</MyBtn>
      <MyBtn @click="pushObjectProperty">vObjにcを追加</MyBtn>

      <MyBtn @click="swapA">aを置換</MyBtn>
      <MyBtn @click="swapB_BB">b.bbを置換</MyBtn>

      <MyBtn @click="swapA1">a1を置換 ※vObjと連動する</MyBtn>
      <MyBtn @click="swapB1_BB">b1.bbを置換 ※vObjと連動する</MyBtn>
    </template>

    <template #child>
      <Child :vObj="vObj" :a="a" :b="b" :a1="a1" :b1="b1" />
    </template>
  </TabPageContainer>
</template>
