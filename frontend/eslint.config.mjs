import js from '@eslint/js'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import eslintPluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    languageOptions: {
      parser: parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        __: 'readonly',
        cur_list: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintPluginVue.configs['vue3-recommended'].rules,
      ...prettier.rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  },
]
