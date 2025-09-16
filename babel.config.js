module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@modules': './src/modules',
          '@navigation': './src/navigation',
          '@stores': './src/stores',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
