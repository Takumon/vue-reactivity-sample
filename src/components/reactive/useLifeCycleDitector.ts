import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'

export const useLifeCycleDitector = (selfName: string, indentLevel: number = 0) => {
  const indent = '  '.repeat(indentLevel)
  onBeforeMount(() => console.log(`${indent}${selfName} マウント 開始`))
  onMounted(() => console.log(`${indent}${selfName} マウント 完了した`))

  onBeforeUpdate(() => console.log(`${indent}${selfName} 更新 開始`))
  onUpdated(() => console.log(`${indent}${selfName} 更新 完了した`))

  onBeforeUnmount(() => console.log(`${indent}${selfName} マウント解除 開始`))
  onUnmounted(() => console.log(`${indent}${selfName} マウント解除 完了した`))
}
