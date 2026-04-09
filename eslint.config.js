import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      // 'property-access-style': ['error', 'camelCase'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  pluginJs.configs.recommended,
];
