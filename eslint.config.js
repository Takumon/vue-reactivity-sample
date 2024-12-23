import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    rules: {
      'vue/no-undef-components': [
        'error',
        {
          // 自動的に登録されるグローバルコンポーネントを指定
          ignorePatterns: [
            // Vueitfy
            /^v-[a-z].*/,
          ],
        },
      ],
    },
  },
  skipFormatting,
]
