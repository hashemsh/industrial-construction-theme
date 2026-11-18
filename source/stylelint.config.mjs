export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': null,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'color-function-notation': 'modern',
    'alpha-value-notation': 'number',
    'declaration-block-no-redundant-longhand-properties': null,
    'import-notation': 'string',
    'value-keyword-case': ['lower', { ignoreKeywords: ['Vazirmatn', 'Tahoma'] }],
    'custom-property-empty-line-before': [
      'always',
      { except: ['after-custom-property', 'first-nested'] },
    ],
  },
};
