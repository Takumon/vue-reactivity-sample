<script setup lang="ts">
import NonRefStr from '@/components/reactive/1_non-ref/1_str/main.vue'
import NonRefArray from '@/components/reactive/1_non-ref/2_arr/main.vue'
import NonRefObj from '@/components/reactive/1_non-ref/3_obj/main.vue'

import RefString from '@/components/reactive/2_ref/1_str/main.vue'
import RefArray from '@/components/reactive/2_ref/2_arr/main.vue'
import RefObject from '@/components/reactive/2_ref/3_obj/main.vue'

import ReactiveString from '@/components/reactive/3_reactive/1_str/main.vue'
import ReactiveArray from '@/components/reactive/3_reactive/2_arr/main.vue'
import ReactiveObject from '@/components/reactive/3_reactive/3_obj/main.vue'

import { ref } from 'vue'

const tabs = {
  NonRefStr: '文字列',
  NonRefArray: '配列',
  NonRefObj: 'オブジェクト',

  RefString: 'ref 文字列',
  RefArray: 'ref 配列',
  RefObject: 'ref オブジェクト',

  ReactiveString: 'reactive 文字列',
  ReactiveArray: 'reactive 配列',
  ReactiveObject: 'reactive オブジェクト',
}
const tab = ref<keyof typeof tabs>(Object.keys(tabs)[0])

const resetKey = ref(Array(Object.keys(tabs).length).fill(0))

const refreshTab = () => {
  const tabIndex = Object.keys(tabs).findIndex((s) => s === tab.value)
  console.log('refreshTab', tab.value, tabIndex)
  resetKey.value[tabIndex]++
}

const resetKeyValue = (tabKey: string): number => {
  const tabIndex = Object.keys(tabs).findIndex((s) => s === tabKey) ?? 0
  return resetKey.value[tabIndex]
}
const zzz = 'one'
</script>
<template>
  <v-container style="padding-bottom: 500px">
    <h1 style="margin-bottom: 48px">Vue.jsのリアクティブを理解する</h1>
    <div class="d-flex flex-row">
      <v-col cols="0">
        <v-tabs v-model="tab" color="primary" center-active direction="vertical">
          <template v-for="[tabValue, label] in Object.entries(tabs)" :key="tabValue">
            <v-tab style="text-transform: none" :value="tabValue">{{ label }}</v-tab>
          </template>
        </v-tabs>
      </v-col>

      <v-col cols="10" class="pa-4">
        <v-row justify="end">
          <v-col cols="2">
            <v-btn variant="tonal" color="gray" class="mb-2" @click="refreshTab"
              >初期値に戻す</v-btn
            ></v-col
          >
        </v-row>

        <NonRefStr v-if="tab === 'NonRefStr'" :key="resetKeyValue('NonRefStr')" />
        <NonRefArray v-if="tab === 'NonRefArray'" :key="resetKeyValue('NonRefArray')" />
        <NonRefObj v-if="tab === 'NonRefObj'" :key="resetKeyValue('NonRefObj')" />

        <RefString v-if="tab === 'RefString'" :key="resetKeyValue('RefString')" />
        <RefArray v-if="tab === 'RefArray'" :key="resetKeyValue('RefArray')" />
        <RefObject v-if="tab === 'RefObject'" :key="resetKeyValue('RefObject')" />

        <ReactiveString v-if="tab === 'ReactiveString'" :key="resetKeyValue('ReactiveString')" />
        <ReactiveArray v-if="tab === 'ReactiveArray'" :key="resetKeyValue('ReactiveArray')" />
        <ReactiveObject v-if="tab === 'ReactiveObject'" :key="resetKeyValue('ReactiveObject')" />
      </v-col>
    </div>
  </v-container>
</template>
