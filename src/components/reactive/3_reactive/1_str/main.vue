<script setup lang="ts">
import TabPageContainer from '../../MyTabPageContainer.vue'
import { useLifeCycleDitector } from '../../useLifeCycleDitector'

const title = 'reactive string 親'
useLifeCycleDitector(title)
</script>
<template>
  <TabPageContainer
    :title="title"
    show-console
    :summary="['・ reactiveの引数に文字列は指定できない']"
  >
  </TabPageContainer>
</template>
