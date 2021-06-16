module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '**/*.js',
    'src/stories/*.tsx',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: [
            'nesting',
            'id',
          ],
        },
        controlComponents: [
          'AutosizeInput',
          'Editor',
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/**',
          '**/*.stories.tsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          'src/tests/**',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: [
        'src/redux/migrations/*.ts',
        'src/redux/reducers/*.ts',
      ],
      rules: {
        'no-param-reassign': 'off',
      },
    },
    {
      files: [
        'src/redux/migrations.ts',
      ],
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: [
        'src/**/*.stories.tsx',
      ],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
