import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier/flat';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist'] },
  prettierConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // 기본 ESLint 룰 (JS)
      ...js.configs.recommended.rules,

      // React Hooks 규칙 엄격 적용
      ...reactHooks.configs.recommended.rules,

      // TypeScript 기본 추천 룰
      ...typescriptPlugin.configs.recommended.rules,

      // Prettier 충돌 금지 및 오류로 표시
      'prettier/prettier': 'error',

      // 변수 사용 안하는 거 경고
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]' },
      ],

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // React Hook Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 권장되는 코드 스타일 추가 예시
      eqeqeq: ['error', 'always'], // === 사용 강제
      curly: ['error', 'all'], // 중괄호 항상 사용
      quotes: ['error', 'single', { avoidEscape: true }], // 작은 따옴표 선호
      semi: ['error', 'always'], // 세미콜론 항상 사용

      // TS 룰 추가 - any 사용 경고
      '@typescript-eslint/no-explicit-any': 'warn',

      // 함수 타입 명시 권장
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],

      // React 컴포넌트 prop-types 사용 안하는 대신 TS 인터페이스 사용 권장
      'react/prop-types': 'off',
    },
  },
];
